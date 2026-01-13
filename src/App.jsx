import { useState } from "react";
import "./App.css";
import axios from "axios";
import Input from "./components/Input";
import Details from "./components/Details";
import General from "./components/General";
import Honors from "./components/Honors";
import Minors from "./components/Minors";

function App() {
  const [rollNo, setRollNo] = useState("");
  const [selectedType, setSelectedType] = useState("general");
  const [resultType, setResultType] = useState("");
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
      setResultType(selectedType);
      setError("");
    } catch (err) {
      setError("Failed to fetch result");
      console.log(err);
      setData(null);
      setResultType("");
    }
  };

  return (
    <>
      <Input
        rollNo={rollNo}
        setRollNo={setRollNo}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        getResult={getResult}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <Details
          student={data.student}
          course={data.course}
          program={data.program}
          cgpa={data.cgpa}
        />
      )}

      {data && resultType === "general" && data.results && (
        <General results={data.results} />
      )}

      {data && data.subjects && (
        <>
          {resultType === "HONORS" && <Honors subjects={data.subjects} />}
          {resultType === "MINORS" && <Minors subjects={data.subjects} />}
        </>
      )}
    </>
  );
}

export default App;
