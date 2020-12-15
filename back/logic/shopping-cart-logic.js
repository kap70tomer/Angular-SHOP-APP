//imports modules:
const dao = require("../dao/shopping-cart-dao");
const Cart = require("../models/cart");

async function getLastCarts(id){
    let lastCarts = [];
    let carts = await dao.retriveLastCartsByUser(id);
    //get last 10 carts IDs ,by this user id.
    for(let i=0 ; i<carts.length;i++){
        let lastCart = await dao.retriveLastCartBy(carts[i].id);
        //for each used cart [calc total cost + cart data].
        lastCarts.push(lastCart[0]);
        //push to array for response.
    }
    return lastCarts;
}
// getLastCarts(1)
//retrive all carts in store:
async function getTotalPrice(id){
    
    const calcTotalResult = await dao.calcTotalCartPrice(id);
    //Validate response from DB.
    await isValidResponse(calcTotalResult);
    console.log(calcTotalResult);
    return calcTotalResult;
}
//retrive single cart by its id.
async function getByCart(id){
   
    const getByCartResult = await dao.retriveByCart(id);
    await isValidResponse(getByCartResult);
    //validate retrived obj.

    console.log("Succesful Retrive!");
    return getByCartResult;
}
//retrive single cart by user id.
async function getByCartUser(id){
   
    const getByUserResult = await dao.retriveLastCartBy(id);
    await isValidResponse(getByUserResult);
    //validate response.obj.
    
    console.log("Succesful Retrive!"+getByUserResult)
    return getByUserResult;
}
// change cart details.
// getByCartUser(10)// cart id

async function update(cart){
    
    await Cart.validate(cart);
    // class cart validate func(). for obj data.
    const updateCartResult = await dao.update(cart);
    await isValidResponse(updateCartResult);
    //validate response.
    
    console.log("Updated!: "+ id);
    return;
}
// Delete single cart by its id:
async function deleteBy(id){
    
    const idToDelete = await dao.retriveByCart(id);
    await isValidResponse(idToDelete);
    //validate existing in DB.
    let deletedItems = await deleteCartItems(id);
    await isValidResponse(deletedItems);
    //empty related tables data of this cart.
    let deleteCart = await dao.deleteByCart(id);
    await isValidResponse(deleteCart);
    //DELETE commit.
    console.log("Deleted!: "+deleteCart);
    return deleteCart;
}

async function deleteCartItems(id){

    const idToDelete = await dao.retriveByCart(id);
    await isValidResponse(idToDelete);
    let info = await dao.deleteCartItems(id);
    return info;
    
}

async function add(id){
    //validate cart data.
    const newCart = await dao.create(id);
    await isValidResponse(newCart);
    //validate Exe response.
    console.log(`Added!`+newCart);
    return newCart;
}
// add({"user_id":7})
async function isValidResponse(object){
    if (!object){
        throw new Error ("Invalid response!");
    }
}; 

module.exports = {
    getTotalPrice,
    update,
    getByCart,
    getByCartUser,
    deleteBy,
    add,
    deleteCartItems,
    getLastCarts
}