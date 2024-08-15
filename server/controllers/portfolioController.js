const { Portfolio, Stock } = require('../models');

exports.addStock = async (req, res) => {
  // console.log(req);
  const { symbol, quantity } = req.body;

  if (!symbol || !quantity) {
    return res.status(400).json({ error: 'Symbol and quantity are required' });
  }

  try {
    const [stock, created] = await Stock.findOrCreate({
      where: { symbol },
      defaults: { name: quantity }
    });

    let portfolio = await Portfolio.findOne({
      where: {
        userId: req.userId,
        StockId: stock.id,
      }
    });

    if (portfolio) {
      portfolio.quantity += parseInt(quantity, 10); 
      await portfolio.save();
    } else {
      console.log({ req }, req.userId);
      portfolio = await Portfolio.create({
        userId: req.userId,
        StockId: stock.id,
        quantity: parseInt(quantity, 10) 
      });
    }

    res.status(201).json({ message: 'Stock added to portfolio', portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add stock to portfolio' });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findAll({
      where: { UserId: req.userId },
      include: Stock
    });

    res.status(200).json({ portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve portfolio' });
  }
};

exports.removeStock = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findOne({
      where: {
        id,
        userId: req.userId, 
      },
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Stock not found in portfolio' });
    }
    await portfolio.destroy();
    res.status(200).json({ message: 'Stock removed from portfolio' });
  } catch (err) {
    console.error('Error removing stock from portfolio:', err);
    res.status(500).json({ error: 'Failed to remove stock from portfolio' });
  }
};