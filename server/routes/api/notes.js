const express = require("express");
const router = express.Router();
const passport = require("passport");
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');

const Note = require("../../models/Note");

router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { text, title, image = {} } = req.body;
    if(!text) return res.status(400).json({ error: "Text field is required" });

    const notesData = {
        text,
        user: req.user.id
    };
    if (title) {
        notesData.title = title
    }

    if(Object.keys(image).length){
        notesData.image = image;
    }

    const note = new Note({
        ...notesData
    });

    note
        .save()
        .then(note => {
            res.status(201).json({ note });
        })
        .catch(e => console.log(e))
});

router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    Note
        .find({user: req.user.id})
        .then(notes => {
            res.status(200).json({ notes });
        })
        .catch(e => console.log(e));
});

router.get("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Note
        .findOne({_id: req.params.id, user: req.user.id})
        .then(note => {
            if(!note) return res.status(404).json({ error: "Note not found" });

            res.status(200).json({note});
        })
        .catch(e => console.log(e));
});

router.put("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { text, title, image = {} } = req.body;
    const newData = { title, text, image };

    Note
        .findOneAndUpdate({_id: req.params.id, user: req.user.id}, newData, { new: true })
        .then(note => {
            if(!note) return res.status(404).json({ error: "Note not found" });

            res.status(200).json({ note });
        })
        .catch(e => console.log(e));
});

router.delete("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Note
        .findOneAndRemove({ _id: req.params.id, user: req.user.id })
        .then(note => {
            if(!note) return res.status(404).json({ error: "Note not found" });

            res.status(200).json({ note });
        })
        .catch(e => console.log(e));
});

module.exports = router;