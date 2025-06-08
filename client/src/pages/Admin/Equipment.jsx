import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
import { Heading, Loader } from '../../components';
import EquipmentEditModal from '../../components/modal/EquipmentEditModal';
import CreateEquipmentModal from '../../components/modal/CreateEquipmentModal';
import { toast } from "react-hot-toast";

const Equipment = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentEquipmentData, setCurrentEquipmentData] = useState(null);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Gymroom/${id}/equipment`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setEquipments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching equipments:', err);
      toast.error('Can not get equipments');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [id, auth.token]);

  const handleEditClick = (equipment) => {
    setCurrentEquipmentData(equipment);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentEquipmentData(null);
  };

  const handleCreateEquipment = async (equipmentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Equipment`, equipmentData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        toast.success('Equipment created successfully');
        setShowCreateModal(false);
        fetchEquipments();
      }
    } catch (error) {
      console.error('Error creating equipment:', error);
      toast.error(error.response?.data?.message || 'Error creating equipment');
    }
  };

  const handleUpdateEquipment = async (updatedData) => {
    try {
      const { roomId, ...dataToUpdate } = updatedData;

      const response = await axios.put(`${BASE_URL}/api/Equipment/${updatedData.id}`, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        } 
      });

      if (response.status === 200) {
        toast.success('Equipment updated successfully');
        
        // Check if status is changed to "Broken"
        if (dataToUpdate.status === 'Broken') {
          toast.success('Maintenance team has been notified', {
            duration: 5000,
          });
        }

        fetchEquipments();
        handleCloseModal();
      } else {
        toast.error('Failed to update equipment');
      }
    } catch (error) {
      console.error("Error updating equipment:", error);
      toast.error(error.response?.data?.message || 'Error updating equipment');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <section className='pt-10 bg-gray-900'>
        <Heading name="Equipment List" />
        <div className="px-6">
          <div className="flex justify-end mb-4 mr-5">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + Add New Equipment
            </button>
          </div>
        </div>
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipments.map((eq, i) => (
              <div
                key={eq.id}
                className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
              >
                <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
                  {eq.name}
                </h3>

                <div className='flex flex-col gap-4 w-full'>
                  <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
                    <span className='font-semibold text-teal-600'>Quantity: </span>{eq.quantity}
                  </p>
                  <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
                    <span className='font-semibold text-pink-600'>Import Date: </span>{eq.importDate.split('T')[0]}
                  </p>
                  <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
                    <span className='font-semibold text-pink-600'>Warranty: </span>{eq.warranty.split('T')[0]}
                  </p>
                  <p className={`text-gray-700 text-md rounded-lg p-3 ${
                    eq.status === 'Broken' ? 'bg-red-100' : 
                    eq.status === 'Active' ? 'bg-green-100' : 
                    'bg-yellow-100'
                  }`}>
                    <span className={`font-semibold ${
                      eq.status === 'Broken' ? 'text-red-600' : 
                      eq.status === 'Active' ? 'text-green-600' : 
                      'text-yellow-600'
                    }`}>Status: </span>{eq.status}
                  </p>
                </div>

                <div className="flex justify-end w-full">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm"
                    onClick={() => handleEditClick(eq)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showEditModal && currentEquipmentData && (
        <EquipmentEditModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          equipmentData={currentEquipmentData}
          onSave={handleUpdateEquipment}
        />
      )}

      {showCreateModal && (
        <CreateEquipmentModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateEquipment}
          roomId={id}
        />
      )}
    </div>
  );
};

export default Equipment;