const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const groupRoutes = require('./routes/groupRoutes'); // Import group routes

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

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes); // Ensure this is being used
app.use('/api/groups', groupRoutes); // Use group routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
