const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const usersRoute = require("./routes/api/users");
const notesRoute = require("./routes/api/notes");

const port = process.env.PORT || 80;

const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./config/passport")(passport);

mongoose
    .connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(() => console.log("Mongo connected"))
    .catch(e => console.log(e));

app.use('/api/users',usersRoute);
app.use('/api/notes',notesRoute);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});