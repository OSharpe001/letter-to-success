import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <footer>
      <nav>
        <Link aria-label="On Click" target="_blank" to="https://osharpesportfolio.netlify.app" className="nav-item button">O. Sharpe's Portfolio</Link>
      </nav>
    </footer>
  );
};
