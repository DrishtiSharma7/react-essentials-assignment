import React, { useState } from "react";
import { Star, Heart, Sun, Moon, Search, X } from "lucide-react";
import "./MovieExplorer.css";

// Movie data
const MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    tags: ["Dreams", "Reality", "Future"],
    color: "#ff9900",
    rating: 8.8,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    director: "Christopher Nolan",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    tags: ["Batman", "Gotham", "Crime"],
    color: "#e74c3c",
    rating: 9.0,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    director: "Christopher Nolan",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    tags: ["Space", "Time", "Survival"],
    color: "#3498db",
    rating: 8.6,
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    director: "Christopher Nolan",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    genre: "Action",
    tags: ["Action", "Thriller", "Crime"],
    color: "#3dd44a",
    rating: 8.7,
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    director: "Lana Wachowski",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    tags: ["Crime", "Suspense", "Survival"],
    color: "#4171f6",
    rating: 8.9,
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    director: "Quentin Tarantino",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    tags: ["Prison", "Hope", "Friendship"],
    color: "#eb3d86",
    rating: 9.3,
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    director: "Frank Darabont",
  },
  {
    id: 7,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    tags: ["Crime", "Family", "Legacy"],
    color: "#3bd2e2",
    rating: 9.2,
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    director: "Francis Ford Coppola",
  },
  {
    id: 8,
    title: "The Godfather: Part II",
    year: 1974,
    genre: "Crime",
    tags: ["Crime", "Sequel", "Legacy"],
    color: "#d8ca35",
    rating: 9.0,
    cast: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
    director: "Francis Ford Coppola",
  },
  {
    id: 9,
    title: "The Dark Knight Rises",
    year: 2012,
    genre: "Action",
    tags: ["Action", "Crime", "Thriller"],
    color: "#8d5d5d",
    rating: 8.4,
    cast: ["Christian Bale", "Tom Hardy", "Anne Hathaway"],
    director: "Christopher Nolan",
  },
  {
    id: 10,
    title: "Schindler's List",
    year: 1994,
    genre: "Drama",
    tags: ["War", "Survival", "Family"],
    color: "#4566cc",
    rating: 8.9,
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    director: "Steven Spielberg",
  },
  {
    id: 11,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    genre: "Fantasy",
    tags: ["Fantasy", "Adventure", "Story"],
    color: "#d8ca35",
    rating: 8.8,
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    director: "Peter Jackson",
  },
  {
    id: 12,
    title: "3 Idiots",
    year: 2009,
    genre: "Drama",
    tags: ["College Drama", "Friendship", "Engineering"],
    color: "#4566cc",
    rating: 8.9,
    cast: ["Aamir Khan", "Madhavan", "Mona Singh"],
    director: "Rajkumar Hirani",
  },
];

function MovieExplorer() {
  //dark mode
  const [darkMode, setDarkMode] = useState(false);
  //search state
  const [searchTerm, setSearchTerm] = useState("");
  //genre state
  const [selectedGenre, setSelectedGenre] = useState("All");
  //favorite state
  const [favorites, setFavorites] = useState([]);
  //genre options
  const genres = [
    "All",
    "Action",
    "Sci-Fi",
    "Drama",
    "Crime",
    "Fantasy",
    "Adventure",
    "Thriller",
    "Comedy",
    "Romance",
    "Family",
    "Animation",
    "Mystery",
  ];

  //filtered movies
  const filteredMovies = MOVIES.filter((movie) => {
    // matches search
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // matches genre
    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;
    // return true if both match
    return matchesSearch && matchesGenre;
  });

  //toggle favorite
  function toggleFavorite(id) {
    // if movie is already favorited remove it
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((movieId) => movieId !== id));
    }
    // if movie is not favorited add it
    else {
      setFavorites([...favorites, id]);
    }
  }

  //favorite movies
  const favoriteMovies = MOVIES.filter((movie) => favorites.includes(movie.id));

  // render
  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? (
          <><Sun size={16} /> <span>Light</span></>
        ) : (
          <><Moon size={16} /> <span>Dark</span></>
        )}
      </button>
      <div className="box">
        <div className={` header ${darkMode ? "dark" : "light"}`}>
          <div className="header-top">
            <h1 className={`header-title ${darkMode ? "dark" : "light"}`}>
              Movie Explorer
            </h1>
            <span className={`header-badge ${darkMode ? "dark" : "light"}`}>
              React Project
            </span>
          </div>
          <p className="header-subtitle"> Search for your movies</p>
        </div>
        <div className="main-content">
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" color="#777" />
              {/* Inputs */}
              <input
                className="search-input"
                type="text"
                placeholder="Search movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <span className="clear-btn" onClick={() => setSearchTerm("")}>
                  <X size={16} />{" "}
                </span>
              )}
            </div>

            {/* Genre Filter */}
            <select
              className={`genre-select ${darkMode ? "dark" : "light"}`}
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>

            <button
              className="reset-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("All");
                setFavorites([]);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        <div className="columns">
          {/* Left Side */}
          <div className="left-column">
            <div className="section-header">
              <h2 className={`section-title ${darkMode ? "dark" : "light"}`}>
                Matching Movies
              </h2>
              <p className="result-count">{filteredMovies.length} results</p>
            </div>
            {filteredMovies.length === 0 ? (
              <p className="empty-state">No movies found.</p>
            ) : (
              filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className={`movie-card ${darkMode ? "dark" : "light"}`}
                >
                  {/* Rating Badge */}
                  <div
                    className="movie-avatar"
                    style={{ backgroundColor: movie.color }}
                  >
                    <Star size={20} />
                  </div>

                  <div className="movie-card-left">
                    <div className="movie-details">
                      {/* First Line */}
                      <div className="movie-top">
                        <h3
                          className={`movie-title ${darkMode ? "dark" : "light"}`}
                        >
                          {movie.title}
                        </h3>

                        <span className="movie-meta">
                          {movie.year} • {movie.genre}
                        </span>
                      </div>

                      {/* Second Line */}
                      <div className="movie-bottom">
                        <span className="movie-rating">
                          <Star size={12} color="orange" fill="orange"/> {movie.rating}
                        </span>

                        <div className="movie-tags">
                          {movie.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`fav-button ${
                      favorites.includes(movie.id) ? "active" : "inactive"
                    }`}
                    onClick={() => toggleFavorite(movie.id)}
                  >
                    {favorites.includes(movie.id) ? (
                      <>
                        <Heart
                          size={16}
                          fill="#e74c3c"
                          color="#fff"
                          strokeWidth={2}
                        />
                        <span>Favorited</span>
                      </>
                    ) : (
                      <>
                        <Heart size={16} color="#c7c7c7" strokeWidth={2} />
                        <span>Favorite</span>
                      </>
                    )}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Right Side */}
          <div className={`right-column ${darkMode ? "dark" : "light"}`}>
            <div className="section-header">
              <h2 className={`section-title ${darkMode ? "dark" : "light"}`}>
                Favourite Movies
              </h2>
            </div>
            <div className="fav-list">
              {favoriteMovies.length === 0 ? (
                <p className="empty-state">No favourite movies yet.</p>
              ) : (
                favoriteMovies.map((movie) => (
                  <div key={movie.id} className={`favorite-chip ${darkMode ? "dark" : "light"}`} >
                    <Heart size={14} fill="#e74c3c" color="#e74c3c" />
                    <span>{movie.title}</span>
                    <button className={`remove-fav ${darkMode ? "dark" : "light"}`} onClick={() => toggleFavorite(movie.id)} >
                      <X size={14} color="#e74c3c" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieExplorer;
