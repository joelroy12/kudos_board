import { useState } from "react";
import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import BoardPage from "./Components/BoardPage";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeSearch from "./Components/HomeSearch";

function App() {
  const [searchSuggestions, setSearchSuggestions] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateBoard = (newBoard) => {
    setBoards((prev) => [newBoard, ...prev]);
  };

  return (
    <div className="App">
      <div className="top-section">
        <Header />
        <Banner />
        <HomeSearch />

      </div>
       
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
