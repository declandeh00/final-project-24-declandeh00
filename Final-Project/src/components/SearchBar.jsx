/**
 * @file This is the file that creates the search bar component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React, { useState } from "react";
import "../App.css";

// This is the function that run the Search Bar
const SearchBar = ({ setFilters }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [roomType, setRoomType] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  // This saves the data that has been inputted in the search bar
  const handleSearch = () => {
    const filters = {
      date,
      startTime,
      endTime,
      roomType,
      studentNumber,
    };
    setFilters(filters);
  };

  // This is the code that displays the search bar
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="search-bar">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <label>Room Type:</label>
        <select
          name="roomType"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          required
        >
          <option value="">Select Room Type</option>
          <option value="classroom">Classroom</option>
          <option value="computer room">Computer Room</option>
        </select>
        <label>Student Number:</label>
        <input
          type="text"
          name="studentNumber"
          placeholder="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          required
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
