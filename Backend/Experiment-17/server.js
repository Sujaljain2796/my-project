// server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = 'your_jwt_secret_here'; // change this for production
const JWT_EXPIRES_IN = '1h'; // token lifetime

// Hardcoded user for this exercise
const USER = {
  username: 'user1',
  password: 'password123'
};

// In-memory "account"
let account = {
  balance: 1000
};

// ---------- Middleware: verify JWT ----------
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  const token = parts[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // token invalid or expired
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // attach decoded payload if needed
    req.user = decoded;
    next();
  });
}

// ---------- Routes ----------

// Login: returns JWT when username/password correct
app.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }

  if (username === USER.username && password === USER.password) {
    const payload = { username }; // minimal payload
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

// Get balance (protected)
app.get('/balance', verifyToken, (req, res) => {
  return res.json({ balance: account.balance });
});

// Deposit (protected)
app.post('/deposit', verifyToken, (req, res) => {
  const { amount } = req.body || {};
  const numeric = Number(amount);
  if (!amount || Number.isNaN(numeric) || numeric <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  account.balance += numeric;
  return res.json({
    message: `Deposited $${numeric}`,
    newBalance: account.balance
  });
});

// Withdraw (protected)
app.post('/withdraw', verifyToken, (req, res) => {
  const { amount } = req.body || {};
  const numeric = Number(amount);
  if (!amount || Number.isNaN(numeric) || numeric <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (numeric > account.balance) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  account.balance -= numeric;
  return res.json({
    message: `Withdrew $${numeric}`,
    newBalance: account.balance
  });
});

// Simple root
app.get('/', (req, res) => {
  res.send('JWT Banking API is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
