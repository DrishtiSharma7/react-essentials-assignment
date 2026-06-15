import { useState, useMemo } from 'react';
import './MovieExplorer.css';

// Sample movie data
const MOVIES = [
  { id: 1, title: 'Inception', year: 2010, genre: 'Sci-Fi', tags: ["Dreams", "Reality", "Future"], color: "#ff9900", rating: 8.8 },
  { id: 2, title: 'The Dark Knight', year: 2008, genre: 'Action', tags: ["Batman", "Gotham", "Crime"], color: "#e74c3c", rating: 9.0 },
  { id: 3, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', tags: ["Space", "Time", "Survival"], color: "#3498db", rating: 8.6 },
  { id: 4, title: 'The Matrix', year: 1999, genre: 'Action', tags: ["Action", "Thriller", "Crime"], color: "#3dd44a", rating: 8.7 },
  { id: 5, title: 'Pulp Fiction', year: 1994, genre: 'Crime', tags: ["Crime", "Suspense", "Survival"], color: "#4171f6", rating: 8.9 },
  { id: 6, title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', tags: ["Prison", "Hope", "Friendship"], color: "#eb3d86", rating: 9.3 },
  { id: 7, title: 'The Godfather', year: 1972, genre: 'Crime', tags: ["Crime", "Family", "Legacy"], color: "#3bd2e2", rating: 9.2 },
  { id: 8, title: 'The Godfather: Part II', year: 1974, genre: 'Crime', tags: ["Crime", "Sequel", "Legacy"], color: "#d8ca35", rating: 9.0 },
  { id: 9, title: 'The Dark Knight Rises', year: 2012, genre: 'Action', tags: ["Action", "Crime", "Thriller"], color: "#8d5d5d", rating: 8.4 },
  { id: 10, title: 'Schindler\'s List', year: 1994, genre: 'Drama', tags: ["War", "Survival", "Family"], color: "#4566cc", rating: 8.9 },
  { id: 11, title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, genre: 'Fantasy', tags: ["Fantasy", "Adventure", "Story"], color: "#d8ca35", rating: 8.8 },
  { id: 12, title: '3 Idiots', year: 2009, genre: 'Drama', tags: ["College Drama", "Friendship", "Engineering"], color: "#4566cc", rating: 8.9 },
];

// Helper component to render a tag pill
function TagPill({ label }) {
  return (
    <span className="tag-pill">
      {label}
    </span>
  );
}

// Helper component to render a movie card
function MovieExplorer({ movie, isFav, onToggleFav }) {
    return (
        <div className="movie-card">
            <div className="movie-card-left">
                <div className="movie-avatar" style={{ background: movie.color }}>
                    {movie.title[0]}
                </div>
                <div>
                    <div className="movie-title">
                        {movie.title} {" "} 
                        <span className="movie-meta">({movie.year} . {movie.genre})</span>
                    </div>
                    <div className="movie-tags">
                        {movie.tags.map((t) => (
                        <TagPill key={t} label={t} />))}
                    </div>
                </div> 
            </div> 
            <button className={`fav-button ${isFav ? 'active' : 'inactive'}`} 
                onClick={() => onToggleFav(movie.id)}>
                {isFav ? 'Favorited' : 'Favorite'}
            </button>
        </div>
    );
}

// Main app component
export default function App() {
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState(new Set());

    // Filtered movies
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return MOVIES.filter(
            (m) => 
                m.title.toLowerCase().includes(q) ||
                m.genre.toLowerCase().includes(q) ||
                m.tags.some((t) => t.toLowerCase().includes(q))
        );
    }, [query]);

    const favMovies = MOVIES.filter((m) => favorites.has(m.id));

    // Toggle favorite
    const toggleFav = (id) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const hasInput = query.trim().length > 0;
    const noResults = hasInput && filtered.length === 0;

    return (
        <div className="app">
            <div className="header">
                <div className="header-top">
                    <h1 className="header-title">🎬 Movie Explorer</h1>
                    <span className="header-badge"> Local data . React state ready</span>
                </div>
                <p className="header-subtitle">
                    Search movies and buid your personal favorites list...
                </p>
            </div> 

            <div className="main-content">
                <div className="search-bar">
                    <div className='search-input-wrapper'>
                        <span className ="search-icon"> 🔍</span>
                        <input
                            type="text"
                            className="search-input"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            placeholder="Search by title, genre, or tags..."
                        />                        
                    </div>
                <button className="reset-btn" onClick={() => setQuery('')}>Clear</button>
                </div>

            <div className="hints">
                <span> No input - show hints </span>
                <span> No match - show no results  </span>
            </div>

            <div className='columns'>
                <div>
                    <div className='section-header'>
                        <h2 className='section-title'>Matching Movies</h2>
                        {hasInput && !noResults && (
                            <span className='section-meta'>Filtered from local movie database</span>)}
                    </div>
                    {!hasInput && (
                        <div className="empty-state">
                            <div className="empty-state-icon">🎥</div>
                            Start typing to search for movies
                        </div>      
                    )}
                    {noResults && (
                        <div className="empty-state">
                            <div className="empty-state-icon">😕</div>
                            No matching movies found for &ldquo;{query}&rdquo;
                        </div>      
                    )}
                    {hasInput && !noResults && (
                        <div>
                            <div className="result-count">
                                {filtered.length} results{filtered.length !==1?"s":""}
                            </div>
                            {filtered.map((m) => (
                                <MovieExplorer key={m.id} movie={m} 
                                isFav={favorites.has(m.id)}
                                onToggleFav={toggleFav} />
                            ))}
                        </div>
                    )}
                </div>
                    <div>
                        <div className="section-header">
                            <h2 className="section-title">Favorites</h2>
                            <span className="section-meta">Derived from favorite state</span>
                        </div>
                        {favMovies.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">😕</div>
                                No favorite movies yet
                            </div>
                        ) : (
                            favMovies.map((m) => (
                                <MovieExplorer key={m.id} movie={m} isFav={true} onToggleFav={toggleFav} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}