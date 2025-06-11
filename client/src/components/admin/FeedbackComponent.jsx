import React from 'react';

const FeedbackComponent = ({ userImg, rating, comment, name, date, feedbackId, handleDelete, isProcessed, handleProcess }) => {
  // Format date to include full time
  const formattedCreatedAt = date ? new Date(date).toLocaleString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  }) : 'N/A';

  return (
    <div 
      className={`relative overflow-hidden flex flex-col gap-6 justify-center items-center rounded-xl p-6 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl 
        ${isProcessed 
          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-l-emerald-500' 
          : 'bg-gradient-to-br from-slate-50 to-gray-50 border-l-4 border-l-gray-400 hover:border-l-blue-500'
        }`}
    >
      {isProcessed && (
        <div className="absolute top-4 right-4 transform transition-transform duration-500 ease-bounce">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Processed
          </span>
        </div>
      )}
      
      <div className="relative group">
        <img 
          src={userImg} 
          alt="User" 
          className={`w-20 h-20 rounded-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 
            ${isProcessed 
              ? 'border-4 border-emerald-500 shadow-emerald-200' 
              : 'border-4 border-gray-300 shadow-gray-200'} 
            shadow-lg`}
        />
        {isProcessed && (
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      <h3 className={`font-bold text-center text-xl transition-colors duration-300
        ${isProcessed ? 'text-emerald-700' : 'text-gray-700'}`}>
        {name}
      </h3>

      <div className='flex flex-col gap-4 w-full'>
        <div className={`relative overflow-hidden rounded-lg p-4 transition-all duration-300
          ${isProcessed 
            ? 'bg-emerald-50 border border-emerald-200' 
            : 'bg-white border border-gray-200'}`}>
          <div className="text-sm font-medium text-gray-500 mb-2">Feedback</div>
          <p className="text-gray-700">{comment}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-lg p-4 transition-all duration-300
            ${isProcessed 
              ? 'bg-emerald-50 border border-emerald-200' 
              : 'bg-white border border-gray-200'}`}>
            <div className="text-sm font-medium text-gray-500 mb-1">Rating</div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isProcessed ? 'text-emerald-500' : 'text-yellow-500'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{rating}</span>
            </div>
          </div>

          <div className={`rounded-lg p-4 transition-all duration-300
            ${isProcessed 
              ? 'bg-emerald-50 border border-emerald-200' 
              : 'bg-white border border-gray-200'}`}>
            <div className="text-sm font-medium text-gray-500 mb-1">Date</div>
            <div className="text-sm">{formattedCreatedAt}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 w-full">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
            ${isProcessed 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-200'
            }`}
          onClick={handleProcess}
          disabled={isProcessed}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Process
          </div>
        </button>
        <button 
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-200 transition-all duration-300"
          onClick={handleDelete}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </div>
        </button>
      </div>
    </div>
  );
};

export default FeedbackComponent;
