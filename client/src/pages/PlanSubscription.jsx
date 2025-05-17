import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';
import dayjs from 'dayjs';

const PlanSubscription = () => {
  const { planid } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [startDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/api/plan/${planid}`);
        if (res.data) {
          setPlan(res.data);
          // Tính endDate dựa trên durationInDays
          if (res.data.durationInDays) {
            setEndDate(startDate.add(res.data.durationInDays, 'day'));
          }
        }
      } catch (err) {
        toast.error('Failed to fetch plan info');
      }
      setLoading(false);
    };
    fetchPlan();
  }, [planid, startDate]);

  const handleProceedToCheckout = () => {
    navigate('/dashboard/user/payment', {
      state: {
        amount: plan.price,
        planId: plan.id,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      }
    });
  };

  if (loading || !plan) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Plan Subscription</h2>
        <div className="w-full flex flex-col gap-4 text-lg">
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">User Name:</span>
            <span className="text-gray-900">{auth?.user?.username || ''}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">Plan Name:</span>
            <span className="text-gray-900">{plan.name}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">Start Date:</span>
            <span className="text-gray-900">{startDate.format('YYYY-MM-DD')}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">End Date:</span>
            <span className="text-gray-900">{endDate.format('YYYY-MM-DD')}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Price:</span>
            <span className="text-gray-900">{plan.price}$</span>
          </div>
        </div>
        <button
          className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded-full px-10 py-3 shadow-lg transition-colors duration-200"
          onClick={handleProceedToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>      
    </section>
  );
};

export default PlanSubscription;
