const mongoose = require('mongoose');

const uri = "mongodb+srv://Prince:PrinceGaur@cluster0.yhpfu1y.mongodb.net/docunexus?retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting to connect to MongoDB...");

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false
})
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("ERROR: Connection failed:", err);
        process.exit(1);
    });
