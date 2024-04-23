import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        zIndex: "100",
        height: "30px",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: "#070914",
        color: "white",
        left: "0",
        right: "0"
      }}
    >
      <h1>Film Mentat</h1>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Log Out</button>
      ) : (
        <Link style={{ color: "white" }} to="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
}

export default NavBar;