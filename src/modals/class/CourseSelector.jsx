import React, { useState } from "react";

export default function CourseSelector({ courses, onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (course) => {
    let newSelected = course.course_id;

    // toggle (select → unselect)
    if (selectedId === course.course_id) {
      newSelected = null;
    }

    setSelectedId(newSelected);

    if (onSelect) {
      const selectedCourses = courses.find((c) => c.course_id === newSelected);
      onSelect(selectedCourses || null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-lg font-semibold text-gray-800">
        Select Course
      </h3>

      {courses.map((course) => {
        const isSelected = selectedId === course.course_id;

        return (
          <div
            key={course.course_id}
            onClick={() => handleSelect(course)}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-green-300"
              }
            `}
          >
            {/* Course name */}
            <span className="font-medium text-gray-700">
              {course.course_name}
            </span>

            {/* Radio button */}
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  isSelected
                    ? "border-green-600"
                    : "border-gray-400"
                }
              `}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}