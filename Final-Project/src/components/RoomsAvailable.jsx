/**
 * @file This is the file that creates the Rooms Available component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React, { useState, useEffect } from "react";
import RoomsAvailableData from "../data/RoomAvailableData.json";
import BookARoom from "./BookARoom";
import "../App.css";

// This is the function that runs the Rooms Available component
const RoomsAvailable = ({ filters }) => {
  const [isBookARoomVisible, setIsBookARoomVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // This is how I turned the 24hr time to 12hr time
  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")}${ampm}`;
  };

  // This useEffect will be used to make sure that the data will only show if the data has been searched for
  useEffect(() => {
    setHasSearched(
      filters.date ||
      filters.startTime ||
      filters.endTime ||
      filters.roomType ||
      filters.studentNumber
    );
  }, [filters]);

  // This filters the rooms based on the data in the search bar
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

  // This saves the selected room data and shows the booking pop-up
  const bookRoom = (room) => {
    setSelectedRoom(room);
    setIsBookARoomVisible(true);
  };

  // This closes the booking pop-up
  const closeBookARoom = () => {
    setIsBookARoomVisible(false);
    setSelectedRoom(null);
  };

  // This displays the room data cards once a search has been done
  return (
    <>
      {hasSearched ? (
        filteredRooms.length > 0 ? (
          <div className="rooms-container">
            {filteredRooms.map((room, index) => (
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
            ))}
          </div>
        ) : (
          <p>No rooms available for the selected criteria.</p>
        )
      ) : (
        <p>Use the search filters to find available rooms.</p>
      )}

      {isBookARoomVisible && selectedRoom && (
        <div className="popup-overlay">
          <div className="popup-content">
            <BookARoom room={selectedRoom} closePopup={closeBookARoom} />
          </div>
        </div>
      )}
    </>
  );
};

export default RoomsAvailable;
