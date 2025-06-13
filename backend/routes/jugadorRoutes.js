const { verifyToken } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');

router.get('/', jugadorController.getAllJugador);
router.post('/', verifyToken, jugadorController.createJugador);
router.get('/:idjugador', jugadorController.getJugadorById);  
router.delete('/:idjugador', verifyToken, jugadorController.deleteJugador);
router.put('/:idjugador', verifyToken, jugadorController.updateJugador);

module.exports = router;