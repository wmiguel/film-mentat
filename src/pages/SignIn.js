import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/calendar");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <section
        id="sign-in"
        className="film-calendar-list flex film-calendar-home"
      >
        <div className="content-wrap">
          <div className="month-wrap">
            <div className="film-calendar-month flex">
              <h2>SignIn</h2>
            </div>

            <div key="5" className="day-wrap grid">
              <div className="film-calendar-day film-date">
                <div className="film-date-border film-date-border grid">
                  <span></span>
                  <h3>5</h3>
                </div>
              </div>

              <div className="film-calendar-event">
                <div className="film-card">
                  <div className="film-event grid">
                    <div className="film-text grid">
                      <div className="film-info show">
                        <GoogleButton onClick={handleGoogleSignIn} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;