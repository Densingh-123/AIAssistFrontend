import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div>Government of India | Ministry of AYUSH</div>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};

export default Navbar;
