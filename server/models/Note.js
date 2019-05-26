const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    image: {
        publicId: String,
        url: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

module.exports = Note = mongoose.model("notes",NoteSchema);