import React, { useState } from "react";

export default function SessionSelector({ sessions, onProceed }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (sessionId) => {
    setSelectedId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleProceed = (session) => {
    if (onProceed) {
      onProceed(session);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl">
      <h3 className="text-3xl mb-6 font-semibold text-gray-800">
        Select Session To Attend
      </h3>

      {sessions.map((session) => {
        const isSelected = selectedId === session.session_id;

        return (
          <div
            key={session.session_id}
            className={`flex mb-6 justify-between p-4 rounded-lg border transition-all duration-200
              ${
                isSelected
                  ? "border-green-600 bg-green-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-green-300"
              }
            `}
          >
            {/* Left info */}
            <div
              className="space-y-3 flex flex-col cursor-pointer"
              onClick={() => handleSelect(session.session_id)}
            >
              <div className="font-semibold flex space-x-2 text-gray-800">
                <p className="text-black/60">COURSE NAME: </p>
                <p>{session?.course_name?? ""}</p>
              </div>
              <div className="font-semibold flex space-x-2 text-gray-800">
                <p className="text-black/60">COURSE CODE: </p>
                <p>{session?.course_code?? ""}</p>
              </div>
              <div className="font-semibold flex space-x-2 text-gray-800">
                <p className="text-black/60">DURATION: </p>
                <p>{session?.planned_duration?? 0} minutes</p>
              </div>
              <div className="font-semibold flex space-x-2 text-gray-800">
                <p className="text-black/60">VENUE: </p>
                <p>{session?.class_name?? ""}</p>
              </div>

              <div className="text-sm text-gray-500">
                Session ID: {session.session_id.slice(0, 8)}...
              </div>
            </div>

            {/* Right side actions */}
            <div>
              <div className="flex items-center gap-3">
              {/* Radio */}
              <div
                onClick={() => handleSelect(session.session_id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer
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

              {/* Proceed button */}
              <button
                disabled={!isSelected}
                onClick={() => handleProceed(session)}
                className={`px-3 py-2 text-base font-medium rounded-md transition-all
                  ${
                    isSelected
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Proceed
              </button>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}