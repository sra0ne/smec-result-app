import React from "react";

export default function General({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="space-y-4">
      {results.map((semester) => (
        <div
          key={semester.semNo}
          className="border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium tracking-tight">
              Semester {semester.semNo}
            </h3>
            <span className="text-xs px-3 py-1 bg-secondary text-accent rounded-lg border border-border">
              SGPA: {semester.sgpa}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted py-2 pr-4">
                    Subject
                  </th>
                  <th className="text-left text-xs font-medium text-muted py-2 pr-4">
                    Code
                  </th>
                  <th className="text-left text-xs font-medium text-muted py-2 pr-4">
                    Credits
                  </th>
                  <th className="text-left text-xs font-medium text-muted py-2 pr-4">
                    Grade
                  </th>
                  <th className="text-left text-xs font-medium text-muted py-2">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {semester.subjectsResults?.map((sub, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-2 pr-4 text-foreground">
                      {sub.subject.name}
                    </td>
                    <td className="py-2 pr-4 text-muted">
                      {sub.subject.subjectCode}
                    </td>
                    <td className="py-2 pr-4 text-muted">
                      {sub.subject.credits}
                    </td>
                    <td className="py-2 pr-4 text-foreground">
                      {sub.consideredGrade.grade}
                    </td>
                    <td className="py-2 ">{sub.consideredGrade.gradePoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
