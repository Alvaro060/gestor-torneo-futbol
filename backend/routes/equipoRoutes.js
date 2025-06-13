const { verifyToken } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipoController');

router.post('/', verifyToken, equipoController.createEquipo);
router.get('/', equipoController.getAllEquipo);
router.get('/:idequipo', equipoController.getEquipoById);
router.delete('/:idequipo', verifyToken, equipoController.deleteEquipo);
router.put('/:idequipo', verifyToken, equipoController.updateEquipo);


module.exports = router;