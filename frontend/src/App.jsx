import { useState } from "react";
import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState("");
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <div className="top-section">
        <Header />
        <Banner />
        <SearchBar />
      </div>
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
