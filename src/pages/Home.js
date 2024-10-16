import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import GoogleButton from "react-google-button";

const Home = () => {
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
  }, [navigate, user]);

  return (
    <section id="home" className="sc-home flex">
      <div className="wrap">
        <div className="grid">
          <div className="cover flex">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="signin-text">
            <h1>Welcome to ScreenTrack</h1>
            <br />
            <h4>Sign In to Access Your Calendar</h4>
          </div>
          <div className="g-signin">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;