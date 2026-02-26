import React from "react";

function Teacherselector({ teachers, onSelect }) {
  return (
    <div>
      <h3>Select Teacher</h3>
      <select onChange={e => onSelect(e.target.value)}>
        <option value="">-- select teacher --</option>
        {teachers.map((teacher, index) => (
          <option key={index} value={teacher.teacher_id}>
            {teacher.teacher_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Teacherselector;
