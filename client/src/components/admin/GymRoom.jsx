import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import GymRoomEditModal from './GymRoomEditModal';

const GymRoom = ({ id, roomName, roomType, roomQuantity, roomStatus, onDelete, i }) => {
  const { auth } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRoomData, setCurrentRoomData] = useState({ id, roomName, roomType, roomQuantity, roomStatus });

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleUpdateRoom = async (updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/GymRoom/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        toast.success('Room updated successfully');
        setCurrentRoomData(updatedData);
        setShowEditModal(false);
        if (onDelete) onDelete();
      } else {
        toast.error('Failed to update room');
      }
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error(error.response?.data?.message || 'Error updating room');
    }
  };

  const navigate = useNavigate();

  const handleEquipmentsClick = () => {
    navigate(`/dashboard/admin/gymrooms/${id}/equipments`);
  };

  return (
    <div
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
    >
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {currentRoomData.roomName}
      </h3>

      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Room Type: </span>{currentRoomData.roomType}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Capacity: </span>{currentRoomData.roomQuantity} people
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>Room Status: </span>{currentRoomData.roomStatus}
        </p>
      </div>

      <div className="flex justify-between w-full gap-3">
        <button onClick={handleEquipmentsClick} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
          Equipments
        </button>
        <button onClick={handleEditClick} className="flex-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm">
          Edit
        </button>
      </div>
      
      {showEditModal && (
        <GymRoomEditModal 
          isOpen={showEditModal}
          onClose={handleCloseModal}
          roomData={currentRoomData}
          onSave={handleUpdateRoom}
        />
      )}
    </div>
  );
};

export default GymRoom;
