import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatsGrid from "./StatsGrid";
import Dashboard from "./dashboard";
import Adminlogin from "./Admin";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Stats" element={<StatsGrid />} />
          <Route path="/adminlog" element={<Adminlogin/>}/>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
