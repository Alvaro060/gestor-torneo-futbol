const { verifyToken } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);

router.get('/', verifyToken, userController.getAllUsers);
router.get('/getUserByToken', verifyToken, userController.getUserByToken);
router.put('/updateUser/:id', verifyToken, userController.updateUser);
router.post('/logout', verifyToken, userController.logout);

module.exports = router;
