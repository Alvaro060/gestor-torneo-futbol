const { verifyToken } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.get('/', partidoController.getAllPartido);
router.post('/', verifyToken, partidoController.createPartido);
router.get('/:idpartido', partidoController.getPartidoById);
router.put('/:idpartido', verifyToken, partidoController.updatePartido);
router.delete('/:idpartido', verifyToken, partidoController.deletePartido);

module.exports = router;