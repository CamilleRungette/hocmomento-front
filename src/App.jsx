import "./App.css";
import Company from "./Pages/Company";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compagnie" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
