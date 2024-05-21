import React from "react";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const { logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="home" className="film_mentat-home flex">
      <div className="content-wrap">
        <div className="home-wrap grid">
          <div className="home-signin-text">
            <h1>Account</h1>
            <br />
            <h2>Sign In to Access Your Calendar</h2>
          </div>
          <div
            className="google-signin-button"
          >
            <button
              style={{ backgroundColor: "var(--fountain-blue)", color: "white", border: "none", borderRadius: "4px", lineHeight: "12px", padding: "9px 12px 8px", cursor: "pointer" }}
              onClick={handleSignOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;