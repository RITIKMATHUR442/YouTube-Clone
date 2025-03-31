const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
require('dotenv').config(); 
const userRoutes = require('./routes/user');
const videoRoute = require('./routes/video');
const bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload');
const commentRoute = require('./routes/comment');
const cors = require('cors'); 

// ✅ Fix CORS Configuration
const corsOptions = {
    origin: ['https://you-tube-clone-43rz.vercel.app', 'https://you-tube-clone-o3nx.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allows cookies/auth headers
    optionsSuccessStatus: 200 // Fixes some browser issues
};

// ✅ Apply CORS before routes
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle CORS preflight requests
    }

    next();
});

const connectWithDatabase = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database...');
    } catch (err) {
        console.log('Database connection error:', err);
    }
};

app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/user', userRoutes);
app.use('/video', videoRoute);
app.use('/comment', commentRoute);

connectWithDatabase();
module.exports = app;
