const isEmpty = require("./isEmpty");

const validEmail = /\S+\.?\S+@\S+\.\S+/;

const validateRegisterInput = data => {
    const errors = {};

    const { name = "", lastname = "", email = "", password = "" } = data;

    if(isEmpty(name)){
        errors.name = "Name field is required";
    }
    if(isEmpty(lastname)){
        errors.lastname = "Last name field is required";
    }
    if(!validEmail.test(email)){
        errors.email = "Not valid email";
    }
    if(isEmpty(email)){
        errors.email = "Email field is required";
    }
    if(password.length < 6){
        errors.password = "Password must be at least 6 characters";
    }
    if(isEmpty(password)){
        errors.password = "Password filed is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateRegisterInput;