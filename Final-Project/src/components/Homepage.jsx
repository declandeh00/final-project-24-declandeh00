/**
 * @file This is the file that creates the Homepage component
 * @author Declan de Haas
 */

// These are all the imports used to create the code and the where to navigate to
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RoomsAvailable from "./RoomsAvailable";
import "../App.css";

// This is the function that run the home page
const Homepage = () => {
  // This is the options for getting the data
  const [filters, setFilters] = useState({
    date: "",
    startTime: "",
    endTime: "",
    roomType: "",
    studentNumber: "",
  });

  // This is the display for the site
  return (
    <>
      <SearchBar setFilters={setFilters} />
      <h1 className="content-below">Rooms Available</h1>
      <RoomsAvailable filters={filters} />
    </>
  );
};

export default Homepage;
