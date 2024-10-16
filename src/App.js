import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/navbar/Protected";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import Screenings from "./pages/Screenings";
import Letterboxd from "./pages/Letterboxd";
import Modal from "./components/modal/Modal";
import Footer from "./components/footer/Footer";

const App = () => {
  const [open,    openModal] = useState(false);
  const [eventPicked, setEventPicked] = useState([]);
  const [moviePicked,   setMoviePicked] = useState([]);
  const [screenPicked, setScreenPicked] = useState([]);
  const [searchPicked, setSearchPicked] = useState(null);
  const [seriesList, setSeriesList] = useState([]);
  
  const openScreenDetails = (data) => {
    setScreenPicked(data);
    openModal(!open);
  };
  const openMovieDetails = (data) => {
    setMoviePicked(data);
    openModal(!open);
  };

  const openSearchDetails = (data) => {
    setSearchPicked(data);
    openModal(!open);
  };
  const openEventDetails = (data) => {
    setEventPicked(data);
    openModal(!open);
  };
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/calendar"
          element={
            <Protected>
              <Calendar
                seriesList={seriesList}
                setSeriesList={setSeriesList}
                openMovieDetails={openMovieDetails}
                openScreenDetails={openScreenDetails}
                openEventDetails={openEventDetails}
              />
            </Protected>
          }
        />
        <Route
          path="/account"
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
        <Route
          path="/screenings"
          element={
            <Protected>
              <Screenings openEventDetails={openEventDetails} />
            </Protected>
          }
        />
        <Route
          path="/letterboxd"
          element={
            <Protected>
              <Letterboxd />
            </Protected>
          }
        />
      </Routes>
      <Protected>
        <Modal
          event={eventPicked}
          movie={moviePicked}
          screen={screenPicked}
          search={searchPicked}
          open={open}
          seriesList={seriesList}
          openModal={openModal}
          openMovieDetails={openMovieDetails}
          openEventDetails={openEventDetails}
          openSearchDetails={openSearchDetails}
          openScreenDetails={openScreenDetails}
        />
      </Protected>
      <Footer openSearchDetails={openSearchDetails} />
    </AuthContextProvider>
  );
}
export default App;