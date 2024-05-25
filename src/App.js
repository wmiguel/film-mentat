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

const App = () => {
  const [todoEditing, setTodoEditing] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filmPicked, setFilmPicked] = useState([]);
  const [eventPicked, setEventPicked] = useState([]);

  const openFilmDetails = (filmPicked) => {
    setFilmPicked(filmPicked);
    setTodoEditing(filmPicked);
    setOpenModal(!openModal);
  };
  const openEventDetails = (eventPicked) => {
    // console.log(eventPicked);
    setEventPicked(eventPicked);
    // setTodoEditing(eventPicked);
    setOpenModal(!openModal);
  };
  // console.log(eventPicked);
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
              <Letterboxd />
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
          openFilmDetails={openFilmDetails}
          openEventDetails={openEventDetails}
        />
      </Protected>

      <Footer />
    </AuthContextProvider>
  );
}
export default App;
