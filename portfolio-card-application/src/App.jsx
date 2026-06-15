import './App.css';
import PortfolioCard from './components/PortfolioCard/PortfolioCard';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useState } from 'react';

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <ThemeToggle theme={dark ? "dark" : "light"} toggleTheme={() => setDark(!dark)} />
      <PortfolioCard dark={dark} />
    </div>
  );
}

export default App;
