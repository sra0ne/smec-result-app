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
    <div className="min-h-screen">

      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">
            SMEC <span className="text-accent">Results</span>
          </h1>

        </div>

        <Input
          rollNo={rollNo}
          setRollNo={setRollNo}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          getResult={getResult}
        />

        {error && (
          <p className="text-destructive text-sm mt-4">
            {error}
          </p>
        )}
      </section>


      {data && (
        <section className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
          <Details
            student={data.student}
            course={data.course}
            program={data.program}
            cgpa={data.cgpa}
          />

          {resultType === "general" && data.results && (
            <General results={data.results} />
          )}

          {data.subjects && (
            <>
              {resultType === "HONORS" && <Honors subjects={data.subjects} />}
              {resultType === "MINORS" && <Minors subjects={data.subjects} />}
            </>
          )}
        </section>
      )}

    </div>
  );
}

export default App;
