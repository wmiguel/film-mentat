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
    <section
      id="home"
      className="film_mentat-home flex"
      style={{
        height: "calc(100vh - 138px)",
        padding: "48px 24px",
        boxSizing: "border-box",
      }}
    >
      <div className="content-wrap" style={{ height: "100%" }}>
        <div
          className="home-wrap flex"
          style={{ flexDirection: "column", height: "100%" }}
        >
          <div className="account-options" style={{ flex: "1 1 auto" }}>
            <div className="home-signin-text">
              <h1>
                <strong>Account</strong>
              </h1>
            </div>
            <div className="google-signin-button" style={{ display: "grid" }}>
              <button
                style={{
                  backgroundColor: "var(--fountain-blue)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  lineHeight: "12px",
                  padding: "9px 12px 8px",
                  cursor: "pointer",
                }}
                onClick={handleSignOut}
              >
                Log Out
              </button>
            </div>
          </div>
          <div className="credits">
            This app relies on free cultural events data from{" "}
            <a href="https://zeitgeists.org/" rel="noreferrer" target="_blank">
              zeitgeists.org
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;