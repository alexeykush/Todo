const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteListSchema = new Schema({
    title: {
        type: String
    },
    items: [
        {
            text: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

module.exports = Note = mongoose.model("notelists",NoteListSchema);