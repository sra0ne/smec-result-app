import React from 'react';

export default function Minors({ subjects }) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <>
      <h2>Minors Subjects</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Code</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((s, i) => (
            <tr key={i}>
              <td>{s.subject.name}</td>
              <td>{s.subject.subjectCode}</td>
              <td>{s.subject.credits}</td>
              <td>{s.consideredGrade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
