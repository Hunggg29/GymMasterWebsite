import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heading, Subscription, Loader } from '../../components';
import { userImg } from "../../images";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchData';
import toast from 'react-hot-toast';

const SubscriberList = () => {
  const [subscriber, setSubscriber] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllSubscribers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/subscription`);
      setSubscriber(Array.isArray(res.data) ? res.data : []);
      setLoading(false); 
    } catch (err) {
      console.log(err);
      setLoading(false); 
    }
  };

  const handleDelete = async (subscriptionId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/api/subscription/${subscriptionId}`);
      if (data?.success) {
        toast.success('Delete subscription successfully');
        getAllSubscribers(); // Refresh the list after deletion
      } else {
        toast.error(data?.message || 'Can not delete subscription');
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast.error('Can not delete subscription');
    }
  };

  useEffect(() => {
    getAllSubscribers();
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Subscriber List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subscriber.map((s, i) => (
            <Subscription
              key={i}
              userImg={userImg}
              userName={s.username}
              planName={s.planName}
              planPrice={s.planPrice}
              durationInDays={s.durationInDays}
              userId={s.userId}
              subscriptionId={s.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriberList;
