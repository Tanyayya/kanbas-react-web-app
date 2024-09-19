import { Link } from "react-router-dom";
export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Kanbas/">kanbas</Link></li>
        <li>
                <a href="https://chimerical-cupcake-1f6716.netlify.app" id="wd-github" target="_blank" rel="noopener noreferrer">
                   Netlify URL
                </a>
            </li>
      </ul>
    );
  }
  