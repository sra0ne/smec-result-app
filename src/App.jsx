import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [rollNo, setRollNo] = useState("");
  const [selectedType, setSelectedType] = useState("general");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const headers = {
    "x-api-version": "2",
    "x-institution-code": "smec",
    "x-tenant-id": "smec",
  };

  const url =
    selectedType === "general"
      ? "https://api.campx.in/exams/student-results/external?examType=general"
      : "https://api.campx.in/exams/student-results/honors-minors?examType=honorsMinors";

  const params =
    selectedType === "general" ? { rollNo } : { rollNo, type: selectedType };

  const getResult = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(url, {
        params: params,
        headers: headers,
      });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch result");
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <form onSubmit={getResult}>
        <div>
          <label>Roll No:</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type:</label>

          <label>
            <input
              type="radio"
              name="type"
              value="general"
              checked={selectedType === "general"}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            General
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="HONORS"
              checked={selectedType === "HONORS"}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            Honors
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="MINORS"
              checked={selectedType === "MINORS"}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            Minors
          </label>
        </div>
        <button type="submit">Get Result</button>
      </form>

      {data && (
        <div>
          <h2>Student Details</h2>

          <img src={data.student.photo} alt="student" width="120" />

          <p>
            <b>Name:</b> {data.student.fullName}
          </p>
          <p>
            <b>Roll No:</b> {data.student.rollNo}
          </p>
          <p>
            <b>Course:</b> {data.course.displayName}
          </p>
          <p>
            <b>Branch:</b> {data.program.branchName}
          </p>
          {data?.cgpa && (
            <p>
              <b>CGPA:</b> {data.cgpa}
            </p>
          )}
        </div>
      )}
      {data?.results?.map((semester) => (
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

      {data?.subjects && (
        <>
          <h2>{data.type} Subjects</h2>

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
              {data.subjects.map((s, i) => (
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
      )}
    </>
  );
}

export default App;
