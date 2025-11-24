
//here in the add to car route we gona add the logic for 2 senarious 
//1 if the product is already in the cart we just increase the quantity
//2 if the product is not in the cart we add a new item to the cart array

/*
url: /api/cart/add
method: POST
protected: yes it it protected only users or customers can use and add to cart (protect middleware)

*/

const express=require("express");
const User=require("../models/userModel");
const{protect}=require("../middleware/authMiddleware");
const router=express.Router();

//---add to cart
router.post("/add",protect,async(req,res)=>{
    try{
        const{productId,quantity}=req.body;

        //1 get the user then
        //req.user._id comes from our protected middleware
        const user=await User.findById(req.user._id);
        //2 chek  is this product already in the cart? or not
        //we look through the user.cart array like we gona check by the user id we will fetch the user first then we gona fetch the user cart if the product exist or not 
        //"p" represents one item in the cart
        //we compare p.product(the ID in the cart) with productId( the ID sent by the user in the body)
        const itemIndex=user.cart.findIndex(p=>p.product==productId);  //here we compare the cart with indexes like is the product id in the user matches any product id in the cart like that if yes then it continues add then increase the item quantity else if not then its a new iteam
         if(itemIndex >-1){
            //here comes senarior 1
            //the product exists in cart
         // we just update the quantity
         user.cart[itemIndex].quantity +=quantity;
         }else{
            //senario 2 //  product is a new product to the cart
            //we just update the quantity
            user.cart.push(
                {
                    product:productId,
                    quantity:quantity
                });
         }
     // 3 save the user
     //this saves the updated cart to the database
     await user.save();

     res.status(200).json(user.cart);


    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
});

// the get the user cart seeinng or making because i got doubt we storing the product name in the cart as product Id value so that it can link to the real product if the product changes then the cart product name also get chanes automatically by using mogobd .populated () method it will fetch the id real current product name  and assign it to the cart
/*
 get user cart
 URL: /api/cart
 method: GET
 protected:ues only user or customers can access it

*/

router.get("/",protect,async(req,res)=>{
    try{
        //1 Get the user
        //we fing the user by their ID(from the token)
        //but ...here is the magic trick
        //.populate('cart.product')  this tells the Mongoose to go inside the cart array looke at the product field
        //then taken that Id ,find the actual Product and put it here like that

        const user=await User.findById(req.user._id).populate('cart.product');
      //2 send the response
      //now user.cart wont just have IDs it will have the full product objects
      res.status(200).json(user.cart);

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
});



//the removing item from the cart 
/*
Logic:
we need to productID of the item to remove
we find the user
we use js .filter() method we say:"keep every item in the cart where the id is not the one i want tp delet"
thenwe save the user
*/

/* REMOVE from cart
URL: /api/cart/remove/:productId
method:DELETE
protected :yes only loged in user or customers can use cart and ther functions
*/

router.delete("/remove/:productId",protect ,async(req,res)=>{
    try{
        const {productId}=req.params; //get ProductID from the url or api which is passing //and one more thing its always in the  label in the api like:/id or something like this only always 
       //1 Get User
       const user=await User.findById(req.user._id);
       //2 filter the cart
       //we update the cart array
       //we keep items only if their product ID does not match the one we want to delete
       //or else we can say it like we only deltee the product which matched the productId in the cart and leave rest of them so we filetering first to select only the product with the same ProductID then method delete
       user.cart=user.cart.filter(item=>item.product.toString()!==productId); //we filtering the products which are not match again stor to the cart 

       //3 save
       await user.save();
       //send back the updated cart to the user 
       res.status(200).json(user.cart);
    
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }  
});



module.exports=router;