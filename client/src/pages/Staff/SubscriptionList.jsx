import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SubscriptionList = () => {
  const { auth } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extend,setExtend]=useState({})
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const location=useLocation();
  const id=new URLSearchParams(location.search).get('id')
  let name="";
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/Users/${id}/subscriptions`,
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
  const handleToggle=async (id)=>{
           setExtend(prev=>({
            ...prev,
            [id]:!prev[id]
           }))
           try{
            const res=await axios.put(`${BASE_URL}/api/Subscription/toggle-auto-renew`,{
              id,
              autoRenew:!extend[id]
            })
           }catch(error){
            console.log(error)
           }

  }
  useEffect(() => {
  const updateExpiredSubscriptions = async () => {
    const initialExtend = {};
    for (const sub of subscriptions) {
         initialExtend[sub.id] = sub.autoRenew;
      const endDate = new Date(sub.endDate);
      if (Date.now() > endDate.getTime()&&sub.autoRenew) {
        await updateEndDate(sub);
      }
    }
      setExtend(initialExtend);
  };

  if (subscriptions.length > 0) {
    updateExpiredSubscriptions();
  }
}, [subscriptions]);
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
console.log(subscriptions)
const updateEndDate = async (subscription) => {
  const endDate = new Date(subscription.endDate);
  if (Date.now() < endDate.getTime()) return;

  try {
    await axios.put(`${BASE_URL}/api/Subscription/${subscription.id}`, null, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  } catch (err) {
    console.error("Update end date failed", err);
  }
};
const handleDeleteClick = (subscription) => {
  setSubscriptionToDelete(subscription);
  setShowConfirmModal(true);
};

const handleConfirmDelete = async () => {
  if (!subscriptionToDelete) return;

  try {
    const res = await axios.delete(`${BASE_URL}/api/Subscription/${subscriptionToDelete.id}`);
    if (res) {
      toast.success('Subscription deleted successfully!');
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/Users/${id}/subscriptions`,
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
        toast.error('Failed to refresh subscription list');
      } finally {
        setLoading(false);
      }
    }
  } catch (error) {
    console.log(error);
    toast.error('Failed to delete subscription. Please try again.');
  } finally {
    setShowConfirmModal(false);
    setSubscriptionToDelete(null);
  }
};

const ConfirmationModal = () => {
  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-white mb-2">Delete Subscription</h3>
          <p className="text-sm text-gray-400 mb-4">
            Are you sure you want to delete this subscription? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
         <Heading name=" User's Subscribed Plans "/>
          <p className="text-gray-400 text-lg mt-2">View {subscriptions?.[0]?.username} subscription details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subscriptions.map((subscription) =>{ 
           const id=subscription.id
            const endDateCurrent=new Date(subscription.endDate)
            endDateCurrent.setDate(endDateCurrent.getDate() + subscription.durationInDays);
             const endDateNew=format(endDateCurrent, 'MMM dd, yyyy');
             
            return(
            <div 
              key={subscription.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Plan Image */}
              <div className="h-56">
                <img 
                  src={subscription.planImageUrl|| '/default-plan-image.jpg'} 
                  alt={subscription.planName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Plan Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {subscription.planName}
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

                <div className="space-y-3 text-gray-300 flex-1">
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
                    <span>{format(new Date(subscription.paymentDate), 'MMM dd, yyyy')}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Amount Paid:</span>
                    <span>${subscription.paymentAmount}</span>
                  </div>

                  <div className="flex justify-between pb-2">
                    <span className="text-gray-400">Payment Status:</span>
                    <span className={`${
                      subscription.paymentStatus === 'Completed' 
                        ? 'text-green-400' 
                        : 'text-yellow-400'
                    }`}>
                      {subscription.paymentStatus}
                    </span>
                  </div>
                </div>
                
                <div className="pt-6 flex justify-center gap-4">
                  <div className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 p-0.5 rounded-lg shadow-lg transition-all duration-200 group hover:scale-[1.02]">
                    <label className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 rounded-lg cursor-pointer">
                      <span className="text-white font-medium">Gia hạn</span>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={extend[subscription.id]}
                          onChange={() => handleToggle(subscription.id)}
                        />
                        <div className="relative w-12 h-6 bg-gray-600 rounded-full transition-colors duration-300 peer-checked:bg-emerald-400">
                          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-300 ${extend[subscription.id] ? 'translate-x-6' : 'translate-x-0'}`}>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={() => handleDeleteClick(subscription)}
                  >
                    Delete
                  </button>
                </div>
                {extend[subscription.id] && (
                  <div className="mt-3 px-3 py-2 bg-gray-700/50 rounded-md border border-emerald-500/20 inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-sm">Expected: </span>
                    <span className="text-emerald-400 text-sm font-medium">{endDateNew}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          )}
        </div>
      </div>
      <ConfirmationModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
};

export default SubscriptionList;


