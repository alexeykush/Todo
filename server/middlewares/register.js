const User = require("../models/User");

const validateRegisterInput = require("../validation/register");

const register = async (req, res, next) => {
    const {isValid, errors} = validateRegisterInput(req.body);
    if (!isValid) return res.status(400).json({errors});

    const user = await User.findOne({email: req.body.email});
    if (user) {
        errors.email = "User already exists";
        return res.status(400).json({errors})
    }
    next();

};

module.exports = register;