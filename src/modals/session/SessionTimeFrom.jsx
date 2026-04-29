import { useState } from "react";

export default function SessionTimeForm({ startTime, endTime, setStartTime, setEndTime }) {
    return (
        <div className="flex flex-col gap-4">
        
        {/* Start Time */}
        <div className="space-y-2">
            <label className="block text-sm font-medium">Start Time</label>
            <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-black/10 px-2 py-4 rounded w-full focus:outline-none focus:border-black/20"
            />
        </div>

        {/* End Time */}
        <div className="space-y-2">
            <label className="block text-sm font-medium">End Time</label>
            <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-black/10 px-2 py-4 rounded w-full focus:outline-none focus:border-black/20"
            />
        </div>
        </div>
    );
}