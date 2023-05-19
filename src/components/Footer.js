// TODO:
//
// 1- CHANGE THE LINK TO POINT TO MY PORTFOLIO'S PAGE ONCE I GET A HOST FOR ALL MY PROJECTS

import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer>
      <nav>
        <Link aria-label="On Click" to="https://osharpesportfolio.vercel.app" className="nav-item button">O. Sharpe's Portfolio</Link>
        </nav>
    </footer>
  );
};
