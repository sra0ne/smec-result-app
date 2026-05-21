import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";
import Input from "./components/Input";
import Details from "./components/Details";
import General from "./components/General";
import Honors from "./components/Honors";
import Minors from "./components/Minors";
import Footer from "./components/Footer";

function App() {
  const [rollNo, setRollNo] = useState("");
  const [selectedType, setSelectedType] = useState("general");
  const [resultType, setResultType] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const baseUrl =
    selectedType === "general"
      ? `${API_URL}/api/external`
      : `${API_URL}/api/honors-minors`;

  const params =
    selectedType === "general"
      ? { examType: "general", rollNo }
      : { examType: "honorsMinors", rollNo, type: selectedType };
  const getResult = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(baseUrl, {
        params,
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div>
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

            {error && <p className="text-destructive text-sm mt-4">{error}</p>}
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
                  {resultType === "HONORS" && (
                    <Honors subjects={data.subjects} />
                  )}
                  {resultType === "MINORS" && (
                    <Minors subjects={data.subjects} />
                  )}
                </>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
