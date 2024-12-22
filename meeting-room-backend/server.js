const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meeting-room', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// สร้าง Schema และ Model สำหรับ Booking
const bookingSchema = new mongoose.Schema({
  roomName: String,
  bookingTime: String,
});
const Booking = mongoose.model('Booking', bookingSchema);

// API สำหรับรับข้อมูล booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { roomName, bookingTime } = req.body;
    const newBooking = new Booking({ roomName, bookingTime });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created' });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ตั้งค่า Route สำหรับ Root Path
app.get('/', (req, res) => {
  res.send('Welcome to the Meeting Room Booking API');
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
