import { BASE_URL } from '../../utils/fetchData';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import TrainingHistoryModal from '../modal/TrainingHistoryModal';

const Trainer = ({ userImg, name, email, contact, i, id, userId, specialty, experience, PricePerHour, fullName, onEditClick }) => {
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [trainingHistory, setTrainingHistory] = useState([]);
  
  useEffect(() => {
    if (showModal) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/Trainer/${userId}/sessions`);
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

  return (
    <div 
      key={i} 
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
    >
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {name}
      </h3>
      <img 
        src={userImg} 
        alt="Trainer" 
        className='w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300' 
      />
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Email: </span>{email}
        </p>
        <p className='text-gray-700 text-md bg-yellow-100 rounded-lg p-3'>
          <span className='font-semibold text-yellow-600'>Contact: </span>{contact}
        </p>
        <p className='text-gray-700 text-md bg-purple-100 rounded-lg p-3'>
          <span className='font-semibold text-purple-600'>Specialization: </span>{specialty}
        </p>
        <p className='text-gray-700 text-md bg-green-100 rounded-lg p-3'>
          <span className='font-semibold text-green-600'>Experience: </span>{experience} years
        </p>
        <p className='text-gray-700 text-md bg-blue-100 rounded-lg p-3'>
          <span className='font-semibold text-blue-600'>Price Per Hour: </span>${PricePerHour}
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
          className="flex-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm"
          onClick={() => onEditClick({ trainerId: id, userId, specialization: specialty, experience, pricePerHour: PricePerHour, fullName, username: name, email, phone: contact })}
        >
          Edit
        </button>
      </div>

      {showModal && (
        <TrainingHistoryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          userName={name}
          TrainingHistory={trainingHistory}
        />
      )}
    </div>
  );
};

export default Trainer;

