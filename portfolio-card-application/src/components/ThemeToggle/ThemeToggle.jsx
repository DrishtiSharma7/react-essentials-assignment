import "./ThemeToggle.css";
import { Sun, Moon } from "lucide-react";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div className="theme-toggle-container">
      <button className={`theme-toggle-button ${theme === "dark" ? "dark" : "light"}`} 
      onClick={toggleTheme}>
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        <span>{theme === "dark" ? " Dark Mode" : " Light Mode"}</span>
      </button>
    </div>
  );
}

export default ThemeToggle;