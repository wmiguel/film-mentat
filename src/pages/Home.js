import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import GoogleButton from "react-google-button";


function App() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/calendar");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <section id="home" className={"film_mentat-home"}>
      <div className="content-wrap">
        <div className="home-wrap">
          <div className="home-signin-text">
            <h1>Welcome to Film Mentat</h1>
            <br />
            <h2>Sign In to Access Your Calendar</h2>
          </div>
          <div className="google-signin-button">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
