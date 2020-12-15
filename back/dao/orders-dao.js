//Connection/Comunication through Module to BD server.                    
let connection = require("./connection-wrapper");

async function create(order) {

    const sql = `INSERT INTO orders ( user_id, cart_id, total_price, city_delivery, street_delivery, date_delivery, credit) Values (?,?,?,?,?,?,?)`;
    const parameters = [  order.user_id, order.cart_id, order.total_price, order.city_delivery, order.street_delivery, order.date_delivery, order.credit];
   
    const info = await connection.executeWithParams(sql, parameters);
    order.id = info.insertId; // Get the new created id from the database.
    return order.id;
};
//   create({user_id: 3,
//     cart_id: 14,
//     total_price: "359",
//     date_delivery: "2020-04-07",
//     city_delivery: "JARUSALEM",
//     street_delivery: "faaaaack123",
//     credit: "1232" })
async function closeCartUpdate(id){
    const sql=`update shopping_cart set isChecked ="1" where id = ?`;
    const parameters =[id];
    let finishCart = await connection.executeWithParams(sql, parameters);
    console.log(finishCart);
    return finishCart;
}

async function counterOrder(){
//Get from db sum rows of orders table.
    const sql = "SELECT count(id) as amount from orders";

    const counterResult = await connection.execute(sql);
   
    return counterResult;
}

async function update(order){//Update Obj details, by ObJ.Id
   
    const sql = "UPDATE orders SET user_id = ?, cart_id = ?, total_price = ?, city_delivery = ?, street_delivery = ?, date_delivery = ?, credit = ? WHERE id = ?";
    const parameters = [ order.user_id, order.cart_id, order.total_price, order.city_delivery, order.street_delivery, order.date_delivery, order.credit, order.id];
   
    await connection.executeWithParams(sql, parameters);
    console.log("Updated id: "+ order.id);
    return;
};
//  update({})

async function retriveAll() {//Gets All table's data.
   
    const sql = "SELECT * FROM orders";
    
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};
//  retriveAll()

async function retriveBy(id) { //Gets spesific Obj, by Obj.id
    
    const sql = "SELECT * FROM orders WHERE id=?";
    const parameters = [id];
    
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};
//  retriveBy()

async function calcOrderTotalPrice(order){

    const sql = "SELECT Sum(total_price) From cart_items where cart_items.cart_id = ?";
    const parameters = [ order.cart_id ];
    
    const orderTotalPrice =+ await connection.executeWithParams(sql, parameters);
    return orderTotalPrice;
}

async function retriveOrderByUser(id) {//Get orders and status related to User, by Id.
    const sql = "SELECT orders.id, users.name, orders.cart_id, orders.total_price, orders.picture, shopping_cart.isChecked"+
    "FROM orders O Join users U on U.id = O.user_id"+
    "Join shopping_cart SC on SC.user_id = O.user_id WHERE (O.user_id =?)"
    const parameters = [id];
    
    const getByUserResult = await connection.executeWithParams(sql, parameters);
    return getByUserResult;
}
// retriveByUser()

 async function deleteBy(id) {//Delete specific table row in DB, by id
    
    const sql = `DELETE FROM orders WHERE id = ?`;
    const parameters = [id];
    
    await connection.executeWithParams(sql, parameters);
    console.log("Been deleted: " + id);
    return;
};
//  deleteBy()

module.exports = {
    create,
    update,
    retriveAll,
    retriveBy,
    retriveOrderByUser,
    calcOrderTotalPrice,
    deleteBy,
    counterOrder,
    closeCartUpdate
};//currrd;