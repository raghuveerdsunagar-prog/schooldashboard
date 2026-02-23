import React from "react";
import "./Summary.css";

function Summary({ summary }) {
  return (
    <div className="card">
      <h3>{summary.teacher_name}</h3>
      <p>Lessons: {summary.total_lessons}</p>
      <p>Quizzes: {summary.total_quizzes}</p>
      <p>Assessments: {summary.total_assessments}</p>
      <p>Total Activities: {summary.total_activities}</p>
    </div>
  );
}

export default Summary;