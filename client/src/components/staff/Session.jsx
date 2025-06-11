import React from "react";
import { CalendarDays, Clock, UserIcon, Users, Home, ClipboardList } from "lucide-react";

const Session = ({ u }) => {
  console.log(u)
  const dateOnly=u.date.split("T")[0]
  const timeOnly=u.startTime.split("T")[1].slice(0,5);
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
      {/* Header Section */}
      <div className="space-y-2 mb-4 border-b pb-4">
        <div className="flex items-center gap-2">
          <UserIcon className="text-blue-600" size={24} />
          <h3 className="text-xl font-semibold text-blue-600">
            Trainer: {u.trainerName}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Users size={20} />
          <p>Trainee: {u.userName}</p>
        </div>
      </div>

      {/* Time Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <CalendarDays className="text-blue-500" size={20} />
            <span>Date: {dateOnly}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Home className="text-blue-500" size={20} />
            <span>Room: {u.roomName}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="text-blue-500" size={20} />
            <span>Start Time: {timeOnly}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <ClipboardList className="text-blue-500" size={20} />
            <span>Notes: {u.notes}</span>
          </div>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={u.attendanceStatus}
              
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-green-500 peer-checked:bg-green-500 peer-hover:border-green-400"></div>
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700 group-hover:text-gray-900">Attendance Status</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Session;