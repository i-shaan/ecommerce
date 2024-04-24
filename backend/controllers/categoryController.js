import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
const createCategory = asyncHandler(async (req,res)=>{
    try{
        const {name}=req.body;
        console.log(name);
        if(!name){
            return res.json({error:"Name is required"})
        }
        const existingCategory =await Category.findOne({name});
        if(existingCategory){
            return res.json({error:"Already exists"})
        }
        const category = await new Category({name}).save();
        res.json(category);
    }catch(error){
        console.log(error);
        return res.status(400).json
    }
})
const updateCategory = asyncHandler(async (req,res)=>{
    try {
        const {name}=req.body;
        const {categoryId} = req.params;
        const category = await Category.findOne({_id : categoryId});
        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
            console.log(error);
            res.status(500).json({error:"Internal server error"})
    }
})
const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const {categoryId} = req.params;
      const removed = await Category.findByIdAndDelete( categoryId);
      res.json(removed);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
const listCategory =asyncHandler(async (req,res)=>{
    try{
        const all = await Category.find({});
        res.json(all);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})
const readCategory = asyncHandler(async (req,res)=>{
    try{
        const {categoryId} = req.params;
        const categories = await Category.findOne({_id:categoryId});
        res.json(categories);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})

export {createCategory,updateCategory,deleteCategory,listCategory,readCategory};