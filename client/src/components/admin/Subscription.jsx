import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import TrainingHistoryModal from '../modal/TrainingHistoryModal';
import toast from 'react-hot-toast';

const Subscription = ({ userImg, userName, planName, planPrice, durationInDays, userId, subscriptionId, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState([]);

  useEffect(() => {
    if (showModal) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/Users/${userId}/trainingSessions`);
          const filteredHistory = res.data.filter(train => new Date(train.endTime) < new Date());
          setTrainingHistory(filteredHistory);
        } catch (error) {
          console.error(error);
          toast.error('Can not get training history');
        }
      };
      fetchHistory();
    }
  }, [showModal, userId]);

  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this subscription?");
      if (!answer) return;
      
      await onDelete(subscriptionId);
      toast.success('Delete subscription successfully');
    } catch (error) {
      console.error(error);
      toast.error('Can not delete subscription');
    }
  };

  return (
    <div className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'>
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {userName}
      </h3>
      <img 
        src={userImg} 
        alt="User" 
        className='w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300' 
      />
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Plan Name: </span>{planName}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Plan Price: </span>{planPrice} $
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Duration: </span>{durationInDays} days
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium"
          onClick={() => setShowModal(true)}
        >
          Training Histories
        </button>

        <button
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {showModal && (
        <TrainingHistoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          userName={userName}
          TrainingHistory={trainingHistory}
        />
      )}
    </div>
  );
};

export default Subscription;
