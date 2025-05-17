import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { format } from 'date-fns';

const PlanDetail = () => {
  const { auth } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/subscription/my-subscriptions`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );

        setSubscriptions(response.data);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchSubscriptions();
    }
  }, [auth.token]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!subscriptions.length) {
    return (
      <div className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-white text-xl">
            You don't have any active subscriptions.
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading name="Your Subscription Plans" />
          <p className="text-gray-400 text-lg mt-2">View your subscription details</p>
        </div>

        <div className="grid gap-8">
          {subscriptions.map((subscription) => (
            <div 
              key={subscription.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                {/* Plan Image */}
                <div className="md:w-1/3">
                  <img 
                    src={subscription.plan.imageUrl || '/default-plan-image.jpg'} 
                    alt={subscription.plan.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Plan Details */}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {subscription.plan.name}
                    </h3>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        subscription.isActive 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {subscription.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Start Date:</span>
                      <span>{format(new Date(subscription.startDate), 'MMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">End Date:</span>
                      <span>{format(new Date(subscription.endDate), 'MMM dd, yyyy')}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Payment Date:</span>
                      <span>{format(new Date(subscription.payment.paymentDate), 'MMM dd, yyyy')}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Amount Paid:</span>
                      <span>${subscription.payment.amount}</span>
                    </div>

                    <div className="flex justify-between pb-2">
                      <span className="text-gray-400">Payment Status:</span>
                      <span className={`${
                        subscription.payment.status === 'Completed' 
                          ? 'text-green-400' 
                          : 'text-yellow-400'
                      }`}>
                        {subscription.payment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanDetail;


