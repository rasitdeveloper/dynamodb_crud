const express = require('express');
let router = express.Router();
let categoryCrudController = require('../../controllers/categoryCrud');


router.post('/category', categoryCrudController.add);
router.get('/getCategory/:id', categoryCrudController.get);
router.post('/updateCategory/:id', categoryCrudController.update);
router.delete('/deleteCategory/:id', categoryCrudController.delete);

module.exports = router;