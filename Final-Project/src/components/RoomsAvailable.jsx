/**
 * @file This is the file that creates the Rooms Available component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React, { useState } from "react";
import RoomsAvailableData from "../data/RoomAvailableData.json";
import BookARoom from "./BookARoom";
import "../App.css";

// This is the function that run the Rooms available
const RoomsAvailable = ({ filters }) => {
  const [isBookARoomVisible, setIsBookARoomVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // This is how i turned the 24hr time to 12hr time
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  // This is the way I have filtered the rooms based off what data the search bar gets
  const filteredRooms = RoomsAvailableData.filter((room) => {
    return (
      (!filters.date || room.date === filters.date) &&
      (!filters.startTime || room.start_time >= filters.startTime) &&
      (!filters.endTime || room.end_time <= filters.endTime) &&
      (!filters.roomType ||
        room.room_type.toLowerCase() === filters.roomType.toLowerCase()) &&
      (!filters.studentNumber ||
        room.number_of_students >= Number(filters.studentNumber))
    );
  });

  // This is the function that will save the data of the room and make the booking a room pop-up visible
  const bookRoom = (room) => {
    setSelectedRoom(room);
    setIsBookARoomVisible(true);
  };

  // This is the function that will close all pop-ups
  const closeBookARoom = () => {
    setIsBookARoomVisible(false);
    setSelectedRoom(null);
  };

  // This is the code that displays the cards of the data
  return (
    <div className="rooms-container">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room, index) => (
          <div key={index} className="room-card">
            <h2 className="room-title">{room.room}</h2>
            <p className="room-date">Date: {room.date}</p>
            <p className="room-time">
              {convertTo12HourFormat(room.start_time)} -{" "}
              {convertTo12HourFormat(room.end_time)}
            </p>
            <p className="room-students">
              Max students: {room.number_of_students}
            </p>
            <p className="room-type">Room Type: {room.room_type}</p>
            <button onClick={() => bookRoom(room)}>Book a Room</button>
          </div>
        ))
      ) : (
        <p>No rooms available for the selected criteria.</p>
      )}

      {/* This will open the pop-up to book the room */}
      {isBookARoomVisible && selectedRoom && (
        <div className="popup-overlay">
          <div className="popup-content">
            <BookARoom room={selectedRoom} closePopup={closeBookARoom} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsAvailable;
