import React from 'react';

export default function Details({ student, course, program, cgpa }) {
  if (!student) return null;

  return (
    <div>
      <h2>Student Details</h2>

      <img src={student.photo} alt="student" width="120" />

      <p>
        <b>Name:</b> {student.fullName}
      </p>
      <p>
        <b>Roll No:</b> {student.rollNo}
      </p>
      <p>
        <b>Course:</b> {course.displayName}
      </p>
      <p>
        <b>Branch:</b> {program.branchName}
      </p>
      {cgpa && (
        <p>
          <b>CGPA:</b> {cgpa}
        </p>
      )}
    </div>
  );
}
