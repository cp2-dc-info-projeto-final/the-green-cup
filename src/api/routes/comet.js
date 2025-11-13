var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const { verifyToken, isAdmin } = require('../middlewares/auth');

/* GET - Mostrar todos os comentários */
router.get('/', async function(req, res, next) {
  try {
    const { search } = req.query;
    let busca = 'SELECT * FROM comentario';
    let parametros = [];

    if(search)
    {
      busca += ' WHERE texto LIKE $1';
      parametros.push('%' + search + '%');
    }
    busca += ' ORDER BY id';
    const result = await pool.query(busca, parametros);
    res.json({
        success: true,
        data: result.rows
    });
  } catch (error) {
    console.error('Erro ao mostrar comentários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/* POST - Criar novo comentário */
router.post('/', async function(req, res) {
  try {
    const { id_usuario, texto, data } = req.body;
    
    // Validação básica
    if (!id_usuario || !texto || !data ) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Texto é obrigatório'
      });
    }

    // http status 201 - Created
    res.status(201).json({
      success: true,
      message: 'Comentário enviado com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
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

/* PUT - Editar comentário */
router.put('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const { texto } = req.body;
    
    // Validação básica
    if (!texto ) {
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Texto obrigatório.'
      });
    }

    let query, params;
    
    if (req.body !== '') {
      query = 'UPDATE comentario SET texto = $1, WHERE id = $2 RETURNING texto';
      params = [texto, id];
    } 
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      message: 'Comentário editado com sucesso.',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao editar comentário.', error);
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

/* DELETE - Remover usuário */
router.delete('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    
    await pool.query('DELETE FROM comentario WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Comentário deletado com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
