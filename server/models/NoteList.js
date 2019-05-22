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
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

module.exports = Note = mongoose.model("notelists",NoteListSchema);