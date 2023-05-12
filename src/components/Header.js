import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <nav>
        <Link aria-label="On Click" to="/" className="nav-item"><h1 className="nav-item">Letter To Success!</h1></Link>
        <Link aria-label="On Click" to="/settings" className="nav-item button">Set Up!</Link>
        </nav>
    </header>
  );
};
