// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/bank_transfer_example';

// ----- Mongoose setup -----
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 }
});

const User = mongoose.model('User', userSchema);

// ----- Create sample users endpoint -----
// POST /create-users
// Body (optional) : { "users": [ { "name": "Alice", "balance": 1000 }, ... ] }
// If no body provided, it will create two default users (Alice, Bob).
app.post('/create-users', async (req, res) => {
  try {
    const payload = req.body && Array.isArray(req.body.users) ? req.body.users : null;

    const usersToCreate = payload ?? [
      { name: 'Alice', balance: 1000 },
      { name: 'Bob', balance: 500 }
    ];

    const created = await User.insertMany(usersToCreate);
    return res.status(201).json({ message: 'Users created', users: created });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error creating users' });
  }
});

// ----- Transfer endpoint -----
// POST /transfer
// Body: { "fromUserId": "<id>", "toUserId": "<id>", "amount": 150 }
app.post('/transfer', async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body || {};
  const numericAmount = Number(amount);

  if (!fromUserId || !toUserId || Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: 'fromUserId, toUserId and a positive numeric amount are required' });
  }

  if (fromUserId === toUserId) {
    return res.status(400).json({ message: 'Cannot transfer to the same account' });
  }

  try {
    // 1) Atomically decrement sender balance only if they have enough balance
    const sender = await User.findOneAndUpdate(
      { _id: fromUserId, balance: { $gte: numericAmount } },       // filter ensures sufficient funds
      { $inc: { balance: -numericAmount } },                      // atomic decrement
      { new: true }                                               // return updated doc
    );

    if (!sender) {
      // Either sender doesn't exist OR insufficient balance
      // Distinguish between the two:
      const senderExists = await User.exists({ _id: fromUserId });
      if (!senderExists) {
        return res.status(404).json({ message: 'Sender account not found' });
      } else {
        return res.status(200).json({ message: 'Insufficient balance' });
      }
    }

    // 2) Increment receiver balance
    const receiver = await User.findByIdAndUpdate(
      toUserId,
      { $inc: { balance: numericAmount } },
      { new: true }
    );

    if (!receiver) {
      // Receiver not found — roll back sender (credit back)
      await User.findByIdAndUpdate(fromUserId, { $inc: { balance: numericAmount } });
      return res.status(404).json({ message: 'Receiver account not found — operation rolled back' });
    }

    // 3) Success response
    return res.status(200).json({
      message: `Transferred $${numericAmount} from ${sender.name} to ${receiver.name}`,
      senderBalance: sender.balance,
      receiverBalance: receiver.balance
    });

  } catch (err) {
    console.error('Transfer error:', err);
    // In a rare unexpected error, we should try to avoid leaving inconsistent data,
    // but since we don't use transactions, we just report server error.
    return res.status(500).json({ message: 'Server error during transfer' });
  }
});

// ----- Helper: get all users (for testing) -----
app.get('/users', async (req, res) => {
  try {
    const all = await User.find({});
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch users' });
  }
});

// Root
app.get('/', (req, res) => res.send('Account Transfer API running'));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
