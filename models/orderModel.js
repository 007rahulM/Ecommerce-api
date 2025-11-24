/*
here its the order buleprints 
we are defining how an order looks like in our database

it need to know who bought it
it ned to list what they bought
it need the total amount

*/

const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({

    // 1 who bought it ?
    user:{
        type:mongoose.Schema.Types.ObjectId, //here we use the special Id type in mongoose to reference another document in another collection
        ref:"User", //her we reference the User model
        required:true
    },

    //2 what did they buy?
    //we can just copy the structure of the cart item schema from the user model here
    //because the order also needs to know what products and how many of each product were bought
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },

            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],


    //3 how much was it ? the  total amount
    totalAmount:{
        type:Number,
        required:true,
        min:0
    },

    // 4 Staus of the order
    status:{
        type:String,
        enum:['pending','processing','Shipped','deliverd','cancelled'], //here y we use enum is to restrict the status to these values only //enum is like a dropdown menu
        default:"pending"  //default status is pending when the order is created
    }
   
}, 
{timestamps:true}); //this will add created at and updated at fields automatically

module.exports=mongoose.model("Order",orderSchema); //exporting the order model with the name Order and orderSchema