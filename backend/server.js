require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Define Stock Schema
const stockSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
});

const Stock = mongoose.model('Stock', stockSchema);

// Mock API endpoint for fetching stock prices
app.get('/api/stocks/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const stock = await Stock.findOne({ symbol });
  
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }

  // Generate a random price change between -5% and 5%
  const priceChange = stock.price * (Math.random() * 0.1 - 0.05);
  stock.price += priceChange;
  await stock.save();

  res.json(stock);
});

// Endpoint for getting the list of stocks
app.get('/api/stocks', async (req, res) => {
  const stocks = await Stock.find({}, 'symbol name');
  res.json(stocks);
});

// Initialize some stocks
const initializeStocks = async () => {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 150 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2800 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 300 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3300 },
    { symbol: 'FB', name: 'Meta Platforms, Inc.', price: 330 },
  ];

  for (const stock of stocks) {
    await Stock.findOneAndUpdate({ symbol: stock.symbol }, stock, { upsert: true });
  }
};

initializeStocks();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});