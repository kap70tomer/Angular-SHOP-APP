const logic = require("../logic/orders-logic");
const mapUser = require("../middleware/map");
const express = require("express");
const router = express.Router();

// Add new/ create:
router.post("/add", async (request, response) => {
    
    let token = request.headers.authorization;
    let newOrder = request.body;
    
    newOrder.user_id =+ mapUser.checkMapForUserId(token);
    
    try {
        await logic.add(newOrder);
        response.status(201).json("Order added"); // 201 - request has been fulfilled
    }
    catch (error) {
        response.status(409).send({ error: "Cannot create/add new." }); // 409 - Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates
    };
});

// Get by id: 
router.get("/:id", async (request, response) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getBy(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});


// Get all orders by user id:  later use option for admin.
router.get("/byUser/:id", async (request, response) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByUser(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});


// Update by ID: change order details later admin option.
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const orderToUpdate = request.body;
    // orderToUpdate.id = id;
    
    try {
        await logic.update(orderToUpdate);
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
        await logic.deleteBy(id);
        response.status(410).send("id: "+id+" deleted!"); // 410 - resource requested is no longer available and will not be available again
    }
    catch (error) {
        response.status(404).send({ error: " Id not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});

// Get all orders:
router.get("/", async (request, response) => {
    try {
        const getAllResult = await logic.getAll();
        response.status(200).json(getAllResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send("Cant retrive All, try again later."); // 404 - requested resource could not be found but may be available in the future
    };
});
// Get amount of shop orders all history:
router.get("/counter/total", async (request, response) => {
    try {
        let counter = await logic.countOrders()
        response.status(200).json(counter); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send(error+"No connection astablished try again later."); // 404 - requested resource could not be found but may be available in the future
    };
});

module.exports = router;

