import React from "react";
import "./SCSS/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideNav from "./components/sidenav";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<h1>STATS</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
