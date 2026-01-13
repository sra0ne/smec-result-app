import React from 'react';

export default function Input({ rollNo, setRollNo, selectedType, setSelectedType, getResult }) {
  return (
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
  );
}