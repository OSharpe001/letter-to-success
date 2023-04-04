import { Link } from "react-router-dom";
// import React from 'react';

export default function Header() {
  return (
    <header>
        <h1>The Letter To Success!</h1>
        <nav>
          <Link aria-label="On Click" to="/settings" className="nav-item">PLAY!</Link>
        </nav>
    </header>
  )
}
