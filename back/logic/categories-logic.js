// imported modules:
const dao = require("../dao/categories-dao");
const Category = require("../models/category");

//get all categories:
async function getAll(){
    
    const getAllResult = await dao.retriveAll();
    //Validate retrived Data from DB.
    await isValidResponse(getAllResult);
    
    console.log("Sucessful Retrive All!");
    return getAllResult;
}
// get single category by its ID:
async function getBy(id){
    
    const getResult = await dao.retriveBy(id);
    //validate retrived obj.
    await isValidResponse(getResult);
    
    console.log("Succesful Retrive!");
    return getResult;
}

// change category name:
async function update(category){
    //validate obj data.
    await Category.validate(category);
    //update details
    const updateResult = await dao.update(category);
    //send to DB than validate result of action.
    await isValidResponse(updateResult);
    console.log("Updated!: "+ updateResult[0].id);
}
// delete category by id:
async function deleteBy(id){
    //validate existing in DB.
    const objIdToDelete = await dao.retriveBy(id);
    //if id is not in DB dont proceed to delete.
    await isValidResponse(objIdToDelete);
    
    await dao.deleteBy(id);//DELETE commit.
    
    console.log("Deleted!");
}

async function add(category){
    //validate data.
    await Category.validate(category);
    //insert Obj to DB new row. 
    const newCategory = await dao.create(category);
    //validate insert.
    await isValidResponse(newCategory);
    
    console.log("Added!: "+ newCategory);
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
    deleteBy,
    add
}