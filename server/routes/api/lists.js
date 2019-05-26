const express = require("express");
const router = express.Router();
const passport = require("passport");

const NoteList = require("../../models/NoteList");

const checkLists = require("../../middlewares/checkLists");

router.post("/", [passport.authenticate("jwt", {session: false}), checkLists], (req, res) => {
    const { items, title, image = {} } = req.body;

    const notesData = {
        lists: items,
        image,
        user: req.user.id
    };

    if (title) {
        notesData.title = title
    }


    const noteList = new NoteList({
        ...notesData
    });

    noteList
        .save()
        .then(list => {
            res.status(201).json({ list });
        })
        .catch(e => console.log(e))
});

router.get("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    NoteList
        .find({user: req.user.id})
        .then(lists => {
            res.status(200).json({ lists });
        })
        .catch(e => console.log(e));
});

router.get("/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    NoteList
        .findOne({_id: req.params.id, user: req.user.id})
        .then(list => {
            if(!list) return res.status(404).json({ error: "Note list not found" });

            res.status(200).json({ list });
        })
        .catch(e => console.log(e));
});

router.put("/:id", [passport.authenticate("jwt", {session: false}), checkLists], async (req, res) => {
    try{
        const list = await NoteList.findOne({_id: req.params.id, user: req.user.id});
        if(!list) return res.status(404).json({ error: "Note not found" });
        const { title = "", items, image = {} } = req.body;
        list.title = title;
        list.lists = items;
        list.image = image;
        const doc = await list.save();
        res.status(200).json({ list: doc });
    } catch (e) {
        console.log(e);
    }
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    NoteList
        .findOneAndRemove({ _id: req.params.id, user: req.user.id })
        .then(list => {
            if(!list) return res.status(404).json({ error: "Note list not found" });

            res.status(200).json({ list });
        })
        .catch(e => console.log(e));
});



module.exports = router;