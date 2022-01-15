const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const carRoutes = require("./routes/car");

env.config();
mongoose.connect(process.env.DB_CONNECTION_STRING,
    () => {
        console.log('DB Connected Successfully')
    });

app.use(express.json());

app.use('/api', authRoutes,carRoutes);
app.use('/api/my-profile', profileRoutes);


app.listen(4001, () => console.log('Server is running on port 4001'));