const express = require("express");
const router = express.Router();
const passport = require("passport");
const cloudinary = require('cloudinary');
const formidable = require('express-formidable');

router.post('/', [passport.authenticate("jwt", {session: false}), formidable()], (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        res.status(200).json({
            publicId: result.public_id,
            url: result.url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
});

router.delete('/:id', passport.authenticate("jwt", {session: false}), (req, res) => {
    const id = req.params.id;

    cloudinary.uploader.destroy(id, (error, result) => {
        if (error) return res.json({succes: false, error});
        res.status(200).end();
    })
});

module.exports = router;