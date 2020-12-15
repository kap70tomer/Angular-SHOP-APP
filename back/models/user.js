const joi = require("joi");

class User {

    constructor(id ,name, last_name, email, password, city, street, user_type) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.street = street; 
        this.user_type = user_type;
    };

    static validate(userToValidate) {
        const validationSchema = {
            id: joi.number().optional(),
            name: joi.string().required(),
            last_name: joi.string().required(),
            email: joi.string().required().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
            password: joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,10})/),
            city: joi.string().optional(),
            street: joi.string().optional(),
            user_type: joi.string(),
        };

        const error = joi.validate(userToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = User;