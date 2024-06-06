const express = require('express')

const {
getAllUsers,
getUsers,
addUser,
editUser,
deleteUser
} = require('../controllers/user_controller');

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUsers)

router.post('/' ,addUser)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)


module.exports = router;



































