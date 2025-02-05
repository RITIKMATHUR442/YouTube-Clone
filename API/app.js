const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
require ('dotenv').config(); 
const userRoutes = require('./routes/user');
const videoRoute = require('./routes/video')
const bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload');
const commentRoute = require('./routes/comment')
const cors = require('cors') 


const connectWithDatabase = async () => {

try{
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database...');
}
catch(err)
{
        console.log(err);
}
}
app.use(cors()); 
app.use(bodyParser.json());

app.use(fileUpload({useTempFiles: true,}));
 

app.use('/user', userRoutes);
app.use('/video',videoRoute)
app.use('/comment',commentRoute)

connectWithDatabase();
module.exports = app;