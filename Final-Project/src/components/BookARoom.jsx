/**
 * @file This is the file that creates the Book A Room component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React, { useState } from "react";
import "../App.css";
import BookingConfirmation from "./BookingConfirmation";

// This is the function that run the Book a room
const BookARoom = ({ room, closePopup }) => {
  const [nameOfEvent, setNameOfEvent] = useState("");
  const [lecture, setLecture] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // This is how i turned the 24hr time to 12hr time
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  // This handles the required options if it has not been inputted
  const handleBookingClick = (e) => {
    e.preventDefault();
    if (nameOfEvent && lecture) {
      setShowConfirmation(true);
    }
  };

  // This closes the pop-up
  const onClose = () => {
    closePopup();
  };

  // This is the code that displays the search bar
  return (
    <>
      <form onSubmit={handleBookingClick}>
        <table>
          <tbody>
            <tr>
              <th>Name Of Event</th>
              <th>
                <input
                  type="text"
                  placeholder="Name of Event"
                  value={nameOfEvent}
                  onChange={(e) => setNameOfEvent(e.target.value)}
                  required
                />
              </th>
            </tr>
            <tr>
              <th>Lecture</th>
              <th>
                <input
                  type="text"
                  placeholder="Lecture's Full Name"
                  value={lecture}
                  onChange={(e) => setLecture(e.target.value)}
                  required
                />
              </th>
            </tr>
            <tr>
              <th>Date</th>
              <th>{room.date}</th>
            </tr>
            <tr>
              <th>Time</th>
              <th>
                {convertTo12HourFormat(room.start_time)} -{" "}
                {convertTo12HourFormat(room.end_time)}
              </th>
            </tr>
            <tr>
              <th>Type of Room</th>
              <th>{room.room_type}</th>
            </tr>
            <tr>
              <th>Number of Students</th>
              <th>{room.number_of_students}</th>
            </tr>
            <tr>
              <th>Classroom Number</th>
              <th>{room.room}</th>
            </tr>
          </tbody>
        </table>
        <div className="popup-button">
          <button type="submit">Book Room</button>
          <button type="button" onClick={onClose} className="button-cancel">
            Cancel
          </button>
        </div>
      </form>

      {/* This will display the confirmation pop-up */}
      {showConfirmation && (
        <BookingConfirmation
          room={room}
          nameOfEvent={nameOfEvent}
          lecture={lecture}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default BookARoom;
