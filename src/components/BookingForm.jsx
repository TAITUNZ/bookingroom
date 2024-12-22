import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [roomName, setRoomName] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { roomName, bookingTime };

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert('Booking successful!');
      setRoomName('');
      setBookingTime('');
    } catch (error) {
      console.error('Error booking the room:', error);
      alert('Error booking the room');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Room Name:</label>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        required
      />
      <br />
      <label>Booking Time:</label>
      <input
        type="datetime-local"
        value={bookingTime}
        onChange={(e) => setBookingTime(e.target.value)}
        required
      />
      <br />
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookingForm;
