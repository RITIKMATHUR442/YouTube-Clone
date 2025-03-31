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

// CORS Configuration
const corsOptions = {
    origin: '*', // Change '*' to a specific frontend URL if needed (e.g., 'http://localhost:3000')
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

const connectWithDatabase = async () => {
    try {
        const res = await mongoose.connect(`mongodb+srv://ritikmathur30:ritik%401234@cluster0.g3w2u7j.mongodb.net/myDatabase?retryWrites=true&w=majority`, {
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
