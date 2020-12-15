const logic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();


// Add new/ create:
router.post("/add", async (request, response) => {
    
    const newCategory = request.body;
    
    try {
        await logic.add(newCategory);
        response.status(201).json("Category added"); // 201 - request has been fulfilled
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

// Update by ID:
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const categoryToUpdate = request.body;
    categoryToUpdate.id = id;
    
    try {
        await logic.update(categoryToUpdate);
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

