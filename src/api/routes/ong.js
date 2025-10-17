var express = require('express');
var router = express.Router();
const pool = require('../db/config');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken, isAdmin } = require('../middlewares/auth');


// Configuração do Multer para upload de imagens
const uploadsDir = path.join(__dirname, '../uploads');

// Garante que a pasta uploads existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ongs-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens em JPEG, PNG, GIF e WebP são permitidas.'));
    }
  }
});

/* GET - Buscar todos as ongs */
router.get('/', async function(req, res, next) {
  try {
    const { search } = req.query;
    let busca = 'SELECT * FROM ongs';
    let parametros = [];

    if(search)
    {
      busca += ' WHERE nome LIKE $1 OR objetivo LIKE $1';
      parametros.push('%' + search + '%');
    }
    busca += ' ORDER BY id';
    const result = await pool.query(busca, parametros);
    res.json({
        success: true,
        data: result.rows
    });
  } catch (error) {
    console.error('Erro ao buscar Ongs:', error);
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

/* GET parametrizado - Buscar ong por ID */
router.get('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, nome, link, objetivo, img FROM ongs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'ONG não encontrada.'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao buscar ONG:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

/* POST - Cadastrar nova ong */
router.post('/', verifyToken, isAdmin, upload.single('imagem'), async function(req, res) {
  try {
    const { nome, link, objetivo, img} = req.body;
    
    // Validação básica
    if (!nome || !link || !objetivo || !img ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome, link, objetivo e imagem são obrigatórios.'
      });
    }

    let imagem = null;
    if (req.file) {
      imagem = `/uploads/${req.file.filename}`;
    }
    
    // Verificar se a ONG já existe
    const existingOng = await pool.query('SELECT id FROM ongs WHERE nome = $1', [nome]);
    if (existingOng.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Esta ONG já está cadastrada.'
      });
    }

    // Verificar se o link já existe
    const existingLink = await pool.query('SELECT id FROM ongs WHERE link = $1', [link]);
    if (existingLink.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Link já está em uso.'
      });
    }

    const result = await pool.query(
      'INSERT INTO ongs (nome, link, objetivo, img) VALUES ($1, $2, $3, $4) RETURNING nome, link, objetivo, img',
      [nome, link, objetivo, img]
    );

    // http status 201 - Created
    res.status(201).json({
      success: true,
      message: 'ONG cadastrada com sucesso',
      data: result.rows[0]
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Erro ao criar ONG:', error);
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

/* PUT - Atualizar ong */
router.put('/:id', verifyToken, isAdmin, upload.single('imagem'), async function(req, res) {
  try {
    const { id } = req.params;
    const { nome, link, objetivo, img } = req.body;
    
    // Validação básica
    if (!nome || !link || !objetivo || !img) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      // http status 400 - Bad Request
      return res.status(400).json({
        success: false,
        message: 'Nome, link, objetivo e imagem são obrigatórios'
      });
    }
    
    // Verificar se a ONG existe
    const ongExists = await pool.query('SELECT id FROM ongs WHERE id = $1', [id]);
    if (ongExists.rows.length === 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'ONG não encontrada'
      });
    }
    let imagem = ongExists.rows[0].img;

    if (req.file) {
      // Remove imagem antiga se existir
      if (imagem) {
        const oldImagePath = path.join(uploadsDir, path.basename(imagem));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imagem = `/uploads/${req.file.filename}`;
    }

    const result = await pool.query(
      'UPDATE ongs SET nome = $1, link = $2, objetivo = $3, img = $4 WHERE id = $5 RETURNING *',
      [nome, link, objetivo, img || new Date(), img, id]
    );

    // Verificar se a ong já está cadastrada
    const existingOng = await pool.query('SELECT id FROM ongs WHERE nome = $1 AND id != $2', [nome, id]);
    if (existingOng.rows.length > 0) {
      // https status 409 - Conflict
      return res.status(409).json({
        success: false,
        message: 'ONG já existe.'
      });
    }

    // Verificar se o email já está em uso por outro usuário
    const existingLink = await pool.query('SELECT id FROM ongs WHERE link = $1 AND id != $2', [link, id]);
    if (existingLink.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'O link desta ONG já está sendo usado.'
      });
    }

    res.json({
      success: true,
      message: 'ONG atualizada com sucesso.',
      data: result.rows[0]
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Erro ao atualizar ONG:', error);
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

/* DELETE - Remover ONG */
router.delete('/:id', verifyToken, isAdmin, async function(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se a ONG existe
    const ongExists = await pool.query('SELECT id FROM ongs WHERE id = $1', [id]);
    if (ongExists.rows.length === 0) {
      // http status 404 - Not Found
      return res.status(404).json({
        success: false,
        message: 'ONG não encontrada'
      });
    }
    
    // Remove imagem, se existir
    const imagem = produtoExistente.rows[0].img;
    if (imagem) {
      const imagePath = path.join(uploadsDir, path.basename(imagem));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await pool.query('DELETE FROM ongs WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'ONG deletada com sucesso.'
    });
  } catch (error) {
    console.error('Erro ao deletar ONG:', error);
    // http status 500 - Internal Server Error
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor.'
    });
  }
});

module.exports = router;