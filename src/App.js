import React, { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/navbar/Protected";
import Navigation from "./components/navbar/Navigation";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Account from "./pages/Account";
import Local from "./pages/Local";
import Footer from "./components/footer/Footer";

function App() {
  const [pauseScroll, setPauseScroll] = useState(false);
  return (
    <AuthContextProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/calendar"
          element={
            <Protected>
              <Calendar pauseScroll={pauseScroll} />
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
              <Local />
            </Protected>
          }
        />
      </Routes>
      <Footer setPauseScroll={setPauseScroll} pauseScroll={pauseScroll} />
    </AuthContextProvider>
  );
}
export default App;
