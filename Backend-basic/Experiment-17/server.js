const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// ===== Hardcoded User and Account Data =====
const USER = { username: 'user1', password: 'pass123' };
let accountBalance = 1000;

// ===== JWT Secret Key =====
const JWT_SECRET = 'mybanksecretkey';

// ===== Middleware: Verify JWT Token =====
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(400).json({ error: 'Invalid Authorization format' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store decoded info in request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// ===== Route: Login =====
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Create JWT Token (valid for 1 hour)
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({
    message: 'Login successful!',
    token,
  });
});

// ===== Protected Route: View Balance =====
app.get('/balance', verifyToken, (req, res) => {
  res.json({
    username: req.user.username,
    balance: accountBalance,
  });
});

// ===== Protected Route: Deposit =====
app.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid deposit amount' });
  }

  accountBalance += amount;
  res.json({
    message: `Deposited ₹${amount} successfully.`,
    newBalance: accountBalance,
  });
});

// ===== Protected Route: Withdraw =====
app.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal amount' });
  }

  if (amount > accountBalance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  accountBalance -= amount;
  res.json({
    message: `Withdrawn ₹${amount} successfully.`,
    newBalance: accountBalance,
  });
});

// ===== Start the Server =====
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🏦 Banking API running on http://localhost:${PORT}`);
});
