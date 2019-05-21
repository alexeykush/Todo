const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\S+\.?\S+@\S+\.\S+/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt
            .hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            })
            .catch(e => console.log(e));
    } else {
        next();
    }
});

UserSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(password, this.password)
            .then(isMatch => resolve(isMatch))
            .catch(e => reject(e));
    })
};

UserSchema.methods.generateToken = function () {
    return new Promise((resolve, reject) => {
        const payload = {
            id:this.id,
            name: this.name
        };
        jwt.sign(payload, process.env.secretOrKey, (err, token) => {
            if (err) reject(err);
            resolve(token);
        })
    })
};

module.exports = User = mongoose.model("users",UserSchema);