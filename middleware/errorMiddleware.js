const { stack } = require("../routes/cartRoutes");

/*
this middelware is for to make better error handling in the application
so instesad of writting try catch block in evry  route we can just use this middleware to handle the error globally

//customer service desk 
in express an erro handle must have 4 argumests :(err,req,res,nect)
*/
const errorHandler=(err,req,res,next)=>{
//1  we determin the status code
//if the staus code is 200 ok , then this doesnot maje sense for an error
//sp we default to 500 -the server error
const stausCode=res.stausCode===200 ?500 :res.statusCode;  //wt this makes is if the res.statuscode is 200 then we set it to 500 else we keep the res.statuscode as it is
res.status(stausCode);

//2 send it to the response

res.json({
    message:err.message,
    //stack:it shows exactly which line off code failed
    // we only show this in developmetn mode no in production  for the security purpose
    stack:process.env.NODE_ENV==='production'?null:err.stack,
});
};

module.exports={errorHandler};


