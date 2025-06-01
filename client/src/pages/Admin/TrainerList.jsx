import { useState, useEffect } from 'react';
import { Heading, Trainer, Loader } from '../../components';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { userImg } from "../../images";
import { BASE_URL } from '../../utils/fetchData';

const TrainerList = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTrainers = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/api/Trainer`);
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

    const handleDelete = async () => {
        await getTrainers();
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
                            console.log(tr);
                            return (
                                <Trainer
                                    key={i}
                                    id={tr.trainerId}
                                    name={tr.user?.username}
                                    userImg={userImg}
                                    email={tr.user?.email}
                                    contact={tr.user?.phone}
                                    spec = {tr.specialty}
                                    exp ={tr.experience}
                                    pph = {tr.pricePerHour}
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

export default TrainerList;
