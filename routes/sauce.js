const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const sauceCtrl = require('../controllers/sauce')
const multer = require('../middleware/multer-config')



 router.post('/sauces', auth,multer, sauceCtrl.createSauce)
//  router.put('/sauces/:id', auth, sauceCtrl.modifySauce)
 router.delete('/sauces/:id', auth, sauceCtrl.deleteSauce)
//  router.get('/sauces/:id', auth, sauceCtrl.displaySauceById)
 router.get('/sauces' + auth,multer, sauceCtrl.displaySauce)

  

module.exports = router;