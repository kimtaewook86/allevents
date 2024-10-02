import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PriceUnder300k from "./components/PriceUnder300k";
import PriceUnder1000k from "./components/PriceUnder1000k";
import PriceAbove1000k from "./components/PriceAbove1000k";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/price-under-300k" element={<PriceUnder300k />} />
        <Route path="/price-under-1000k" element={<PriceUnder1000k />} />
        <Route path="/price-above-1000k" element={<PriceAbove1000k />} />
      </Routes>
    </Router>
  );
}

export default App;
