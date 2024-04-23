import "./css/App.css";
import "./css/film-mentat.css";
import "./css/themes/nebula.css";
import React from "react";

import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import Protected from "./components/navbar/Protected";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import FilmSearchHeader from "./components/search/FilmSearchHeader";
import FilmCalendarList from "./components/calendar/FilmCalendarList";


function App({pauseScroll}) {
  return (
    <>
      <AuthContextProvider>
        <FilmSearchHeader />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/calendar"
            element={
              <Protected>
                <FilmCalendarList pauseScroll={pauseScroll} />
              </Protected>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
