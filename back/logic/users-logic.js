//imported modules:
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

let dao = require("../dao/users-dao");
let User = require("../models/user");

let crypto = require("crypto");
let salt = "salamtak9";

//User Login:
async function login(user){
    
    User.validate(user);
    //validate Obj data.
    let hash = crypto.createHash('md5').update(salt + user.password).digest('hex');
    user.password = hash;
    //set new Hashed & Salted Password.
    const loginResult = await dao.login(user);
    //Login commit.
    if(!loginResult){
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    await isValidResponse(loginResult);
    //Validation of login attempt result.
    console.log("logged in!");
    return loginResult;
}

//retrive single ID:
async function getUser(id){
   
    const getUserResult = await dao.retriveBy(id);
    //validate retrived obj.
    await isValidResponse(getUserResult);
    console.log("Succesful Retrive!L");
    return getUserResult[0];
}
// change specific user Details (put).
// async function updateUser(user){
//     //update user details:
//     User.validate(user);
//     const updateUserDetailsResult = await dao.update(user);
//     //set update in DB.
//     console.log("updateUserDetailsResult")
//     await isValidResponse(updateUserDetailsResult);
//     // validate response of update.
//     console.log("Updated!");
//     return updateUserDetailsResult;
// };
// Delete single user by ID:
async function deleteUser(id){
    
    let userToDelete = await dao.retriveBy(id); 
    //validate existing in DB.
    await isValidResponse(userToDelete);
    //validate response.
    await dao.deleteBy(id);
    //DELETE commit.
    console.log("Deleted!: "+id);
    return;
};

// Insert new User to DB:
async function addUser(user){
    
    User.validate(user);
    //validate user Obj data.
    let isExistByEmail = await dao.isUserExistByEmail(user.email);
    //validate email.
    if(!isExistByEmail){
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }//validate email is not taken.
    let hash = crypto.createHash('md5').update(salt +user.password).digest('hex');
    user.password = hash;//set new hashed Password.
    //validate obj data.
    const newUser = await dao.create(user);
    await isValidResponse(newUser);
    // validate add Exe response.
    console.log("User Added!");
    return newUser;
}
// addUser({city: "BEER-SHEVA",
// email: "Halabi66@walla.com",
// last_name: "Goooo",
// name: "Yonat",
// password: "123123",
// street: "Tipo44"})

async function isValidResponse(object){
    if (!object){
        console.log("invalid response. logic");
        throw new ServerError (ErrorType.GENERAL_ERROR);
    };
}; 

module.exports = {
    login,
    // updateUser,
    getUser,
    deleteUser,
    addUser
}