const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = `${process.env.MONGO_URL}/taskManager`;

console.log("databaseUrl", databaseUrl);

const connectDatabase = async () => {
    try {
        await mongoose.connect(databaseUrl);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectDatabase;
