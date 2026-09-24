const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use (express.json());

const userRouter = require('./src/routes/userRoute');
const documentRouter = require('./src/routes/documentRoute');
// const uploadNotification = require('./src/services/snsServices');
// const uploadDocument = require('./src/services/s3service');

const deleteBucket = require('./src/services/s3Delete')

app.use('/api', userRouter)
app.use('/api', documentRouter)
// app.use('/api', uploadDocument)
// app.use('/api', uploadNotification)

app.use('/api', deleteBucket)

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server is running on port ${process.env.SERVER_PORT}`);
})