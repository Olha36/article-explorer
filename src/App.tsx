import "./App.css";
import Card from "./components/Card";
import { Routes, Route } from "react-router-dom";
import AdditionalInfo from "./components/AdditionalInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/additional-info/:id" element={<AdditionalInfo />} />
      </Routes>
    </>
  );
}

export default App;
