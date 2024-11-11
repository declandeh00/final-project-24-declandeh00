/**
 * @file This is the file that creates the Booking Confirmation component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React from "react";
import "../App.css";

// This is the function that run the booking confirmation
const BookingConfirmation = ({ room, nameOfEvent, lecture, onClose }) => {
  // This is how i turned the 24hr time to 12hr time
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-popup">
        <h2>Confirm Booking</h2>
        <p>
          You have booked a class for {nameOfEvent} in {room.room} for{" "}
          {room.date} at {convertTo12HourFormat(room.start_time)} -{" "}
          {convertTo12HourFormat(room.end_time)} for {lecture}.
        </p>
        <button onClick={onClose}>Confirm</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
