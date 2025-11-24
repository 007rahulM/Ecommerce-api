/*
middle ware logic
1 checkt that is ther a token is the request headder? usally sent as Bearer <token> like this
2 verify -is the token real?-we use our secret key to chek the digital signature
3 identify:if its real,decode it to find the user ID
4 Attach:find the user in the db and attach their info to the request object-req.user so the next function can use it
5 next if everythig is good then call next() funtion to let them in

 */

//we gona use jwt and user object so we need jwtwebtoken and user model
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

//the bouncer who checks in the middleware that is this user is has access 
const protect=async(req,res,next)=>{
    let token;
   // check the header
   //token are sent in the Authorization header and look like Bearer eecerejuhgfngdn...
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        //then get the token
        //we split the string Bearer <token> and take the second part the token itself
        token=req.headers.authorization.split(" ")[1];

        //the verify the token
        //here we use our secret key to check if the token is valid and hasn't been tampered with
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        //find the user
        // now the token contains the user's id
        //we find the user in the DB but we don't need the password so we use .select('-password)
        req.user=await User.findById(decoded.id).select("-password");

        // let them in
        //next() tells expres that -this user is good to move to the actual route function
        next();

    }catch(err){
        console.error(err);
        //if the token is fake or expired then
        res.status(401).json({error:"Not authorized, token failed"});
    }
   }

   //if there was no token at all
   if(!token){
    res.status(401).json({error:"Not authorized, no token provided"});
   }
};

//--for admin to check this bouncer is to chek the admins 
//this bouncer function is for vips like admins 
//this runs after protct it assumes we already know who the user is like that
const admin=(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next(); //you are an admin go ahead

    }else{
        res.status(403).json({error:"Not authorized as an admin"}); //403 is forbidden error message
    }
};


module.exports={protect,admin};