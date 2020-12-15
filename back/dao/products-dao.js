//Connection/Comunication through Module to BD server.                  
let connection = require("./connection-wrapper");

async function create(product) {
    const sql = `INSERT INTO products ( name, category_id, price, picture) Values (?,?,?,?)`;
    const parameters = [ product.name, product.category_id, product.price, product.picture ];
    const info = await connection.executeWithParams(sql, parameters);
    product.id = info.insertId; // Get the new created id from the database.
    return product;
};
//  create({name:"Black Coffe", category_id:"1", price:"19", picture:"/pictures/BC.jpg"})

async function update(product){//Update Obj details.
    const sql = "UPDATE products SET name = ?, category_id = ?, price=?, picture=? WHERE id = ?";
    let parameters = [ product.name, product.category_id, product.price, product.picture, product.id];
    info = await connection.executeWithParams(sql, parameters);
    console.log("Updated! "+ info.affectedRows);
    return info;
};
//   update({name:"Black Coffee", category_id:"1", price:"20.00", picture:"123.jpg", id:"25"})

async function counterPro(){//get amount of products in store.
    const sql = "SELECT count(id) as amount from products";
    const counterResult = await connection.execute(sql);
    return counterResult; 
}

async function retriveAll() {//Gets All table's data.
    const sql = "SELECT * FROM products";
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};
//  retriveAll()

async function retriveBy(id) { //Gets spesific Obj, by Obj.id
    const sql = "SELECT * FROM products WHERE id=?";
    const parameters = [id];
    const getByIdResult = await connection.executeWithParams(sql, parameters);
    return getByIdResult[0];
};
//  retriveBy(2)
async function retriveByCategory(id){
    const sql = "SELECT * FROM products P  WHERE category_id =?"
    const parameters = [id];
    const getResult = await connection.executeWithParams(sql, parameters);
    return getResult;
}
// retriveByCategory(1)

 async function deleteBy(id) {//Delete specific table row in DB, by id
    const sql = `DELETE FROM products WHERE id = ?`;
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
    retriveByCategory,
    deleteBy,
    counterPro
};