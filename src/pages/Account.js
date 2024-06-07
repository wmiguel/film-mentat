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
    <>
      <header className="film-calendar-header">
        <div className="header-wrap" style={{ padding: "0" }}>
          <h1>Settings</h1>
        </div>
      </header>
      <section
        id="film-calendar-list"
        className="film-calendar-list flex "
        style={{ backgroundColor: "var(--light-blue)" }}
      >
        <div style={{ flex: "1", margin: "24px 0 0" }}>
          <figure style={{ backgroundColor: "var(--tiber)", aspectRatio: "1/1.25" }}></figure>
        </div>
        <div className="filmModal-details">
          <div className="overview">
            <p>
              This app relies on free cultural events data from{" "}
              <a
                href="https://zeitgeists.org/"
                rel="noreferrer"
                target="_blank"
              >
                zeitgeists.org
              </a>
            </p>
          </div>
        </div>
        <div className="search-save-button" style={{ margin: "12px 0 48px" }}>
          <button className="save" onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </section>
    </>
  );
}

export default Account;