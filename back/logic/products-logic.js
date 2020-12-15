//imported Modules:
const dao = require("../dao/products-dao");
const Product = require("../models/product");

async function countProducts(){
    const counterOfProducts = await dao.counterPro();
    await isValidResponse(counterOfProducts);
    // console.log(counterOfProducts.amount);
    return counterOfProducts[0].amount;
}
//retrive all products:
async function getAll(){
    
    const getAllResult = await dao.retriveAll();
    //Validate retrived Data from DB.
    await isValidResponse(getAllResult);
    console.log("Sucessful Retrive All!");
    return getAllResult;
};
//get product by MAKAT :D .
async function getBy(id){
   
    const getProductResult = await dao.retriveBy(id);
    //validate retrived obj.
    await isValidResponse(getProductResult)
    console.log("Succesful Retrive!")
    return getProductResult;
};
//get all products by category.id
async function getByCategory(id){
   
    const getResultByCategory = await dao.retriveByCategory(id);
    //validate retrived obj.
    await isValidResponse(getResultByCategory)
    console.log("Succesful Retrive!");
    return getResultByCategory;
};

//change product details:
async function update(product){
    
    await Product.validate(product);
    //update details
    const updateResult = await dao.update(product);
    //send to DB than validate result of action.
    await isValidResponse(updateResult);
    
    console.log("Updated!: "+ product.id);
    return updateResult;
};
// update({name:"NessCoffe", category_id:"1", price:"20", picture:"/pictures/NC.jpg", id:"28"})
//remove product by id:
async function deleteBy(id){
    //validate existing in DB.
    const idToDelete = await dao.retriveBy(id);
    //if id is not in DB dont proceed to delete.
    await isValidResponse(idToDelete);
    await dao.deleteBy(id);//DELETE commit.
    console.log("Deleted!: "+id);
};
//add new product to stock:
async function add(product){
    //validate product data.
    await Product.validate(product);
    //insert Obj to DB new row. 
    const newProduct = await dao.create(product);
    //validate inserted happend
    await isValidResponse(newProduct);
    console.log("Added!: "+ newProduct.id);
    return newProduct;
};
// add({name:"NessCoffe", category_id:"1", price:"19", picture:"/pictures/NC.jpg"})

async function isValidResponse(object){
    if (!object){
        throw new Error ("Invalid response!");
    }
}; 

module.exports = {
    getAll,
    update,
    getBy,
    getByCategory,
    deleteBy,
    add,
    countProducts
}