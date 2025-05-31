require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trip', require('./routes/tripRoutes'));
//app.use('/api/trips', require('./routes/trip'));
//app.use('/api/expenses', require('./routes/expense'));
//app.use('/api/gallery', require('./routes/gallery'));
//app.use('/api/contact', require('./routes/contact'));

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(err));