import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Unsafe from "./Unsafe";
import Safe from "./Safe";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Unsafe />} />
        <Route path="/safe" element={<Safe />} />
      </Routes>
    </Router>
  );
}
