const express = require("express");
const router = express.Router();

const register = require("../../middlewares/register");
const login = require("../../middlewares/login");

const User = require("../../models/User");

router.post("/register", register, (req, res) => {
    const { name, lastname, email, password } = req.body;
    const user = new User({
        name,
        lastname,
        email,
        password
    });
    user
        .save()
        .then(user => res.status(201).json({ user }))
        .catch(e => console.log(e))
});

router.post("/login", login, async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        const token = await user.generateToken();
        res.status(200).json({ user, token: `Bearer ${token}` });
    } catch (e) {
        console.log(e);
    }
});


module.exports = router;