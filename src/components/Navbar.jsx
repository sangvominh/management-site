import { Link } from "react-router-dom";

// styles
import "./Navbar.css";

// assets
import temple from "../assets/temple.svg";

// pages
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={temple} alt="manage site logo" />
        </li>

        <li>
          <Link to="/login" element={<Login />}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" element={<Signup />}>
            Signup
          </Link>
        </li>
        <li>
          <button className="btn">Log out</button>
        </li>
      </ul>
    </div>
  );
}
