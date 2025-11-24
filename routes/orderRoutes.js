/*
in this we gona do matc in this api endpoint to calcuate the total price of the order from the cart items
Note: dont use the price value sent by the user or by the frontend alwasys fetchth the price from the product price from the datbase to avoid price mainipulation by the user bcz in frontedn the user can change the price values so always fetch the price from the database

*/

const express=require("express");
const Order=require("../models/orderModel");
const User=require("../models/userModel");
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

/*
---Checkout and creat order
URL: /api/orders/checkout
method: POST
protected: yes only logged in users can create order

*/
router.post("/checkout",protect,async(req,res)=>{
    try{
        //1 get the user and their cart items
        //we must use.polulate() because we need the price of the products from the product collection to calculate the total amount of the order
        const user=await User.findById(req.user._id).populate("cart.product"); //y we use .populate() is to fetch the real product details from the product collection using the product id stored in the cart

        //2 safety check is the user empty?
        if(!user.cart || user.cart.length===0){
            return res.status(400).json({error:" Your Cart is empty"});

        }

        //3 calculate th toal price
        //here we loop thriugh the cart items and calculate the total price
        //for each items :price*quantity

        let total=0;
        for(const item of user.cart){
            total += item.product.price * item.quantity; 
        }

        //4 creat the order
        const newOrder =new Order({
            user:req.user._id,
            items:user.cart, //copy items from cart to order
            totalAmount:total
        });

        //5 save the order
        await newOrder.save();

        //6 Clear the user's cart
        //the purscase is done so the basket shoudl be empty now
        user.cart=[];
        await user.save();

        //7 send receipt
        res.status(201).json({
            message:"Order placed successfully",
            order:newOrder
        });


    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
});

module.exports=router;