require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const photoRoutes = require('./routes/photoRoutes');
const { startFetching } = require('./service/photoService');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Use the routes
app.use('/photos', photoRoutes);

app.get('/', (req,res) => {
    return res.send("Welcome Travelsy Server")
})

// Start fetching data periodically
startFetching();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
