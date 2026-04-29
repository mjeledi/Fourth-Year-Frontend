import React, { useState } from "react";

export default function ClassSelector({ classes, onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (cls) => {
    let newSelected = cls.class_id;

    // toggle (select → unselect)
    if (selectedId === cls.class_id) {
      newSelected = null;
    }

    setSelectedId(newSelected);

    if (onSelect) {
      const selectedClass = classes.find(
        (c) => c.class_id === newSelected
      );
      onSelect(selectedClass || null);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className="text-lg font-semibold text-gray-800">
        Select Class
      </h3>

      {classes.map((cls) => {
        const isSelected = selectedId === cls.class_id;

        return (
          <div
            key={cls.class_id}
            onClick={() => handleSelect(cls)}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-green-300"
              }
            `}
          >
            {/* Class name */}
            <span className="font-medium text-gray-700">
              {cls.class_name}
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