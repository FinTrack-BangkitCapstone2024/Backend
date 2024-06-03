const express = require('express')
const { 
  signInWithEmail,
  createUserWithEmail,
  test
 } = require('../controllers/auth-controller')

const router = express.Router()


router.post('/signInWithEmail', signInWithEmail )
router.post('/signUpWithEmail', createUserWithEmail)
// router.post('/signInWithEmailAndPassword', test )

module.exports = router;