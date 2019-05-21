const User = require("../models/User");

const validateLoginInput = require("../validation/login");

const login = async (req, res, next) => {
    try{
        const {isValid, errors} = validateLoginInput(req.body);
        if (!isValid) return res.status(400).json({errors});

        const user = await User.findOne({email: req.body.email});
        if (!user) {
            errors.email = "Incorrect login";
            return res.status(404).json({errors})
        }

        const isMatch = await user.comparePassword(req.body.password);
        if(!isMatch){
            errors.password = "Incorrect password";
            return res.status(400).json({errors})
        }
        next();
    } catch (e) {
        console.log(e)
    }
};

module.exports = login;