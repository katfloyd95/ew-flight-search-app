const express = require('express');
const cors = require('cors');
const path = require('path');
const offers = require('./price_offers.json');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/price-offers', (_req, res) => {
  res.json(offers);
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
