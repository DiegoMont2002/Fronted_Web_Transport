import React, { useState } from "react";
import "./searchbar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
    // Aquí iría la lógica de búsqueda
  };

  return (
    <nav className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar rutas, destinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </div>
      </form>
    </nav>
  );
};

export default SearchBar;