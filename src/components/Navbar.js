import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".search-suggestions")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleInputChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${term}`
      );
      setSearchResults(response.data.results.slice(0, 5)); // Limit to maximum 5 results
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchResultClick = (characterId) => {
    navigate(`/characters/${characterId}`);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = () => {
    if (searchResults.length === 0) {
      toast.error("Character not found!");
    } else {
      handleSearchResultClick(searchResults[0].id);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div className="search-container">
          <form
            className="form-inline my-2 my-lg-0 position-relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearchSubmit}
            >
              Search
            </button>
            {showSuggestions && searchResults.length > 0 && (
              <div className="search-suggestions">
                <ul className="list-group">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="list-group-item"
                      onClick={() => handleSearchResultClick(result.id)}
                    >
                      {result.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
