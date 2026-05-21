import React from "react";

export default function Input({
  rollNo,
  setRollNo,
  selectedType,
  setSelectedType,
  getResult,
}) {
  const types = [
    { value: "general", label: "General" },
    { value: "HONORS", label: "Honors" },
    { value: "MINORS", label: "Minors" },
  ];

  return (
    <form onSubmit={getResult} className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          required
          placeholder="Enter roll number"
          className="bg-input border border-border rounded-[6px] px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent w-full sm:w-72"
        />

        <button
          type="submit"
          className="bg-accent text-accent-fg font-medium text-sm px-6 py-2.5 rounded-[6px] hover:opacity-90 cursor-pointer"
        >
          Get Result
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setSelectedType(t.value)}
            className={`text-xs px-3 py-1 rounded-[6px] border cursor-pointer transition-colors duration-150 ${
              selectedType === t.value
                ? "bg-accent text-accent-fg border-accent font-medium"
                : "bg-secondary text-muted border-border hover:border-accent hover:text-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </form>
  );
}
