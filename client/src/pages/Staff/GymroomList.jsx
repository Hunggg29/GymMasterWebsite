import { useState, useEffect } from 'react';
import { Heading, Loader, GymRoomStaff } from '../../components';
import CreateGymRoomModal from '../../components/modal/CreateGymRoomModal';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { BASE_URL } from '../../utils/fetchData';

const GymroomListStaff = () => {
    const [rooms, setGymrooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const GetGymrooms = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/GymRoom`);
            setGymrooms(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong in getting rooms");
            setLoading(false);
        }
    };

    useEffect(() => {
        GetGymrooms();
    }, []);

    const handleDelete = async () => {
        await GetGymrooms();
    };

    const handleCreateRoom = async (roomData) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/GymRoom`, roomData);
            if (response.status === 201) {
                toast.success('Room created successfully');
                setShowCreateModal(false);
                GetGymrooms();
            }
        } catch (error) {
            console.error('Error creating room:', error);
            toast.error(error.response?.data?.message || 'Error creating room');
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <section className='pt-10 bg-gray-900'>
                <Heading name="GymRoom List" />
                <div className="px-6">
                    <div className="flex justify-end mb-4 mr-5">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            + Add New Room
                        </button>
                    </div>
                </div>
                <div className="container mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {rooms.map((r, i) => {
                            return (
                                <GymRoomStaff
                                    key={i}
                                    id={r.id}
                                    roomName={r.roomName}
                                    roomType={r.roomType}
                                    roomQuantity={r.roomQuantity}
                                    roomStatus={r.roomStatus}
                                    onDelete={handleDelete}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>

            {showCreateModal && (
                <CreateGymRoomModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleCreateRoom}
                />
            )}
        </div>
    );
};

export default GymroomListStaff;
