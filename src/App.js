import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/navbar/Protected";
import Navigation from "./components/navbar/Navigation";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import Local from "./pages/Local";
// import NowPlaying from "./pages/NowPlaying";
import FilmModal from "./components/calendar/FilmModal";
import Letterboxd from "./pages/Letterboxd";
import Footer from "./components/footer/Footer";

function App() {
  const [pauseScroll, setPauseScroll] = useState(false);
  const [todoEditing, setTodoEditing] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filmPicked, setFilmPicked] = useState([]);
  const [eventPicked, setEventPicked] = useState([]);

  const openFilmDetails = (filmPicked) => {
    setFilmPicked(filmPicked);
    setPauseScroll(!pauseScroll);
    setTodoEditing(filmPicked);
    setOpenModal(!openModal);
  };
  const openEventDetails = (eventPicked) => {
    console.log(eventPicked);
    setEventPicked(eventPicked);
    setPauseScroll(!pauseScroll);
    // setTodoEditing(eventPicked);
    setOpenModal(!openModal);
  };
  return (
    <AuthContextProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/calendar"
          element={
            <Protected>
              <Calendar
                pauseScroll={pauseScroll}
                openFilmDetails={openFilmDetails}
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
              <Local
                pauseScroll={pauseScroll}
                openEventDetails={openEventDetails}
              />
              {/* <NowPlaying /> */}
            </Protected>
          }
        />
        <Route
          path="/letterboxd"
          element={
            <Protected>
              <Letterboxd pauseScroll={pauseScroll} />
            </Protected>
          }
        />
      </Routes>
      <Protected>
        <FilmModal
          film={filmPicked}
          event={eventPicked}
          todoEditing={todoEditing}
          setTodoEditing={setTodoEditing}
          openModal={openModal}
          setOpenModal={setOpenModal}
          pauseScroll={pauseScroll}
          setPauseScroll={setPauseScroll}
          openFilmDetails={openFilmDetails}
          openEventDetails={openEventDetails}
        />
      </Protected>

      <Footer setPauseScroll={setPauseScroll} pauseScroll={pauseScroll} />
    </AuthContextProvider>
  );
}
export default App;
