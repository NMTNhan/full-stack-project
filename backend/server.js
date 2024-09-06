const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { LocalStorage } = require('node-localstorage');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const localStorage = new LocalStorage('./scratch');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); // Ensure this is imported
const friendRoutes = require('./routes/friendRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const groupRoutes = require('./routes/groupRoutes');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

//Listen for connection events
mongoose.connection.on('connected', () => {
  if (localStorage.getItem('token')) {
    console.log('Token found, attempting to send queued reactions')
    console.log('queuedReactions: ',localStorage.getItem('queuedReactions'))
    localStorage.getItem('queuedReactions').forEach(async (item) => {
      await fetch(item.url, {
        method: item.method,
        body: JSON.stringify(item.body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    })
    localStorage.removeItem('queuedReactions')
  }
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes); // Ensure this is being used
app.use('/api/friends', friendRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/groups', groupRoutes); // Use group routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app
