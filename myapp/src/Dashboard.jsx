import React, { useState, useEffect } from "react";
import axios from "axios";
import Summary from "./Summary";
import TeacherSelector from "./TeacherSelector";
import WeeklyChart from "./Weeklycharts";
import ActivitiesPie from "./ActivitiesPie";
import DashboardHeader from "./Dashboardheader";
import { useNavigate } from "react-router-dom";
import "./Dash.css"
function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [trends, setTrends] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(""); // track selection
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Token:", localStorage.getItem("token"));
console.log("Role:", localStorage.getItem("role"));


    if (!token || role !== "admin") {
      alert("Access Denied! Admin login required.");
      navigate("/adminlog");
      return;
    }


    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.get("http://localhost:3001/api/summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3001/api/teachers")
      .then(res => setTeachers(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3001/api/weekly-trends")
      .then(res => setTrends(res.data))
      .catch(err => console.error(err));
  }, [navigate]);

 

  // Filter summary by selected teacher
  const filteredSummary = selectedTeacher
    ? summary.filter(t => t.teacher_id === selectedTeacher)
    : [];

  return (
    <div>
      <h2>Teacher Insights Dashboard</h2>


{/* LOGOUT BUTTON - Add here */}
<div className="logout">
  <button className="lgout"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = '/adminlog';
    }}
 
  >
    🚪 Logout
  </button>
</div>




      <DashboardHeader/>
      

      {/* Teacher Selector */}
      <TeacherSelector teachers={teachers} onSelect={setSelectedTeacher} />

      {/* Summary Cards */}
      <div className="cards">
        {filteredSummary.map((teacher, index) => (
          <Summary key={index} summary={teacher} />
        ))}
      </div>

      
   <div className="charts">
    <ActivitiesPie summary={filteredSummary[0]} />

      {/* Weekly Trends Chart */}
      <WeeklyChart trends={trends}  selectedTeacher={selectedTeacher}/>
    </div>    




      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Savra Insights</h4>
            <p>Empowering educators with data-driven insights</p>
          </div>
          <div className="footer-section">
            <h4>Quick Actions</h4>
        
          </div>
          <div className="footer-section">
            <h4>© 2026 Savra Technologies</h4>
            <p>All rights reserved | Version 1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default Dashboard;