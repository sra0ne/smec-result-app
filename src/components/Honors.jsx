import React from 'react';

export default function Honors({ subjects }) {
  if (!subjects || subjects.length === 0) return null;

  return (
    <div className="border border-border rounded-lg p-6">
      <h2 className="text-lg font-medium tracking-tight mb-4">
        Honors <span className="text-accent">Subjects</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted py-2 pr-4">Subject</th>
              <th className="text-left text-xs font-medium text-muted py-2 pr-4">Code</th>
              <th className="text-left text-xs font-medium text-muted py-2 pr-4">Credits</th>
              <th className="text-left text-xs font-medium text-muted py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-2 pr-4 text-foreground">{s.subject.name}</td>
                <td className="py-2 pr-4 text-muted">{s.subject.subjectCode}</td>
                <td className="py-2 pr-4 text-muted">{s.subject.credits}</td>
                <td className="py-2 text-foreground">{s.consideredGrade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
