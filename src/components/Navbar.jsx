import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles
import "./Navbar.css";

// assets
import temple from "../assets/temple.svg";

// pages
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

export default function Navbar() {
  const { isPending, error, logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={temple} alt="manage site logo" />
        </li>

        {!user && (
          <>
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
          </>
        )}
        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" onClick={logout}>
                Logging out ...
              </button>
            )}
            {error && <div>{error}</div>}
          </li>
        )}
      </ul>
    </div>
  );
}
