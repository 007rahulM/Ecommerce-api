
const mongoose=require('mongoose');


//here we gona write a new schema for the cart and we gona embade it into the user schema
//this defines what a single item in the cart look like
const cartItemSchema=new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,   //here this is a special Id type in mongoose which is used to reference another document in another collection
        ref:"Product",  //here it points to the Product model and this is how we create relationship between diffent collections in mongoose
        required:true

    },

    quantity:{
        type:Number,
        required:true,
        default:1,
        min:1  //this is for hanlfing cart value so that it cannot be 0 or - value
    }
});

const  userSchema=new mongoose.Schema({

    
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    },

    role:{
        type:String,
        enum:['customer','admin'], //enum is a enumeration it is a aray  it acts like dropdown menu list
        default:"customer"   //let us set default user as customer 

    },
 //here we  are adding the new cart field
 //so this is an embeded schema where a schem is defined inside another schmea 
 //we add thhis right after role and before the closign braces
 cart:[cartItemSchema]   //at first it was just an empty arry now the cart array stores anothere cart schema rules so that it follow that 


},
{timestamps:true}); //  timstamps will  stored created time and updated time in the time stamp when the user is created and updated

//then we will export the model

module.exports=mongoose.model("User",userSchema); //exportinf the model using mongoose.model with teh name User and with userschema

