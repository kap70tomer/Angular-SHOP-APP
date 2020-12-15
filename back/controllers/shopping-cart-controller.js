const logic = require("../logic/shopping-cart-logic");
const express = require("express");
const router = express.Router();
const mapUser = require("../middleware/map");



// Add new/ create:

// Get by id: 
router.get("/byId/:id", async (request, response) => {
  
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByCart(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});

router.post("/add", async (request, response) => {
    
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
   
    try {
        let newCart = await logic.add(id);
        response.status(201).json(newCart); // 201 - request has been fulfilled
    }
    catch (error) {
       response.status(409).send({ error: "Cannot create/add new." }); // 409 - Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates
    };
});
// async function test(){
//     let add = await logic.add(12);
//     console.log(add);

// }test()
// Get by user id: 
router.get("/", async (request, response) => {
    
    let token = request.headers.authorization;
    let id = mapUser.checkMapForUserId(token);
    console.log(token, id)
    
    try {    
        const getResult = await logic.getLastCarts(id);
        // console.log(getResult[0])
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});
// async function test(){
//    let cartresult = await logic.getLastCarts(1);
//    console.log(cartresult[0]);
// }test()

// Update by ID:
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const cartToUpdate = request.body;
    cartToUpdate.id = id;
    
    try {
        await logic.update(cartToUpdate);
        response.status(200).json("Updated!"); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).json({ error: "Unable to update." }); // 404 - requested resource could not be found but may be available in the future
    };
});

// Delete by Id:
router.delete("/:id", async (request, response) => {
    
    const id = +request.params.id;
    
    try {    
        let deletedInfo = await logic.deleteBy(id);
        response.status(410).send(id+" deleted!" + deletedInfo); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        response.status(404).send({ error: " Id not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});
// async function del(){
// await logic.deleteBy(107)
// }del()

router.delete("/clear/:id", async (request, response) => {

    const id = +request.params.id;

    try {
        let info = await logic.deleteCartItems(id);
        response.status(410).json(info);
    }
    catch (error){
        response.status(404).send("Id provided is not found");
        }
});

// Get all:
router.get("/", async (request, response) => {
    try {
        const getAllResult = await logic.getAll();
        response.status(200).json(getAllResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send("Cant retrive All, try again later."); // 404 - requested resource could not be found but may be available in the future
    };
});


module.exports = router;

