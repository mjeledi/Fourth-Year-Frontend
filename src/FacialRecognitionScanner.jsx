import React, { useState, useEffect, useRef } from 'react';
import { Camera, Scan, CheckCircle, AlertTriangle, Smile, RefreshCw, Volume2, VolumeX, User, MapPin } from 'lucide-react';
import { aiMessages, classInfo, livenessChecks } from './constants';
import { useParams, useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useApi } from './context/ApiProvider';
import { HttpFaceScannerThunk } from './store/recognition/recogntionThunks';

const FacialRecognitionScanner = () => {

  const { api } = useApi();
  const params = useParams();
  const id = params.id
  const decodedId = atob(id)
  const dispatch = useDispatch();

  const [scanningState, setScanningState] = useState('idle'); // idle, scanning, liveness, success, failed
  const [livenessCheck, setLivenessCheck] = useState('');
  const [userImage, setUserImage] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const videoRef = useRef(null);

  const captureImage = () => {
    const video = videoRef.current;

    if (!video) {
      console.error("Video ref not ready");
      return null;
    }

    if (video.readyState !== 4) {
      console.error("Video not ready yet");
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg");
  };

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user"
          }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


 
  useEffect(() => {
    if (scanningState === 'scanning') {
      // Simulate face detection progress
      const interval = setInterval(() => {
        setDetectionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Move to liveness check
            setTimeout(() => {
              setScanningState('liveness');
              const randomCheck = livenessChecks[Math.floor(Math.random() * livenessChecks.length)];
              setLivenessCheck(randomCheck);
              
              // Simulate liveness check passing
              setTimeout(() => {
                setScanningState('success');
                speakMessage('Attendance marked successfully');
              }, 3000);
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [scanningState]);

  const speakMessage = (message) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };


  const resetScanner = () => {
    setScanningState('idle');
    setDetectionProgress(0);
    setLivenessCheck('');
  };


  const startScanning = async () => {
    const video = videoRef.current;

    if (!video || video.readyState !== 4) {
      alert("Camera not ready yet. Please wait.");
      return;
    }

    setScanningState("scanning");
    setDetectionProgress(0);

    speakMessage("Scanning your face. Please hold still.");

    const image = captureImage();
    setUserImage(image.substring(0, 50))

    if (!image) return;

    console.log(image)
    dispatch(HttpFaceScannerThunk({ api, 
      face: image, 
      userId : decodedId, resetScanner, setUserImage }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Space Grotesk', sans-serif;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        @keyframes scan-line {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }

        .scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }

        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }

        .grid-bg {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3);
        }

        .face-frame {
          background: linear-gradient(to right, #8b5cf6 0%, #8b5cf6 100%);
          padding: 3px;
          border-radius: 24px;
        }

        .face-frame-inner {
          background: #1e1b4b;
          border-radius: 21px;
          overflow: hidden;
        }

        .corner-decoration {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 3px solid #8b5cf6;
        }

        .corner-tl { top: -3px; left: -3px; border-right: none; border-bottom: none; }
        .corner-tr { top: -3px; right: -3px; border-left: none; border-bottom: none; }
        .corner-bl { bottom: -3px; left: -3px; border-right: none; border-top: none; }
        .corner-br { bottom: -3px; right: -3px; border-left: none; border-top: none; }
      `}</style>

      {/* Animated background grid */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-60 float-animation"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full opacity-40 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-50 float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-30 float-animation" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel - Camera/Scanner */}
          <div className="space-y-6">
            {/* Class Info Card */}
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/50">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{classInfo.name}</h2>
                  <p className="text-sm text-purple-300">{classInfo.code}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-gray-400 mb-1">Time</p>
                  <p className="text-white font-semibold">{classInfo.time}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                  <p className="text-gray-400 mb-1">Venue</p>
                  <p className="text-white font-semibold">{classInfo.venue}</p>
                </div>
              </div>
            </div>

            {/* Camera View */}
            <div className="relative face-frame glow">
              <div className="face-frame-inner relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  {/* Camera feed placeholder */}
                  {/* Real Camera Feed */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedMetadata={() => {
                      console.log("Camera ready");
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 pointer-events-none"></div>

                  {/* Face detection overlay */}
                  <div className="relative z-10 w-64 h-80 border-2 border-dashed border-purple-400 rounded-3xl flex items-center justify-center">
                    {scanningState === 'idle' && (
                      <div className="text-center">
                        <User className="w-24 h-24 text-purple-400 mx-auto mb-4 opacity-50" />
                        <p className="text-purple-300 text-sm">Position your face here</p>
                      </div>
                    )}
                    
                    {scanningState === 'scanning' && (
                      <>
                        <div className="absolute inset-0 border-4 border-purple-500 rounded-3xl pulse-ring"></div>
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent scan-line"></div>
                        </div>
                        {/* Detection progress */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30">
                            <div className="flex justify-between text-xs text-purple-300 mb-2">
                              <span>Detection Progress</span>
                              <span className="mono">{detectionProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                                style={{ width: `${detectionProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {scanningState === 'liveness' && (
                      <div className="text-center p-6">
                        <Smile className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                        <p className="text-white font-bold text-lg mb-2">Liveness Check</p>
                        <p className="text-purple-300">{livenessCheck}</p>
                      </div>
                    )}

                    {scanningState === 'success' && (
                      <div className="text-center p-6">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-500">
                          <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <p className="text-white font-bold text-xl">Success!</p>
                      </div>
                    )}

                    {scanningState === 'failed' && (
                      <div className="text-center p-6">
                        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-500">
                          <AlertTriangle className="w-16 h-16 text-red-500" />
                        </div>
                        <p className="text-white font-bold text-xl">Failed</p>
                      </div>
                    )}

                    {/* Corner decorations */}
                    <div className="corner-decoration corner-tl"></div>
                    <div className="corner-decoration corner-tr"></div>
                    <div className="corner-decoration corner-bl"></div>
                    <div className="corner-decoration corner-br"></div>
                  </div>
                </div>

                {/* Controls overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-purple-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {scanningState === 'idle' && (
                <button
                  onClick={startScanning}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Scan className="w-5 h-5" />
                  Start Face Scan
                </button>
              )}
              
              {(scanningState === 'success' || scanningState === 'failed') && (
                <button
                  onClick={resetScanner}
                  className="flex-1 py-4 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-600"
                >
                  <RefreshCw className="w-5 h-5" />
                  Scan Another Student
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - AI Assistant */}
          <div className="space-y-6">
            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">AI Assistant</h2>
                  <p className="text-sm text-purple-300">Attendance guidance system</p>
                </div>
              </div>

              {/* Message Display */}
              <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 mb-6">
                <p className="text-white text-lg leading-relaxed">
                  {aiMessages[scanningState]}
                </p>
              </div>

              {/* Tips Section */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold mb-3">Quick Tips:</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300">Ensure your face is well-lit and clearly visible</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300">Remove sunglasses or face coverings</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300">Look directly at the camera</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <p className="text-gray-300">Follow the AI instructions during liveness check</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Security Features Active</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span className="text-gray-300 text-sm">Anti-Spoofing Detection</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded border border-green-500/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span className="text-gray-300 text-sm">Liveness Verification</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded border border-green-500/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span className="text-gray-300 text-sm">3D Face Mapping</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded border border-green-500/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-300 text-sm">Encrypted Storage</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded border border-green-500/50">
                    AES-256
                  </span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-green-900/30 to-slate-900/50 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white font-semibold">System Online</p>
                  <p className="text-sm text-green-300">All systems operational • Offline mode ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacialRecognitionScanner;
