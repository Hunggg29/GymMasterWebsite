import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { format, differenceInDays } from 'date-fns';
import { CalendarPlus, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import ExtendPlan from '../../components/modal/ExtendPlan';

const PlanDetail = () => {
  const { auth } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleExtend = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/Subscription/toggle-auto-renew`, data);
      if (res) {
        await fetchSubscriptions();
        toast.success("Plan extended successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to extend plan");
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/Users/${auth.user.id}/subscriptions`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
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

  useEffect(() => {
    if (auth.token) {
      fetchSubscriptions();
    }
  }, [auth.token]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!subscriptions.length) {
    return (
      <div className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white text-xl">
          You don't have any active subscriptions.
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading name="Your Subscription Plans" />
          <p className="text-gray-400 text-lg mt-2">View your subscription details</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subscriptions.map((subscription) => {
            const {
              id,
              planname,
              planImageUrl,
              startDate,
              endDate,
              paymentDate,
              paymentAmount,
              paymentStatus,
              isActive,
              autoRenew,
              durationInDays,
            } = subscription;

            const start = new Date(startDate);
            const end = new Date(endDate);
            const actualEnd = new Date(end);
            if (autoRenew) {
              actualEnd.setDate(actualEnd.getDate() + durationInDays);
            }
            const today = new Date();
            const remainingDays = differenceInDays(actualEnd, today);
            const formattedEnd = format(actualEnd, 'MMM dd, yyyy');

            return (
              <div
                key={id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <div className="h-48">
                  <img
                    src={planImageUrl || '/default-plan-image.jpg'}
                    alt={planname}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{planname}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        isActive
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="space-y-3 text-gray-300 flex-1">
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Start Date:</span>
                      <span>{format(new Date(startDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">End Date:</span>
                      <span>{format(new Date(endDate), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Payment Date:</span>
                      <span>{paymentDate ? format(new Date(paymentDate), 'MMM dd, yyyy') : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-700 pb-2">
                      <span className="text-gray-400">Amount Paid:</span>
                      <span>${paymentAmount || '0.00'}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-400">Payment Status:</span>
                      <span
                        className={
                          paymentStatus === 'Completed'
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }
                      >
                        {paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center flex-wrap gap-2">
                    {remainingDays >= 0 && (
                      <div className="px-3 py-2 bg-gray-700/50 rounded-md border border-gray-700 inline-flex items-center gap-2">
                        <CalendarPlus size={16} className="text-gray-400" />
                        <span className="text-gray-400 text-sm">Remaining days:</span>
                        <span className="text-white text-sm font-medium">{remainingDays}</span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      {autoRenew ? (
                        <button
                          disabled
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium bg-gradient-to-r from-green-600/40 to-emerald-600/40 text-emerald-300 border border-emerald-500/30 cursor-default"
                        >
                          <Check size={18} className="text-emerald-400" />
                          Extended
                        </button>
                      ) : (
                        <button
                          onClick={() => handleExtend(subscription)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          <CalendarPlus size={18} />
                          Extend Plan
                        </button>
                      )}
                    </div>
                  </div>

                  {autoRenew && (
                    <div className="mt-3 flex justify-end">
                      <div className="px-3 py-2 bg-gray-700/50 rounded-md border border-emerald-500/20 inline-flex items-center gap-2">
                        <CalendarPlus size={16} className="text-emerald-400" />
                        <span className="text-gray-400 text-sm">Expected:</span>
                        <span className="text-emerald-400 text-sm font-medium">{formattedEnd}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && selectedPlan && (
        <ExtendPlan
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          planData={selectedPlan}
          onSubmit={(data) => handleSave(data)}
        />
      )}
    </section>
  );
};

export default PlanDetail;
