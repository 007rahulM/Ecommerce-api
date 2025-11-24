//it is the main file all the routes called and creat an api endpoint here


require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const{errorHandler}=require("./middleware/errorMiddleware");

const app=express();
app.use(express.json());  //it allows us to read JSON from postman

//DB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err =>console.log(err));

//impot the routes
const authRoutes=require("./routes/authRoutes");

//user routes
 //ok this tells ther server to like if a request with this api call is done then go look in authroutes like that
app.use("/api/auth",authRoutes);

//import the router product.js
const productRoutes=require("./routes/productRoutes");

//use the route and creat a api request and use the route
app.use("/api/products",productRoutes);

//the server route for the cart route
const cartRoutes=require("./routes/cartRoutes");
app.use("/api/cart/",cartRoutes);

//error handler middleaware is used here
app.use(errorHandler);



//import the orderRoutes to use in app.use in server
 const orderRoutes=require("./routes/orderRoutes");
 app.use("/api/orders",orderRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on ${PORT}`));


