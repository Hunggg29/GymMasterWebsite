import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
import { Heading, Loader } from '../../components';

const Equipment = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/Gymroom/${id}/equipment`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setEquipments(res.data);
      } catch (err) {
        console.error('Error fetching equipments:', err);
      }
    };

    fetchEquipments();
  }, [id, auth.token]);

  return (
    <div>
      <section className='pt-10 bg-gray-900'>
        <div className="px-6">
          <div className="flex justify-end mb-4"></div>
        </div>
        <Heading name="GymRoom List" />
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipments.map((eq, i) => (
              <div
                className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
              >
                <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
                  {eq.name}
                </h3>

                <div className='flex flex-col gap-4 w-full'>
                  <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
                    <span className='font-semibold text-teal-600'>RoomQuantity: </span>{eq.quantity}
                  </p>
                  <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
                    <span className='font-semibold text-pink-600'>ImportDate: </span>{eq.importDate}
                  </p>
                  <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
                    <span className='font-semibold text-pink-600'>Warranty: </span>{eq.warranty}
                  </p>
                  <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
                    <span className='font-semibold text-pink-600'>Status: </span>{eq.status}
                  </p>
                </div>
              </div>
            )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipment;