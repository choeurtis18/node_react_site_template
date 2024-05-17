const mongoose = require('mongoose');

// Define the Tasks schema
const tasksSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
});

// Create the Tasks model from the schema
const Tasks = mongoose.model('Tasks', tasksSchema);
module.exports = Tasks;