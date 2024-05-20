import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(
        `https://assignment-backend-gucj.onrender.com/api/characters/${id}`
      );
      setCharacter(response.data);
    };

    fetchCharacter();
  }, [id]);

  const navigateToCharacter = (direction) => {
    const newId =
      direction === "next" ? parseInt(id, 10) + 1 : parseInt(id, 10) - 1;
    navigate(`/characters/${newId}`);
  };

  const toggleShowAllEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
  };

  const toggleShowLessEpisodes = () => {
    setShowAllEpisodes(false);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  const isFirstCharacter = parseInt(id, 10) === 1;
  const isLastCharacter = parseInt(id, 10) === 671; // Assuming the last character ID is 671

  const episodeList = showAllEpisodes
    ? character.episode
    : character.episode.slice(0, 10);

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={() => navigateToCharacter("previous")}
            disabled={isFirstCharacter}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>
        </div>
        <div className="col-md-6">
          <div>
            <img
              src={character.image}
              alt={character.name}
              className="img-fluid"
            />
            <h1>{character.name}</h1>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Location: {character.location.name}</p>
          </div>
          <div className="episode-list mt-4">
            <h2>Episodes</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {episodeList.map((episode, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{episode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!showAllEpisodes && (
              <button
                className="btn btn-primary"
                onClick={toggleShowAllEpisodes}
              >
                Show All Episodes
              </button>
            )}
            {showAllEpisodes && (
              <button
                className="btn btn-primary"
                onClick={toggleShowLessEpisodes}
              >
                Show Less Episodes
              </button>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-primary float-right"
            onClick={() => navigateToCharacter("next")}
            disabled={isLastCharacter}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
