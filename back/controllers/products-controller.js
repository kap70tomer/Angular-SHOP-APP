const logic = require("../logic/products-logic");
const express = require("express");
const uuid = require("uuid");
//generates unique srting each file.
const router = express.Router();


router.get("/uploads/:name", (request, response)=>{       
    // Extracting the filename
    let fileName = request.params.name;

    console.log(fileName);
    console.log(__dirname);

    let fullQualifiedFileName = __dirname + "/uploads/"+fileName;
    
    response.sendFile(fullQualifiedFileName);
})


router.post("/file", async (request, response, next)=>{
    try {      
        // Extract the uploaded image.
        // IMPORTANT - The "image" property is implanted by the "express-fileupload".
        // middleware.
        const file = request.files.file;
        
        // Extracting the uploaded file's extension (e.g. yossi.png or yossi.zip).
        const extension = file.name.substr(file.name.lastIndexOf("."));
        
        // Generating a unique identifier in order to prevent conflicts between.
        // files with the same name - yet different.
        let newUuidFileName = uuid.v4();
        
        let newFileName = newUuidFileName + extension;

        file.mv("./uploads/" + newFileName); 
        // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg".
        let successfulUploadResponse = {name:newFileName};
        console.log(successfulUploadResponse.name);
        // returning the product object
        response.status(200).json(successfulUploadResponse);
    }
    catch (err) {
       response.json(err.message)
    }
});

// Add new/ create:
router.post("/add", async (request, response) => {
    
    const newProduct = request.body;
    
    try {
        await logic.add(newProduct);
        response.status(201).json("Product added"); // 201 - request has been fulfilled
    }
    catch (error) {
         response.send(error);
        // 409 - Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates
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


// Get by category id: 
router.get("/byCategory/:id", async (request, response) => {
    
    const id = +request.params.id;
    
    try {    
        const getResult = await logic.getByCategory(id);
        response.status(200).json(getResult); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).send({ error: "The requested ID is not found." }); // 404 - requested resource could not be found but may be available in the future
    };
});


// Update by ID:
router.put("/:id", async (request, response) => {
    
    const id = +request.params.id;
    const productToUpdate = request.body;
    productToUpdate.id = id;
    
    try {
        await logic.update(productToUpdate);
        response.status(200).json("Updated id:! "+ id); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(404).json({ error: "Unable to update." }); // 404 - requested resource could not be found but may be available in the future
    };
});

// Get amount:
router.get("/counter/total", async (request, response) => {
    try {
        let counter = await logic.countProducts()
        
        response.status(200).json(counter); // 200 - successful HTTP requests
    }
    catch (error) {
        response.status(405).send(error+"No connection astablished try again later."); // 404 - requested resource could not be found but may be available in the future
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

