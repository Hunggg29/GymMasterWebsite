import React from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
const GymRoom = ({ id, roomName, roomType, roomQuantity, roomStatus, onDelete, i }) => {
  const { auth } = useAuth();


  const handleRemove = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm("Are you sure you want to delete this room?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${BASE_URL}/api/GymRoom/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });

      if (response.status === 204) {
        toast.success('Room deleted successfully');
        if (onDelete) onDelete();
      } else {
        toast.error('Failed to delete room');
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error(error.response?.data?.message || 'Error deleting room');
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
        {roomName}
      </h3>

      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Room Type: </span>{roomType}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>RoomQuantity: </span>{roomQuantity}
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>RoomStatus: </span>{roomStatus}
        </p>
      </div>

      <div className="flex justify-between w-full">
        <button onClick={handleEquipmentsClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-4/7">
          Equipments
        </button>
        <button onClick={handleRemove} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-4/7">
          Delete
        </button>
      </div>
    </div>
  );
};

export default GymRoom;
