const dao = require("../dao/cart-items-dao");
const Cart_item = require("../models/Cart_item");

async function getAll(){
    
    const getAllResult = await dao.retriveAll();
    //Validate response from DB.
    await isValidResponse(getAllResult);
    
    console.log("Sucessful Retrive All! "+ JSON.stringify(getAllResult));
    return getAllResult;
}

//add new item to cart items:
async function add(item){
    
    Cart_item.validate(item);
    //static class validation. for obj data.
    let inCartAlreadyItem = await isAlreadyExist(item);
    //validate duplacate item. in cart.
    if(inCartAlreadyItem){ 
        //commit add\update in DB .
        
        inCartAlreadyItem.quantity += item.quantity;  
        //set new quantity to existing item in cart.
        let cost = await update(inCartAlreadyItem);
        return cost;
        
    }
    else{
        let addedNewItem = await calcTotalItemPrice(item);
        //set price to product, server side calc result.
        await isValidResponse(addedNewItem);
        //validate calc res.
        let addedNewItemResult = await dao.create(addedNewItem);
        //add to cart with fixed price.
        await isValidResponse(addedNewItemResult);
        //validate insert.        
        const calcResult = await calcTotalCartPrice(item.cart_id);
        isValidResponse(calcResult);
        //send client new total cost.
        return calcResult;
        
    }
}
// add({
//     product_id: 1,
//     quantity: 1,
//     total_price: 7,
//     cart_id: 39,
//     name: 'cola'
//   })
async function isAlreadyExist(item){
    let isExists = await dao.retriveByProductInCart(item);
    if(!isExists){
        return;
    }
    console.log(isExists+"0");
    return isExists;
}

async function getPriceBy(id){
//get single item price.
    const getPrice =+ await dao.retriveItemPriceBy(id);
    await isValidResponse(getPrice);
    console.log("Price: " + getPrice);
    return getPrice;
};
//   getPriceBy(4)

async function calcTotalItemPrice(item){
    // calc total cart_item price.
    let id = item.product_id;

    const productPrice =+ await getPriceBy(id);
    
    //get authintic price from bd. 
    item.total_price =+ (productPrice * item.quantity);
    //set aproved price to given item.
    return item;

}

async function calcTotalCartPrice(id){

    //CALC Total Cart  Price:

    let calcTotalResult = await dao.calcTotalPriceOfCart(id);
    await isValidResponse(calcTotalResult);
    return calcTotalResult;
    //      validate result.
    
    //Set to Sent total_price if NOT Equal to DB calc of total Price.
    
    //   if(item.total_price !== totalPrice)
    //     {
    //       item.total_price = totalPrice
    //      };
    //set server price if diffrent.
};
//   calcTotalItemPrice({
//         "product_id": 1,
//         "quantity": 2,
//         "total_price": 10,
//         "cart_id": 10
//     })
async function getProductBy(item){
   
    const getProResult = await dao.retriveByProduct(item);
    //validate retrived obj.
    // await isValidResponse(getProResult);
    console.log("Succesful Retrive! "+ JSON.stringify(getProResult));
    return getProResult;
}

async function getByCart(id){
   //get cart items by cart id.
    const getCartResult = await dao.retriveByCart(id);
    //validate retrived obj.
    await isValidResponse(getCartResult);
    console.log("Succesful Retrive! "+ JSON.stringify(getCartResult));
    return getCartResult;
}



async function update(item){
    //validate price by inner calc DB ensure.
    let trustedItem = await calcTotalItemPrice(item);
    
    console.log(trustedItem);
    //validate price insert.
    const updateResult = await dao.update(trustedItem);
    //send to DB than validate result of action.
    await isValidResponse(updateResult);
    // console.log("Updated!: "+ JSON.stringify(updateResult));
    let cartTotal = await calcTotalCartPrice(item.cart_id);
    await isValidResponse(cartTotal);
    return cartTotal;
}
// update({"product_id": 1,
//         "quantity": 2,
//         "total_price": 110,
//         "cart_id": 10})

async function deleteBy(item){
    //validate existing in DB.
    const deleteFromCartId = await dao.retriveByCart(item.cart_id);
    //if id is not in DB dont proceed to delete.
    await isValidResponse(deleteFromCartId);
    await dao.deleteBy(item);//DELETE commit.
    currentTotal = await dao.calcTotalPriceOfCart(item.cart_id);
    //get total after deleting item from cart.
    console.log(currentTotal);
    return currentTotal;
}

async function isValidResponse(object){
    if (!object){
        throw new ServerError (ErrorType.GENERAL_ERROR,JSON.stringify(object),e);
    }
}

module.exports = {
    getAll,
    getPriceBy,
    update,
    getProductBy,
    calcTotalCartPrice,
    getByCart,
    deleteBy,
    add
}