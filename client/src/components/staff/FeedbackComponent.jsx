import React from 'react';

const FeedbackComponent = ({ userImg, rating, comment, name, date, feedbackId, handleDelete }) => {
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
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
    >
      <img 
        src={userImg} 
        alt="User" 
        className='max-w-[80px] w-full mx-auto rounded-full group-hover:scale-110 transition-all ease-in-out duration-300 border-4 border-gray-300'
      />
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out capitalize'>
        {name}
      </h3>

      <div className='flex flex-col gap-4 w-full'>
        <div className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Comment: </span>{comment}
        </div>
        <div className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Rating: </span><span className='text-pink-600'>{rating}</span>
        </div>
        <div className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Created At: </span>{formattedCreatedAt}
        </div>
        <div className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Feedback ID: </span>{feedbackId}
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm' 
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FeedbackComponent;
