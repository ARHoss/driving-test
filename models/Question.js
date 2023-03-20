// Mongoose variable
const mongoose = require("mongoose");

// Schema is the blueprint of the model
const QuestionSchema = new mongoose.Schema({
    // Variable Name
    title: {
        // Type
        type: String,
        // Required variable
        required: true,
    },
    // Variable Name
    answer: [{
        // Type
        type: String,
        // Required variable
        required: true,
    }],
    // array name
    users: [{
        // Type
        type: mongoose.Schema.Types.ObjectId,
        // Ref variable
        ref: "User",
    }],
    // Variable Name
    createdAt: {
        // Type
        type: Date,
        // Default value
        default: Date.now,
    },
    // Variable Name
    imageURL: {
        // Type
        type: String,
        // Default value
        default: null,
        // Required variable
        required: false,
    },
});

// This is where the collection names are defined - mongoose autamtically makes it plural and lowercase - the third argument is hard coded name for collection if defined
module.exports = mongoose.model("Question", QuestionSchema);
