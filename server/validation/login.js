const isEmpty = require("./isEmpty");

const validEmail = /\S+\.?\S+@\S+\.\S+/;

const validateLoginInput = data => {
    const errors = {};

    const { email = "", password = "" } = data;

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

module.exports = validateLoginInput;