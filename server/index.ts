const express = require('express');
const cors = require('cors');
const offers = require('./price_offers.json');

const app = express();
app.use(cors());

app.get('/api/price-offers', (_req, res) => {
  res.json(offers);
});

app.listen(3001, () => {
  console.log('Mock API running on http://localhost:3001');
});
