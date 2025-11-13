var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const axios = require('axios')
const { verifyToken, isAdmin } = require('../middlewares/auth');

/* GET - Buscar todas as noticias */
router.get('/', async function(req, res, next) {
  try {
    const { search } = req.query;
    let busca = 'SELECT * FROM noticias';
    let parametros = [];
    const result = await pool.query(busca, parametros);
      result.rows.map(async (noticias) => {
        try {
          let Imagem = await axios.put("http://localhost:3001/images", {
            "path": `uploads/${noticias.id}/main.png`
          })
          return {
            ...noticias,
            "Image": Imagem.data.data
          }
        } catch (e) {
          return noticias
        }
      })
    
    if(search)
    {
      busca += ' WHERE manchete LIKE $1 OR autor LIKE $1';
      parametros.push('%' + search + '%');
    }
    busca += ' ORDER BY id';
    res.json({
        success: true,
        data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar noticias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});
// requer usuário autenticado como admin
router.get('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const result = await pool.query('SELECT id, nome, senha, email, role FROM usuario ORDER BY id');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* GET parametrizado - Buscar usuário autenticado */
router.get('/me', verifyToken, async function(req, res) {
  try {
    // parâmetro obtido do token pelo middleware
    const id = req.user.id;
    const result = await pool.query('SELECT id, nome, email, role FROM usuario WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

/* GET parametrizado - Buscar notícias por ID */
router.get('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, manchete, data, img FROM noticias WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada.'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar notícia:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

/* POST - Cadastrar nova notícia */
router.post('/', verifyToken, isAdmin, async function(req, res) {
  try {
    const { manchete, data, img, autor} = req.body;
    
    // Validação básica
    if (!manchete || !data || !img || !autor ) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Manchete, autor e imagem são obrigatórios.'
      });
    }

    // Verificar se a notícia já existe
    const existingNew= await pool.query('SELECT id FROM noticias WHERE manchete = $1', [manchete]);
    if (existingNew.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Esta notícia já está publicada.'
      });
    }

    const result = await pool.query(
      'INSERT INTO noticias (manchete, data, img, autor) VALUES ($1, $2, $3, $4) RETURNING id, manchete, data, img, autor',
      [manchete, data, img, autor]
    );
    if(img){
      try{
        axios.post('http://localhost:3001/images', {
          // dados enviados no corpo da requisição
          path: `uploads/${result.rows[0].id}/main.png`,
          base64: img
        })
      }catch(e){}
    }

    // http status 201 - Created
    res.status(201).json({
      success: true,
      message: 'Notícia publicada com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao publicar notícia:', error);
    // Verificar se é erro de constraint
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.'
      });
    }
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* PUT - Atualizar notícia */
router.put('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const { manchete, data, img, autor} = req.body;
    
    // Validação básica
    if (!manchete || !data || !img || !autor) {

      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Manchete, autor e imagem são obrigatórios'
      });
    }
    
    // Verificar se a notícia existe
    const newExists = await pool.query('SELECT id FROM noticias WHERE id = $1', [id]);
    if (newExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada'
      });
    }
    // Verificar se a notícia já está cadastrada
    const existingNews = await pool.query('SELECT id FROM noticia WHERE manchete = $1 AND id != $2', [manchete, id]);
    if (existingNews.rows.length > 0) {
      // https status 409 - Conflict
      return res.status(409).json({
        success: false,
        message: 'Notícia já existe.'
      });
    }

    let query, params;
    
    if (req.body !== '') {
      query = 'UPDATE news SET manchete = $1, data = $2, img = $3, autor = $4 WHERE id = $5 RETURNING manchete, data, img, autor';
      params = [manchete, data, img, autor, id];
    } 
    
    const result = await pool.query(query, params);

    res.json({
      success: true,
      message: 'Notícia atualizada com sucesso.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    // Verificar se é erro de constraint
    if (error.code === '23514') {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos. Verifique os campos e tente novamente.'
      });
    }
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

/* DELETE - Remover notícia */
router.delete('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se a notícia existe
    const newExists = await pool.query('SELECT id FROM noticias WHERE id = $1', [id]);
    if (newExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada'
      });
    }
    
    await pool.query('DELETE FROM noticias WHERE id = $1', [id]);
    try{
      await axios.delete("http://localhost:3001/images", {
  data: {
    path: `uploads/${id}/main.png`
  }
})

    }catch(e){
      console.error(e)
    }
    res.json({
      success: true,
      message: 'Notícia deletada com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao deletar notícia:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

module.exports = router;