const express = require ('express');
const router = express.Router();
const categoryService = require('../services/category');
// route to add a category

router.post('/categories',async (req,res)=>{
  try{
    const {name, description} = req.body;
    const category = await categoryService.addCategory(name, description);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json ({error: error.message});
  }
});
module.exports = router;