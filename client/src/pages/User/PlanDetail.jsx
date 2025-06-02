import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { format } from 'date-fns';
import { CalendarPlus, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import ExtendPlan from '../../components/modal/ExtendPlan'
const PlanDetail = () => {
  const { auth } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal,setShowModal]=useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null);
  const handleExtend = async (plan) => {
        setShowModal(true);
      setSelectedPlan(plan);
      
      }
    
  const handleSave=async(data) =>{
    try{
       const res=await axios.put(`${BASE_URL}/api/Subscription/toggle-auto-renew`,data)
       if(res){
         const response = await axios.get(
        `${BASE_URL}/api/Users/${auth.user.id}/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );

      setSubscriptions(response.data);
       }
    }catch(error)
    {
      console.log(error)
    }
  }

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/Users/${auth.user.id}/subscriptions`,
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

  useEffect(() => {
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading name="Your Subscription Plans" />
          <p className="text-gray-400 text-lg mt-2">View your subscription details</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subscriptions.map((subscription) => {
            const endDateCurrent=new Date(subscription.endDate)
            endDateCurrent.setDate(endDateCurrent.getDate() + subscription.durationInDays);
            const endDateNew=format(endDateCurrent, 'MMM dd, yyyy');
            return(
            <div 
              key={subscription.id} 
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              {/* Plan Image */}
              <div className="h-48">
                <img 
                  src={subscription.planImageUrl || '/default-plan-image.jpg'} 
                  alt={subscription.planname}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Plan Details */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {subscription.planname}
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

                {/* Extend Plan Button */}
               { !subscription.autoRenew ?(<div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleExtend(subscription)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium 
                      bg-gradient-to-r from-emerald-500 to-teal-500 
                      hover:from-emerald-600 hover:to-teal-600 
                      text-white shadow-lg hover:shadow-xl 
                      transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <CalendarPlus size={18} />
                    Extend Plan
                  </button>
                </div>):(<div className="mt-6 flex justify-end">
                  <button
                    disabled
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium 
                      bg-gradient-to-r from-green-600/40 to-emerald-600/40
                      text-emerald-300 border border-emerald-500/30
                      cursor-default"
                  >
                    <Check size={18} className="text-emerald-400" />
                    Extended
                  </button>
                </div>)}
                 {subscription.autoRenew && (
                <div className="mt-3 flex justify-end">
                  <div className="px-3 py-2 bg-gray-700/50 rounded-md border border-emerald-500/20 inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-sm">Expected: </span>
                    <span className="text-emerald-400 text-sm font-medium">{endDateNew}</span>
                  </div>
                </div>
              )}
              </div>
            </div>
          )}
          )}
        </div>
      </div>
       {showModal && selectedPlan &&  (<ExtendPlan isOpen={showModal}
                    onClose={()=>setShowModal(false)}
                    planData={selectedPlan}
                    onSubmit={(dataToSubmit)=>handleSave(dataToSubmit)}
                    />)}
    </section>
  );
};

export default PlanDetail;


