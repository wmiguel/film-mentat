import React, { useState } from "react";
import "./css/App.css";
import "./css/film-mentat.css";
import "./css/themes/nebula.css";

import { AuthContextProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";

import NavigationBar from "./components/search/NavigationBar";
import FilmCalendarList from "./components/calendar/FilmCalendarList";
import Protected from "./components/navbar/Protected";
import Home from "./pages/Home";
import Account from "./pages/Account";
// import LocalCalendarSearch from "./pages/LocalCalendarSearch";

function App() {
  const [pauseScroll, setPauseScroll] = useState(false);
  return (
    <>
      <AuthContextProvider>
        {/* Displayed in every page */}
        <NavigationBar
          setPauseScroll={setPauseScroll}
          pauseScroll={pauseScroll}
        />

        {/* Each route path leads to this page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/calendar"
            element={
              <Protected>
                <FilmCalendarList pauseScroll={pauseScroll} />
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
          {/* <Route
            path="/local"
            element={
              <Protected>
                <LocalCalendarSearch />
              </Protected>
            }
          /> */}
        </Routes>
      </AuthContextProvider>
    </>
  );
}
export default App;