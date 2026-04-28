import React, { useState, useEffect, useRef } from 'react';
import { QrCode, RefreshCw, Users, Clock, Download, Play, Square, CheckCircle } from 'lucide-react';

const LecturerQRGenerator = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [studentsScanned, setStudentsScanned] = useState([]);
  const [totalStudents, setTotalStudents] = useState(45);
  const timerRef = useRef(null);
  const qrRef = useRef(null);

  // Mock class data
  const classes = [
    { id: 1, name: 'Data Structures - CS301', time: '8:00 AM - 11:00 AM', students: 45 },
    { id: 2, name: 'Database Systems - CS302', time: '11:00 AM - 2:00 PM', students: 38 },
    { id: 3, name: 'Web Development - CS303', time: '2:00 PM - 5:00 PM', students: 52 }
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            regenerateQRCode();
            return 120; // Reset to 2 minutes
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const generateQRCode = async () => {
    if (!selectedClass) {
      alert('Please select a class first');
      return;
    }

    const classInfo = classes.find(c => c.id === parseInt(selectedClass));
    
    // Generate QR code data
    const qrData = {
      classId: selectedClass,
      timestamp: new Date().toISOString(),
      token: generateToken(),
      lecturer: 'Dr. John Kamau',
      className: classInfo.name
    };

    // In production, use a QR code generation library like 'qrcode'
    // For now, we'll simulate with a data URL
    const qrCodeDataURL = await createQRCodeSVG(JSON.stringify(qrData));
    
    setQrCode({
      data: qrData,
      image: qrCodeDataURL
    });
    setIsActive(true);
    setTimeLeft(120);

    // Simulate students scanning
    simulateStudentScans();
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const createQRCodeSVG = async (data) => {
    // In production, use: import QRCode from 'qrcode'
    // const qrDataURL = await QRCode.toDataURL(data);
    
    // For demo, create a simple SVG placeholder
    const size = 300;
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="white"/>
        <rect x="20" y="20" width="260" height="260" fill="none" stroke="black" stroke-width="2"/>
        <rect x="40" y="40" width="40" height="40" fill="black"/>
        <rect x="220" y="40" width="40" height="40" fill="black"/>
        <rect x="40" y="220" width="40" height="40" fill="black"/>
        <rect x="130" y="130" width="40" height="40" fill="black"/>
        <!-- Add more QR patterns here -->
        <text x="150" y="290" text-anchor="middle" font-size="12" fill="gray">Scan to mark attendance</text>
      </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(svg);
  };

  const regenerateQRCode = () => {
    if (!isActive) return;
    
    const classInfo = classes.find(c => c.id === parseInt(selectedClass));
    
    const qrData = {
      classId: selectedClass,
      timestamp: new Date().toISOString(),
      token: generateToken(),
      lecturer: 'Dr. John Kamau',
      className: classInfo.name
    };

    createQRCodeSVG(JSON.stringify(qrData)).then(qrCodeDataURL => {
      setQrCode({
        data: qrData,
        image: qrCodeDataURL
      });
    });
  };

  const stopSession = () => {
    setIsActive(false);
    setQrCode(null);
    setTimeLeft(120);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.download = `attendance-qr-${Date.now()}.png`;
    link.href = qrCode.image;
    link.click();
  };

  const simulateStudentScans = () => {
    // Simulate students scanning over time
    const studentNames = [
      'Alice Wanjiku', 'Bob Omondi', 'Carol Akinyi', 'David Mwangi',
      'Emma Njeri', 'Frank Otieno', 'Grace Chebet', 'Henry Mutua'
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < 8) {
        setStudentsScanned(prev => [...prev, {
          name: studentNames[count],
          time: new Date().toLocaleTimeString(),
          status: 'verified'
        }]);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 3000); // Add a student every 3 seconds
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .rotate {
          animation: rotate 2s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            QR Code Attendance
          </h1>
          <p className="text-gray-600">
            Generate QR codes for students to scan and mark attendance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Class Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Select Class
              </h3>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                disabled={isActive}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none disabled:bg-gray-100"
              >
                <option value="">Choose a class...</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>

              {selectedClass && (
                <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-900">
                        {classes.find(c => c.id === parseInt(selectedClass))?.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-semibold text-gray-900">
                        {classes.find(c => c.id === parseInt(selectedClass))?.students}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Controls</h3>

              {!isActive ? (
                <button
                  onClick={generateQRCode}
                  disabled={!selectedClass}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Session
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={regenerateQRCode}
                    className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Regenerate Now
                  </button>
                  
                  <button
                    onClick={downloadQRCode}
                    className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download QR Code
                  </button>
                  
                  <button
                    onClick={stopSession}
                    className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Square className="w-5 h-5" />
                    Stop Session
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            {isActive && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Session Stats</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Scanned:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {studentsScanned.length}/{totalStudents}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                      style={{ width: `${(studentsScanned.length / totalStudents) * 100}%` }}
                    ></div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      {((studentsScanned.length / totalStudents) * 100).toFixed(0)}% Present
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - QR Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[600px] flex flex-col">
              {!isActive ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No Active Session
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Select a class and click "Start Session" to generate a QR code for your students to scan
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  {/* Timer */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-3 rounded-full border-2 border-orange-200">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Refreshes in</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatTime(timeLeft)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="relative mb-6">
                    {/* Pulse Ring Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-4 border-orange-400 rounded-3xl pulse-ring"></div>
                    </div>
                    
                    {/* QR Code Image */}
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-4 border-orange-300">
                      <img
                        ref={qrRef}
                        src={qrCode?.image}
                        alt="QR Code"
                        className="w-80 h-80"
                      />
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Students: Scan This Code
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Open your attendance app and point your camera at this QR code to mark your attendance
                    </p>
                  </div>

                  {/* Recent Scans */}
                  {studentsScanned.length > 0 && (
                    <div className="w-full mt-8 pt-8 border-t border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Recent Scans
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {studentsScanned.slice().reverse().map((student, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">{student.name}</p>
                                <p className="text-xs text-gray-600">{student.time}</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-green-600 uppercase">
                              {student.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerQRGenerator;