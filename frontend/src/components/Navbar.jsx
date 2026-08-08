import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ userName }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </div>
      <div>
        {userName && <span style={{ marginRight: 16 }}>Hi, {userName}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
