import React from 'react';
import { X, Calendar, Dumbbell, Clock, FileText, User } from 'lucide-react';

const TrainingHistoryModal = ({ isOpen, onClose, userName, TrainingHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative transform transition-all animate-in slide-in-from-bottom-5">
        {/* Header */}
        <div className="absolute top-4 right-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
            Training Histories
          </h2>
          <p className="text-center text-gray-600 font-medium">
            {userName}
          </p>
        </div>

        {/* Content */}
        {TrainingHistory && TrainingHistory.length > 0 ? (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {TrainingHistory.map((session, index) => {
              const dateOnly=session.startTime.split("T")[0]
              const timeOnly=session.startTime.split("T")[1].slice(0,5);
              return(
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium text-gray-800">{dateOnly}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Trainer</p>
                        <p className="font-medium text-gray-800">{session.trainerName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Trainee</p>
                        <p className="font-medium text-gray-800">{session.userName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Dumbbell className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Session Type</p>
                        <p className="font-medium text-gray-800">{session.sessionType}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Time Begin</p>
                        <p className="font-medium text-gray-800">{timeOnly}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 md:col-span-2">
                      <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium text-gray-800">{session.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No training history available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingHistoryModal;
