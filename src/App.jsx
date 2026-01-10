import "./App.css";

function App() {
  return (
    <>
      <div>
        <label>Enter Roll No:</label>
        <input type="text"></input>
      </div>
      <div>
        <label>Select type:</label>
        <label>
          <input type="radio" name="type" value="option1" defaultChecked />
          General
        </label>
        <label>
          <input type="radio" name="type" value="option2" />
          Honors
        </label>
        <label>
          <input type="radio" name="type" value="option3" />
          Minors
        </label>
      </div>
      <div>
        <button>Get Result</button>
      </div>
    </>
  );
}

export default App;
