// import React from "react";
// import "./Summary.css";

// function Summary({ summary }) {   // ✅ accept summary as prop
//   return (

//     <div className="cards-container">
//       <div className="card">
//         <h3>Lessons Created</h3>
//         <p>{summary.lessons}</p>
//       </div>
//       <div className="card">
//         <h3>Quizzes Conducted</h3>
//         <p>{summary.quizzes}</p>
//       </div>
//       <div className="card">
//         <h3>Assessments Made</h3>
//         <p>{summary.assessments}</p>
//       </div>
//     </div>
//   );
// }

// export default Summary;

import React from "react";
import  "./Statsgrid.css";


function StatsGrid({ summary }) {
  return (
    <>
      {summary.slice(0, 6).map((teacher, index) => (
        <div className="card-container" key={index}>
          <div className="Card">
            <div className="card-body">
              <h4 className="card-title">{teacher.teacher_name}</h4>

              <div className="stats-row">
                <div className="stat-box lessons">
                  <h6>📖 Lesson Plans</h6>
                  <h3>{teacher.total_lessons || 0}</h3>
                </div>
                <div className="stat-box quizzes">
                  <h6>📝 Quizzes</h6>
                  <h3>{teacher.total_quizzes || 0}</h3>
                </div>
                <div className="stat-box assessments">
                  <h6>📄 Question Papers</h6>
                  <h3>{teacher.total_assessments || 0}</h3>
                </div>
              </div>

              <hr />
              <h2 className="total">Total: {teacher.total_activities || 0}</h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default StatsGrid;
