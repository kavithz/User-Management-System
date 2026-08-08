import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Navbar userName={user?.name} />

      <div className="wide-container">
        <h1>Welcome{user ? `, ${user.name}` : ""}! 👋</h1>
        <p>You have successfully logged in to the User Management System.</p>

        {user && (
          <div className="container" style={{ margin: "20px 0 0 0", maxWidth: "100%" }}>
            <h2>Your Information</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
