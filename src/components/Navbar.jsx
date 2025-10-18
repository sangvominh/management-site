import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

// styles
import "./Navbar.css";

// assets
import temple from "../assets/temple.svg";

// pages
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

export default function Navbar() {
  const {isPending, error, logout} = useLogout();

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
          {!isPending && (
            <button className="btn" onClick={logout}>
              Log out
            </button>
          )}
          {isPending && (
            <button className="btn" onClick={logout}>
              Logging out ...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
