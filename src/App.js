import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/navbar/Protected";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import Local from "./pages/Local";
import NowPlaying from "./pages/NowPlaying";
import FilmModal from "./components/calendar/FilmModal";
import Letterboxd from "./pages/Letterboxd";
import Footer from "./components/footer/Footer";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filmPicked, setFilmPicked] = useState([]);
  const [eventPicked, setEventPicked] = useState([]);
  const [searchPicked, setSearchPicked] = useState(null);
  const [screenPicked, setScreenPicked] = useState([]);
  const [filterSeries, setFilterSeries] = useState([]);

  const openScreenDetails = (screenPicked) => {
    setScreenPicked(screenPicked);
    setOpenModal(!openModal);
  };

  const openSearchDetails = (filmPicked) => {
    setSearchPicked(filmPicked);
    setOpenModal(!openModal);
  };
  const openFilmDetails = (filmPicked) => {
    setFilmPicked(filmPicked);
    setOpenModal(!openModal);
  };
  const openEventDetails = (eventPicked) => {
    setEventPicked(eventPicked);
    setOpenModal(!openModal);
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
                filterSeries={filterSeries}
                setFilterSeries={setFilterSeries}
                openFilmDetails={openFilmDetails}
                openScreenDetails={openScreenDetails}
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
          path="/local"
          element={
            <Protected>
              <Local openEventDetails={openEventDetails} />
              {/* <NowPlaying /> */}
            </Protected>
          }
        />
        <Route
          path="/now-playing"
          element={
            <Protected>
              <NowPlaying />
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
        <FilmModal
          film={filmPicked}
          event={eventPicked}
          search={searchPicked}
          screen={screenPicked}
          openModal={openModal}
          filterSeries={filterSeries}
          setOpenModal={setOpenModal}
          openFilmDetails={openFilmDetails}
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
