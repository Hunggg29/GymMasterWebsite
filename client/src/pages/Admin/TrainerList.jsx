import { useState, useEffect } from 'react';
import { Heading, Loader } from '../../components';
import axios from 'axios';
import Trainer from '../../components/admin/Trainer';
import { toast } from "react-hot-toast";
import { userImg } from "../../images";
import { BASE_URL } from '../../utils/fetchData';
import EditTrainerModal from '../../components/modal/EditTrainerModal';
import { useAuth } from '../../context/auth';

const TrainerList = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTrainerData, setCurrentTrainerData] = useState(null);
    const { auth } = useAuth();

    const getTrainers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/Trainer`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setTrainers(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong in getting trainers || internet issue");
            setLoading(false);
        }
    };

    useEffect(() => {
        getTrainers();
    }, []);

    const handleEditClick = (trainer) => {
        setCurrentTrainerData(trainer);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setCurrentTrainerData(null);
    };

    const handleUpdateTrainer = async (updatedData) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/Trainer/${updatedData.id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                toast.success('Trainer updated successfully');
                getTrainers();
                handleCloseModal();
            } else {
                toast.error('Failed to update trainer');
            }
        } catch (error) {
            console.error("Error updating trainer:", error);
            toast.error(error.response?.data?.message || 'Error updating trainer');
        }
    };

    const handleDeleteTrainer = async (trainerId) => {
        try {
            await axios.delete(`${BASE_URL}/api/Trainer/${trainerId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            // If the above line doesn't throw, it's a success (e.g., 204 No Content)
            toast.success('Trainer deleted successfully');
            getTrainers(); // Re-fetch the list to update UI
        } catch (error) {
            console.error("Error deleting trainer:", error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data?.message || `Error deleting trainer: ${error.response.status}`);
            } else {
                toast.error('An unexpected error occurred during deletion.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <section className='pt-10 bg-gray-900'>
                <div className="px-6">
                    <div className="flex justify-end mb-4"></div>
                </div>
                <Heading name="Trainer List" />
                <div className="container mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {trainers.map((tr, i) => {
                            return (
                                <Trainer
                                    key={i}
                                    id={tr.trainerId}
                                    userId={tr.userId}
                                    name={tr.user?.username}
                                    userImg={userImg}
                                    email={tr.user?.email}
                                    contact={tr.user?.phone}
                                    specialty={tr.specialty}
                                    experience={tr.experience}
                                    PricePerHour={tr.pricePerHour}
                                    fullName={tr.fullName}
                                    onEditClick={handleEditClick}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>

            {showEditModal && currentTrainerData && (
                <EditTrainerModal
                    isOpen={showEditModal}
                    onClose={handleCloseModal}
                    trainerData={currentTrainerData}
                    onSave={handleUpdateTrainer}
                    onDelete={handleDeleteTrainer}
                />
            )}
        </div>
    );
};

export default TrainerList;
