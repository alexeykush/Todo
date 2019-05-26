const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cloudinary = require('cloudinary');

const usersRoute = require("./routes/api/users");
const notesRoute = require("./routes/api/notes");
const listsRoute = require("./routes/api/lists");
const imagesRoute = require("./routes/api/images");

const port = process.env.PORT || 80;

const app = express();
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("client/build"));
app.use(passport.initialize());
require("./config/passport")(passport);

mongoose
    .connect(process.env.DATABASE, {useNewUrlParser: true})
    .then(() => console.log("Mongo connected"))
    .catch(e => console.log(e));

app.use('/api/users', usersRoute);
app.use('/api/notes', notesRoute);
app.use('/api/lists', listsRoute);
app.use("/api/images", imagesRoute);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});