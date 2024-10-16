import React from "react";
import { UserAuth } from "../context/AuthContext";
import SignOutButton from "../components/buttons/SignOutButton";
import Navigation from "../components/navbar/Navigation";

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
      <Navigation title="Settings" />
      <section className="account flex">
        <div className="modal-details flex">
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

        <div className="signout">
          <div className="g-signout flex">
            <SignOutButton handleSignOut={handleSignOut} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;