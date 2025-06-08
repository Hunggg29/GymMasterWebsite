import { BASE_URL } from '../../utils/fetchData'
import React, { useState,useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { ClipboardList, History } from 'lucide-react';
import TrainingHistoryModal from '../modal/TrainingHistoryModal';
import { Link } from 'react-router-dom';

const UserStaff = ({ userImg, name, email, contact, i, fullname, id, onDelete, role, onShowPlans, onShowHistory }) => {
  
 const [showModal,setShowModal]=useState(false)
const [trainingHistory, setTrainingHistory] = useState([]);

  useEffect(() => {
    if (showModal) {
      const fetchHistory = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/Users/${id}/trainingSessions`);
          console.log(res.data)
        const filteredHistory = res.data.filter(train => new Date(train.endTime) < new Date());
setTrainingHistory(filteredHistory);
        } catch (error) {
          console.error(error);
          toast.error('Không lấy được lịch sử tập luyện');
        }
      };
      fetchHistory();
    }
  }, [showModal, id]);
  return (
    <div 
      key={i} 
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg  w-full max-w-lg mx-auto'
    >
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {name}
      </h3>
      <img 
        src={userImg} 
        alt="User" 
        className='w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300' 
      />
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Email: </span>{email}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Contact: </span>{contact}
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>FullName: </span>{fullname}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full mt-2">
        <Link to={`subscription?id=${id}`} >
          <button
            className="flex-1 group/btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
            onClick={() => onShowPlans && onShowPlans(id, fullname)}
          >
            <ClipboardList className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            <span>Subcriptions</span>
          </button>
        </Link>
        <button
          className="flex-1 group/btn bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
          onClick={(e) => {
            setShowModal(true)
            
          }}
        >
          <History className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          <span> Training Histories</span>
        </button>
      </div>
      {showModal&&<TrainingHistoryModal
       isOpen={showModal}
    onClose={() => setShowModal(false)}
        userName={name}
       TrainingHistory={trainingHistory}
      />}
    </div>
  );
}

export default UserStaff;
