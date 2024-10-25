const mongoose = require('mongoose');

// Define Mongoose Schema and Model
const photoSchema = new mongoose.Schema({
    albumId: Number,
    id: { type: Number, unique: true }, // Ensure unique IDs
    title: String,
    url: String,
    thumbnailUrl: String,
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
