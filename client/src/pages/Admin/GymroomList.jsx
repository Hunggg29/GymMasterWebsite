import { useState, useEffect } from 'react';
import { Heading, Loader } from '../../components';
import GymRoom from '../../components/admin/GymRoom';
import axios from 'axios';
import { toast } from "react-hot-toast";

import { BASE_URL } from '../../utils/fetchData';

const GymroomList = () => {
    const [rooms, setGymrooms] = useState([]);
    const [loading, setLoading] = useState(false);

    const GetGymrooms = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/GymRoom`);
            setGymrooms(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong in getting trainers || internet issue");
            setLoading(false);
        }
    };

    useEffect(() => {
        GetGymrooms();
    }, []);

    const handleDelete = async () => {
        await GetGymrooms();
    };

    if (loading) return <Loader />;

    return (
        <div>
            <section className='pt-10 bg-gray-900'>
                <div className="px-6">
                    <div className="flex justify-end mb-4"></div>
                </div>
                <Heading name="GymRoom List" />
                <div className="container mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {rooms.map((r, i) => {
                            return (
                                <GymRoom
                                    key={i}
                                    id={r.id}
                                    roomName={r.roomName}
                                    roomType={r.roomType}
                                    roomQuantity={r.roomQuantity}
                                    roomStatus={r.roomStatus}
                                    onDelete={handleDelete}
                                />
                            )
                        }
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GymroomList;
