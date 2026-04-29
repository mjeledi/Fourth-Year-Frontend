import React, { useState } from "react";

export default function PositionLocation({ points, setPoints, className, setClassName }) {

    const [loading, setLoading] = useState(false);

    const getLocation = (direction) => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setPoints((prev) => ({
                    ...prev,
                    [direction]: {
                        latitude: latitude,
                        longitude: longitude,
                        timestamp: Date.now()
                    },
                }));

                setLoading(false);
            },
            (error) => {
                console.error(error);
                alert("Failed to get location");
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );
    };

    const Button = ({ label, dir }) => (
        <button
        onClick={() => getLocation(dir)}
        className="w-full flex items-center justify-between px-4 py-4 rounded-xl border border-black/20
                    bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
        >
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-sm">
            {points[dir] ? (
            <span className="text-green-600 font-semibold">✓ Captured</span>
            ) : (
            <span className="text-gray-400">Tap</span>
            )}
        </span>
        </button>
    );

    return <div className="w-full bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Class Boundary Capture
            </h2>

            {/* Class Name */}
            <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">
                Class Name
            </label>
            <input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter class name..."
                className="w-full px-4 py-3 border rounded-xl focus:outline-none 
                        focus:ring-2 focus:ring-green-500"
            />
            </div>

            {/* Buttons */}
            <div className="space-y-5">
                <Button label="Capture East" dir="east" />
                <Button label="Capture West" dir="west" />
                <Button label="Capture North" dir="north" />
                <Button label="Capture South" dir="south" />
            </div>
    </div>
}