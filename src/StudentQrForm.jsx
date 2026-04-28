// StudentQRForm.jsx
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const StudentQRForm = () => {
  const [qrData, setQrData] = useState("");
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  const handleQrScan = (result) => {
    if (result) {
      setQrData(result?.text || result);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = inputs.join("");
    alert(`QR Data: ${qrData}\nEntered Code: ${code}`);
    // Here you can send qrData and code to backend API
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>

      {/* QR Code Scanner */}
      <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-md">
        <QrReader
          onResult={(result, error) => {
            if (!!result) handleQrScan(result);
          }}
          constraints={{ facingMode: "environment" }}
          className="w-full"
        />
        <p className="mt-2 text-center text-sm text-gray-600">
          {qrData ? `Scanned: ${qrData}` : "Scan your QR code"}
        </p>
      </div>

      {/* Six Input Boxes */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-full max-w-md"
      >
        <div className="flex space-x-2">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentQRForm;