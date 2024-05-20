import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 10;

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        `https://assignment-backend-gucj.onrender.com/api/characters?page=${currentPage}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  const getStatusColor = (status) => {
    return status === "Dead" ? "red" : "green";
  };

  const renderCharacterCards = () => {
    return characters.map((character) => (
      <div key={character.id} className="col-md-2 col-sm-4 col-6 mb-4">
        <Link
          to={`/characters/${character.id}`}
          className="text-decoration-none"
        >
          <div className="card">
            <img
              src={character.image}
              className="card-img-top"
              alt={character.name}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text">
                Status:{" "}
                <span style={{ color: getStatusColor(character.status) }}>
                  &#9679;
                </span>
              </p>
              <p className="card-text">Species: {character.species}</p>
              <p className="card-text">Origin: {character.origin.name}</p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="character-list mt-5">
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center">
            <button
              className="btn btn-primary mr-2"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={characters.length < charactersPerPage}
            >
              Next
            </button>
          </div>
        </div>
        <div className="row justify-content-center pt-2">
          {renderCharacterCards()}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
