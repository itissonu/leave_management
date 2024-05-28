
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const leaveTypeRoute =require('./routes/leaveTypeRoutes')
const userTypeRoute =require('./routes/userRoutes')
const leaveRoute =require('./routes/leaveRoute')
const DDbURL = "mongodb+srv://bluepirateofficial:employeeleave@cluster0.cmdbc92.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(DDbURL);
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
    }
}

const app = express()
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: 'https://leave-management-brown.vercel.app',
    credentials: true,
}));
app.use('/api/user',userTypeRoute)
app.use('/api/leavetype',leaveTypeRoute)
app.use('/api/leave',leaveRoute)


const server = app.listen(8002, () => {
    DatabaseConnection()
    console.log("connected to backend")
})