const express = require('express');
const cors = require('cors');
// const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const restaurantRoutes = require('./routes/restaurantRoute');
const healthRoutes = require('./routes/healthRoute');
const roueRoutes = require('./routes/roueRoute');
require('dotenv').config();

const app = express();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(cors());
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/roue', roueRoutes)



app.listen(process.env.PORT || 80, () => {
  
});
