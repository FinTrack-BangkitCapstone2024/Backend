const express = require('express');

const user_controller = require('../controllers/user_controller');

const router = express.Router();

router.get('/', user_controller.getAllUsers);
router.get('/:id', user_controller.getUsers);

router.post('/', user_controller.addUser);

router.put('/:id', user_controller.editUser);

router.delete('/:id', user_controller.deleteUser);

module.exports = router;
