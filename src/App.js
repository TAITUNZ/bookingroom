import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [roomName, setRoomName] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = { roomName, bookingTime };

    try {
      // ส่งข้อมูลไปที่ API (POST request)
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      setMessage(response.data.message || 'Booking successful!');
      setRoomName('');
      setBookingTime('');
    } catch (error) {
      setMessage('Error booking the room');
      console.error('Error details:', error.response || error.message);
    }
  };

  return (
    <div className="App">
      <h1>Meeting Room Booking</h1>
      
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

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
