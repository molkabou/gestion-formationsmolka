const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const formationRoutes = require('./routes/formationRoutes'); // Ensure routes are updated for MySQL
app.use('/api', formationRoutes);

const formateurRoutes = require('./routes/formateurRoutes');
app.use('/api/formateurs', formateurRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
