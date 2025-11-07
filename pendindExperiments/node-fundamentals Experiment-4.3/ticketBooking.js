const express = require('express');
const app = express();
const PORT = 3000;

// The duration for which a seat lock is valid (in milliseconds)
// Set to 60 seconds (1 minute) as per the requirement.
const LOCK_TIMEOUT = 60 * 1000;

// In-memory data structure to store the state of all seats.
// Each seat can have one of three statuses: 'available', 'locked', or 'booked'.
const seats = {
  '1': { status: 'available' },
  '2': { status: 'available' },
  '3': { status: 'available' },
  '4': { status: 'available' },
  '5': { status: 'available' },
  '6': { status: 'available' },
};

app.use(express.json());

// --- API Endpoints ---

/**
 * GET /seats
 * Retrieves the current status of all seats.
 */
app.get('/seats', (req, res) => {
  res.status(200).json(seats);
});

/**
 * POST /lock/:id
 * Attempts to place a temporary lock on a specific seat.
 */
app.post('/lock/:id', (req, res) => {
  const { id } = req.params;
  const seat = seats[id];

  // 1. Check if the seat exists
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found.' });
  }

  // 2. Check if the seat is already booked
  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat is already booked.' });
  }

  // 3. Check if the seat is locked and if the lock is still valid
  if (seat.status === 'locked' && seat.lockExpiresAt > new Date()) {
    return res.status(400).json({ message: 'Seat is currently locked.' });
  }

  // 4. Lock the seat
  seat.status = 'locked';
  seat.lockExpiresAt = new Date(Date.now() + LOCK_TIMEOUT);
  console.log(`Seat ${id} locked until ${seat.lockExpiresAt.toLocaleTimeString()}`);

  // 5. Set a timer to automatically unlock the seat when the timeout expires
  setTimeout(() => {
    // Only unlock if the seat is still locked by this specific lock instance
    if (seats[id].status === 'locked' && seats[id].lockExpiresAt.getTime() === seat.lockExpiresAt.getTime()) {
      seats[id].status = 'available';
      delete seats[id].lockExpiresAt;
      console.log(`Seat ${id} lock expired. Status set to available.`);
    }
  }, LOCK_TIMEOUT);

  res.status(200).json({ message: `Seat ${id} locked successfully. Confirm within 1 minute.` });
});

/**
 * POST /confirm/:id
 * Confirms the booking for a seat that is currently locked.
 */
app.post('/confirm/:id', (req, res) => {
  const { id } = req.params;
  const seat = seats[id];

  // 1. Check if the seat exists
  if (!seat) {
    return res.status(404).json({ message: 'Seat not found.' });
  }

  // 2. Check if the seat is in a confirmable state (i.e., locked)
  if (seat.status !== 'locked') {
    return res.status(400).json({ message: 'Seat is not locked and cannot be booked' });
  }

  // 3. Check if the lock has expired
  if (seat.lockExpiresAt <= new Date()) {
    // If expired, revert status and inform the user
    seat.status = 'available';
    delete seat.lockExpiresAt;
    return res.status(400).json({ message: 'Your lock has expired. Please try again.' });
  }

  // 4. Confirm the booking
  seat.status = 'booked';
  delete seat.lockExpiresAt; // The lock is no longer needed

  res.status(200).json({ message: `Seat ${id} booked successfully!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Ticket booking server running at http://localhost:${PORT}`);
});