import React from "react";
import "./SCSS/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideNav from "./components/sidenav";

function App() {
  return (
    <div className="App">
      <SideNav />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>INDEX</h1>} />
          <Route path="/stats" element={<h1>STATS</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
