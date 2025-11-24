

//importing monoggose for creating the schema
const mongoose=require("mongoose");

//creating the product schema
const productSchema=new mongoose.Schema({

    //we need a name for the product
    name:{
        type:String,
        required:true,
        trim:true
    },

  //we need a price for our procuct
  price:{
    type:Number,
    required:true,
    min:0  //here min is used because price cannot be zero or negative so the amout be valid

  },

  //we need a description for our product
  description:{
    type:String,  //here description can be long so we use text //here we cannot use text bca mongoose does not have text type in schema so we use string
    required:true,
    trim:true   //we use trim to remove any extra spaces

  },

  //we need a category for our product 

  category:{
    type: String, //here category also text bcz it can  be long too so and here also we cannot use text so we use string
    required:true,
    trim:true
  },

  //we need a stoc for our product to know how many products areavailabele

  stock:{
    type:Number,
    required:true,
    default:0  //here stock will be default zero 

  },

  //we also add the image url so that we store the link to the image of our product

  imageUrl:{
    type:String,  //text beacause url can be long here also we cannot use text so we use string
    required:true

  }




}, {timestamps:true}); // added the timestams to knwo we created at and updated at to know

//exportin te product schema into the module

module.exports=mongoose.model("Product",productSchema); //exporting the model using mongoose.model with the name Product and with productSchema