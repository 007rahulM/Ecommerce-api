//here we gona build the registration logic 

//here the flow will be like 
//1 check did the user procide the email and password
//2 check does this email and password exists in the db already
//3 hash the password with the jwt secret key and use hash function and scarmble the password
//4 save tthe user and creat the user user in the db

const express=require("express");
const bcrypt=require("bcryptjs") //importing the hasing tool bcryptjs
const User=require("../models/userModel") //importing our user blueprint from the models
const router=express.Router();   //using the express router inbuilt feature to create the routes 
const jwt=require("jsonwebtoken"); //this is imported to use in the login to provide the tokens for login 
const{protect}=require("../middleware/authMiddleware");// this is a middleware guard function called to use it 




//registere route //
//here we gona use POST method 
//and URL:/api/auth/register

router.post('/register',async(req,res)=>{
    //we gonna use try catch block for better error handling
    try{
        // 1 we get date
        //we grap the data the user sent us from the body
        const{email,password}=req.body;

        //2 validation it the like a bouncer 
        //here we chec if the user didn't send an email or password stop them right here like that
        if(!email||!password){
           // return res.status(400).json({
              //  error:"Please provide email and password"

                //new way of error handling by using the eror middleare her here 2 way come if we using insisde the asyn then we shoudld use the throw new Error("...messaseage here") 
                //or else there is also another simpler way just to use the next (err)=>return next(err) //it go straight to errorHandler befoer this we shoudl add error message in err like const err=new Error("Pleare provide email and password")
             
                //1 way using throw
            //    res.status(400); //set the code 400 
            //     throw new Error("Please provide email and password");  //throw to the handler

                //2 way is to use the noraml simpler way
                res.status(400);
                const err=new Error("Please provide email and password");
                return next(err);
            // });

        }
            //3 check for existing user
            //we ask the database  like do we already have the samw email in the db like that
            const existingUser=await User.findOne({email:email}); //findOne wil search in the db with the email with the email given provided if yes it return true then then existing use will be true 
            if(existingUser){
                //if we found somone  then return an error
                return res.status(400).json({error:"Email already exists"});

            }

        //4 hash the password -the security step
        //we generate a salt random data and mix it with the password 
        //10 is the complexity level higher and safer but slowe
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        //5 create the user 
        // //we create a new user object,but we save the hashed password not the real password for security 

        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        });
 
        //6 save the user object to the db
        await newUser.save();

        //7 success response
        res.status(201).json({message:"User registerd successfully"});
    }
    //this will run if the try block fails 
    catch(err){
        console.error("Registration failed");
        res.status(500).json({error:"Server error:", err});
    }
});

/*
 the login flow
 1 find the user with the email exists if no give error
 2 if yes then compare the password they typed and match the hash in the database here we use -"bcrypt.compare" for this
 3 sign if it matches ,create a jwt toke usinf our secret key

*/
router.post('/login',async(req,res)=>{
 try{
    const{email,password}=req.body;

    if(!email ||!password){
        return res.status(400).json({error:"Please provide required email and password"});
    }
  
    //find the use
    const user=await User.findOne({email:email});
   //if the user istnot there then 
   if(!user){
    return res.status(400).json({error:"Invalid credentials"})
   }


    //check the password and hashed password by bcrypt.compar
   //check the password
   //here we comparer the plain text password from re.body 
   //with the hashed password -from the database user object

   const isMatch=await bcrypt.compare(password,user.password);
   //if they dont match stop ther
   if(!isMatch){
    return res.status(400).json({error:"Invalid credentials"});
   }
    
   //generate token 
   //this is wher we use the jwt secrect key to generate token
   const token=jwt.sign(
    {id:user._id,role:user.role}, //playload :what info is hidden inside the token
    process.env.JWT_SECRET,  //secret key the stamp to prove its real
    {expiresIn:"1d"} //expirey to calidat for 1day
   );

  // sucess response
  res.status(200).json({
message:"Login successful",
token:token,
user:{
    id:user._id,
    name:user.name,
    email:user.email
}

  });
 }
 catch(err){
    //if try faisl to executes then come to catch block
    console.error(err);
    res.status(500).json({error:"Server error"});

 }
});

//new route for the middleware bouncer to use and protect
/*
 its a GET method  like get me-progile route
 url:/api/auth/me
 protection -yes only logges in users can acces this route
*/

router.get("/me",protect,async(req,res)=>{
    //if the bouncer -protect did its job or worked req.user will have the user's info
    res.status(200).json({
        id:req.user._id,
    name:req.user.name,
    email:req.user.email,
    role:req.user.role
    });
});





//exporting the router so theat index.js or server.js can use it

module.exports=router;
