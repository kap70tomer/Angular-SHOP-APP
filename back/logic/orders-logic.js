//import Modules:
const dao = require("../dao/orders-dao");
const Order = require("../models/order");

async function countOrders(){
    const amountOfOrders = await dao.counterOrder();
    await isValidResponse(amountOfOrders);
    return amountOfOrders[0].amount;
}

//all orders "history"
async function getAll(){
    //get All orders
    const getAllResult = await dao.retriveAll();
    //Validate retrived Data from DB.
    await isValidResponse(getAllResult);
    console.log("Sucessful Retrive All!");
    return getAllResult;
};

//retrive order by id
async function getBy(id){
   
    const getResult = await dao.retriveBy(id);
    //validate response.
    await isValidResponse(getResult);
    
    console.log("Succesful Retrive!");
    return getResult;//up to controller layer
};
//retrive all orders by user id
async function getByUser(id){
   
    const getResult = await dao.retriveOrderByUser(id);
    //validate retrived obj.
    await isValidResponse(getResult);
    console.log("Succesful Retrive!");
    return getResult;
};

//update order details
async function update(order){
    
    const updateOrderResult = await dao.update(order);
    //send to DB than validate result of action.
    await isValidResponse(updateOrderResult);

    console.log("Updated!: "+ order.id);
    return updateOrderResult[0].id;
};

//delete order by id
async function deleteBy(id){
    //validate existing in DB.
    const orderToDelete = await dao.retriveBy(id);
    //if id is not in DB dont proceed to delete().
    await isValidResponse(orderToDelete);
    //validate response.
    await dao.deleteBy(id);
    //DELETE Exe commit.
    
    console.log("Deleted!: " + id);
    return;
}
//create new order
async function add(order){
    //Validate obj data
    Order.validate(order);
    //calc Total Order Price by cart_items.Totals.
    // const PriceResult = await dao.calcOrderTotalPrice(order);
    // await isValidResponse(PriceResult);
    let closeCart = await dao.closeCartUpdate(order.cart_id);
    await isValidResponse(closeCart);
    //set calc result if order sent price is not equal to server side calc. 
    // if(order.total_price != getPriceResult){
        // order.total_price = getPriceResult;
        //set calc result new price to order obj.
    // };
    //Exe insert Obj to DB new row. 
    const newOrder = await dao.create(order);
    //validate insert.
    await isValidResponse(newOrder);
    
    console.log("Added!: "+ newOrder);
    return newOrder;
}


async function isValidResponse(object){
    if (!object){
        throw new Error ("Invalid response!");
    }
}


module.exports = {
    getAll,
    update,
    getBy,
    getByUser,
    deleteBy,
    add,
    countOrders
}