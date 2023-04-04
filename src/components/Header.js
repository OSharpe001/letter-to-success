import { Link } from "react-router-dom";
// import React from 'react';

export default function Header() {
  return (
    <>
        <h1>The Letter To Success!</h1>
        <nav>
          <button>
          <Link aria-label="On Click" to="/settings" className="nav-item">Let's Climb the Letter To Success</Link>
          </button>
        
        </nav>
    </>
  )
}
