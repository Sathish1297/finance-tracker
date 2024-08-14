const express = require('express');
const cors = require('cors');
const { syncDB } = require('./models');
const authRoute = require('./routes/authRoutes');
const portfolioRoute = require('./routes/portfolioRoutes');
const stockRoute = require('./routes/stockRoutes')

require('dotenv').config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/portfolio', portfolioRoute);
app.use('/api/stocks', stockRoute);

syncDB().then(() => {
  app.listen(process.env.PORT || 3307, () => {
    console.log(`Server running on port ${process.env.PORT || 3307}`);
  });
});
