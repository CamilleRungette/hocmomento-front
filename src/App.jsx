import Company from "./Pages/Company";
import Home from "./Pages/Home";
import Show from "./Pages/Show";
import Action from "./Pages/Action";
import Agenda from "./Pages/Agenda";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./sass/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compagnie" element={<Company />} />
        <Route path="/spectacle/:id" element={<Show />} />
        <Route path="/action-culturelle/:id" element={<Action />} />
        <Route path="/agenda" element={<Agenda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
