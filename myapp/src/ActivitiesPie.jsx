import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ActivitiesPie({ summary }) {
  if (!summary) return null;

  const data = {
    labels: ["Lessons", "Quizzes", "Assessments"],
    datasets: [
      {
        label: "Activities",
        data: [
          summary.total_lessons,
          summary.total_quizzes,
          summary.total_assessments,
        ],
        backgroundColor: ["#8884d8", "#82ca9d", "#ffc658"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h3>{summary.teacher_name} Activities</h3>
      <Pie data={data} />
    </div>
  );
}

export default ActivitiesPie;