import "./ThemeToggle.css";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle-container">
      <button className={`theme-toggle-button ${theme === "dark" ? "dark" : "light"}`} 
      onClick={toggleTheme}>
        {theme === "dark" ? "🌖 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}

export default ThemeToggle;