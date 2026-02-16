import React from 'react';

export default function Details({ student, course, program, cgpa }) {
  if (!student) return null;

  const fields = [
    { label: "Name", value: student.fullName },
    { label: "Roll No", value: student.rollNo },
    { label: "Course", value: course.displayName },
    { label: "Branch", value: program.branchName },
  ];

  cgpa ? fields.push({ label: "CGPA", value: cgpa }) : fields.push({ label: "CGPA", value: "N/A" });

  return (
    <div className="border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <img
          src={student.photo}
          alt="student"
          className="w-24 h-24 object-cover rounded-lg border border-border"
        />

        <div className="space-y-2 flex-1">
          <h2 className="text-lg font-medium tracking-tight mb-3">
            Student <span className="text-accent">Details</span>
          </h2>

          {fields.map((f) => (
            <div key={f.label} className="flex items-baseline gap-3 text-sm">
              <span className="text-muted w-20 shrink-0">{f.label}</span>
              <span className="text-foreground">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
