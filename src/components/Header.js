import { Link } from "react-router-dom";
// import React from 'react';

export default function Header() {
  return (
    <header>
        <Link aria-label="On Click" to="/" className="nav-item"><h1 className="nav-item">Letter To Success!</h1></Link>
        <nav>
          <Link aria-label="On Click" to="/settings" className="nav-item button">PLAY!</Link>
        </nav>
    </header>
  )
}
