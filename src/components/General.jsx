import React from 'react';

export default function General({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <>
      {results.map((semester) => (
        <div key={semester.semNo}>
          <h3>Semester {semester.semNo}</h3>
          <p>SGPA: {semester.sgpa}</p>

          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Grade Points</th>
              </tr>
            </thead>

            <tbody>
              {semester.subjectsResults?.map((sub, idx) => (
                <tr key={idx}>
                  <td>{sub.subject.name}</td>
                  <td>{sub.subject.subjectCode}</td>
                  <td>{sub.subject.credits}</td>
                  <td>{sub.consideredGrade.grade}</td>
                  <td>{sub.consideredGrade.gradePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
