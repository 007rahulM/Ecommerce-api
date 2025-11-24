//this route is for the admin to add the products so that admin only can add the items 

const express=require("express");
const Product=require("../models/productModel"); //import th eproduct buleprint 
const{protect,admin}=require("../middleware/authMiddleware"); //import the protect and admin function or bouncers from the auth middleware
 const router=express.Router();

 /*  create product -here admin only
 method -POST
 URL - /api/products
 Login -run prtects first login chek then admin role check
 */

 router.post("/",protect,admin ,async(req,res)=>{
    try{
        //get data from body
        const{name,price,description,category,stock,imageUrl}=req.body;

        //validation
        //simple chek to ensure they sent the basic data for the product
        if(!name ||!price ||!category||!stock ||!imageUrl ||!description){
            return res.status(400).json({error:"Please provide name,price, and categpry all all vaild data"})
        }

        //create
        const product=new Product({
            name,price,description,category,stock,imageUrl
        });

        //save
        const createdProduct=await product.save();

        //success
        res.status(201).json(createdProduct);
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
 });


 /*

 GET all products -public all customers can access
 method- GET
 url : /api/products
 no middleware needed everyone can see products

  */

 router.get("/",async(req,res)=>{
    try{
        //  .find([]) means find everything
        const products=await Product.find({});
        res.json(products);
    }catch(err){
        res.status(500).json({error:"Server Error"});
    }
 });

 module.exports=router;