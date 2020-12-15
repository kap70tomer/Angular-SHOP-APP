const logic = require("../logic/cart-items-logic");
const express = require("express");
const router = express.Router();

// Add new/ create:
router.post("/add", async (request, response) => {
    
    const newItem = request.body;
    
    try {
        let insertItem = await logic.add(newItem);
        console.log(insertItem)
        response.status(201).json(insertItem); // 201 - request has been fulfilled
    }
    catch (error) {
        response.status(409).send({ error: "Cannot create/add new." }); // 409 - Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates
    };
});
// async function test(){
//     let ob= await logic.add({product_id:4,quantity:3,total_price:21,cart_id:14});
//     console.log(ob);
// }
// test()

// Get by product id and cart id: 
router.get("/proId/:id", async (request, response) => {
    
    const id =+ request.params.id;
    
    try {    
        const getResult = await logic.getProductBy(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});
//retrive all items of the cart by cart id.
router.get("/:id", async (request, response) => {
     
    let id = request.params.id;
    
    try {    
        const getResult = await logic.getByCart(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});


// Update by ID:
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const itemToUpdate = request.body;
    itemToUpdate.product_id = id;
    
    try {
        let update = await logic.update(itemToUpdate);
        response.status(200).json(update); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).json({ error: "Unable to update." }); // 404 - requested resource could not be found but may be available in the future
    };
});

// Delete :
router.post("/delete", async (request, response) => {
    
    const itemToDelete =request.body;
    
    try {    
        let itemDeleteResult = await logic.deleteBy(itemToDelete);
        console.log(itemDeleteResult)
        response.send(itemDeleteResult); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        response.status(404).send({ error: " Id not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});


// Get all:
router.get("/total/:id", async (request, response) => {
    
    let id =+ request.params.id

    try {
        const getTotalResult = await logic.calcTotalCartPrice(id);
        response.status(200).json(getTotalResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send("Cant retrive All, try again later."); // 404 - requested resource could not be found but may be available in the future
    };
});
// async function test(){
//     let ob = await logic.calcTotalCartPrice(14)
//     console.log(ob)
// }test()
module.exports = router;

