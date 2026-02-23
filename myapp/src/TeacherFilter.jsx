// import React from "react";


// const TeacherFilter = ({ teachers, selectedTeacher, onTeacherChange }) => (
//   <div className="filter-section">
//     <label>Filter by Teacher:</label>
//     <select 
//       value={selectedTeacher} 
//       onChange={(e) => onTeacherChange(e.target.value)}
//       className="teacher-select"
//     >
//       <option value="">📊 All Teachers</option>
//       {teachers.map(t => (
//         <option key={t.teacher_id} value={t.teacher_id}>
//           {t.teacher_name}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// export default TeacherFilter;

import React from "react";

function TeacherFilter({ teachers, selectedTeacher, onTeacherChange }) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Filter by Teacher</h5>
                <select
                    className="form-select form-select-lg"
                    value={selectedTeacher}
                    onChange={(e) => onTeacherChange(e.target.value)}
                >
                    <option value="">📊 Select Teacher</option>
                    {teachers.map((teacher, index) => (
                        <option key={index} value={teacher.teacher_id}>
                            {teacher.teacher_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default TeacherFilter
