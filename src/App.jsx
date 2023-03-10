import Company from "./Pages/Company";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Show from "./Pages/Show";
import Action from "./Pages/Action";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compagnie" element={<Company />} />
        <Route path="/spectacle/:id" element={<Show />} />
        <Route path="/action-culturelle/:id" element={<Action />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
