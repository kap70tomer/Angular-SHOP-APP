//Connection/Comunication through Module to BD server.                      
let connection = require("./connection-wrapper");

async function retriveItemPriceBy(id){
    //get price by product id.

    const sql = "select price from products where id = ?";
    const parameters = [ id ];
   //set quary to exe 
    const getPriceResult = await connection.executeWithParams(sql,parameters);
    //commit exe of quary with params
    console.log(getPriceResult[0].price)
    return getPriceResult[0].price;
}

async function calcTotalPriceOfCart(id){//get total price of cart 
//quantity * product price = total item price. for validation.
   const sql = `SELECT sum(products.price * cart_items.quantity) as total_price 
   FROM products join cart_items on products.id = cart_items.product_id 
   where cart_id =?`;
   
   const parameters = [ id ]; 
   const getTotalPriceResult = await connection.executeWithParams(sql, parameters);
   
   console.log(getTotalPriceResult[0].total_price);
   return getTotalPriceResult[0].total_price;
};
// cal

async function create(item) {   
   
    const sql = `INSERT INTO cart_items (product_id, quantity, total_price, cart_id ) Values (?,?,?,?)`;
    let parameters = [item.product_id, item.quantity, item.total_price, item.cart_id ];
   
    let info = await connection.executeWithParams(sql, parameters);
    //new inserted id.
    
    return info;
};
//  create({product_id:"1" ,quantity:"1", total_price:"10", cart_id:"14"})

async function update(item){//Update Obj details, by ObJ.Id
   
    const sql = "UPDATE cart_items SET quantity = ?, total_price = ? WHERE (product_id = ? and cart_id = ?)";
    const parameters = [ item.quantity, item.total_price, item.product_id, item.cart_id ];
   
    let info = await connection.executeWithParams(sql, parameters);
    console.log("Updated !");
    return info;
};
//  update({product_id:"1", quantity:"2", total_price:"20", cart_id:"2"})

async function retriveAll() {//Gets All table's data.
   
    const sql = "SELECT * FROM cart_items";
   
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};
//  retriveAll()

async function retriveByCart(id) { 
    //Gets spesific Obj, by db-Row.id

    const sql = "SELECT cart_items.*, products.name FROM shopping.cart_items join shopping.products "+
    "on cart_items.product_id = products.id where cart_id = ?";
    const parameters = [id];

    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult;
};

async function retriveByProductInCart(item) { 
    //Gets spesific Obj.

    const sql = "SELECT * FROM cart_items WHERE product_id=? and cart_id =?";
    const parameters = [ item.product_id, item.cart_id ];
    //set query.
    let getByPnCIdResult = await connection.executeWithParams(sql, parameters);
    //commit.
    return getByPnCIdResult[0];
};
//   retriveByProductInCart({product_id:"1", quantity:"2", total_price:"20", cart_id:"14"})

async function deleteBy(item) {
    //Delete

    const sql = `DELETE FROM cart_items WHERE product_id = ? and cart_id = ?`;
    const parameters = [item.product_id, item.cart_id];

    let info = await connection.executeWithParams(sql, parameters);

    console.log("Been deleted Pro id: " +info.deletedId);
    return info.deletedId;
};
//   deleteBy({product_id:"1" ,quantity:"1", total_price:"10", cart_id:"1"})


// retriveAll()
module.exports = {
    create,
    retriveItemPriceBy,
    calcTotalPriceOfCart,
    update,
    retriveAll,
    retriveByCart,
    retriveByProductInCart,
    deleteBy
};
//currd