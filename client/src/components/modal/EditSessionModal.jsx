import React from "react";
import { X, Dumbbell, ClipboardList } from "lucide-react";

const EditSessionModal = ({ isOpen, onClose, onSubmit, sessionData }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData.entries()),
      attendanceStatus: e.target.attendanceStatus.checked
    };
    onSubmit(data);
    onClose();
    console.log(data);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl p-6 max-w-md w-full relative shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Session</h2>

          <div className="space-y-4">
            {/* Session Type Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Dumbbell size={18} className="text-blue-500" />
                Session Type
              </label>
              <input
                name="sessionType"
                defaultValue={sessionData?.sessionType || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>

            {/* Notes Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ClipboardList size={18} className="text-blue-500" />
                Notes
              </label>
              <textarea
                name="notes"
                defaultValue={sessionData?.notes || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                rows={4}
              />
            </div>

            {/* Attendance Status Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group mt-2">
              <div className="relative">
                <input
                  type="checkbox"
                  name="attendanceStatus"
                  defaultChecked={sessionData?.attendanceStatus}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-green-500 peer-checked:bg-green-500 group-hover:border-green-400"></div>
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
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Attendance Status
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSessionModal;
