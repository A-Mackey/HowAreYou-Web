import React from "react";
import "./SCSS/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideNav from "./components/sidenav";
import Home from "./pages/home";
import Profile from "./pages/profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
