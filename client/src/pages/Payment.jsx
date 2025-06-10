import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { BASE_URL } from '../utils/fetchData';

const Payment = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from location state
  const planData = location.state || {};
  const [amount, setAmount] = useState(planData.amount || '');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const userId = auth?.user?.id;

  // Redirect if no plan data
  useEffect(() => {
    if (!location.state?.planId) {
      toast.error('No plan selected');
      navigate('/dashboard/user');
    }
  }, [location.state, navigate]);

  const createSubscription = async (paymentId) => {
    try {
      const subscriptionData = {
        userId: parseInt(userId),
        planId: parseInt(planData.planId),
        startDate: dayjs(planData.startDate).toISOString(),
        endDate: dayjs(planData.endDate).toISOString(),
        paymentId: paymentId,
        isActive: true,
        status: "Active",
        autoRenew: false
      };

      console.log('Creating subscription with data:', subscriptionData);
      const subscriptionRes = await axios.post(`${BASE_URL}/api/subscription`, subscriptionData);
      
      if (subscriptionRes.data) {
        console.log('Subscription created:', subscriptionRes.data);
        return subscriptionRes.data;
      } else {
        throw new Error('No data returned from subscription creation');
      }
    } catch (error) {
      console.error('Subscription creation error:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      toast.error('Please enter all required fields');
      return;
    }
    setShowConfirmDialog(true); // Show confirmation dialog
  };

  const handleConfirmPayment = async () => {
    setShowConfirmDialog(false); // Close confirmation dialog immediately

    try {
      // Create payment first
      const paymentData = {
        userId: parseInt(userId),
        amount: parseFloat(amount),
        paymentMethod,
        notes: `Payment for plan ${planData.planId}`
      };

      console.log('Creating payment with data:', paymentData);
      const paymentRes = await axios.post(`${BASE_URL}/api/payment`, paymentData);
      
      if (paymentRes.data?.success && paymentRes.data?.payment?.id) {
        try {
          // Create subscription with the payment ID
          const subscription = await createSubscription(paymentRes.data.payment.id);
          
          if (subscription) {
            toast.success('Payment and subscription successful!');
            navigate('/dashboard/user');
          } else {
            toast.error('Failed to create subscription: No data returned');
          }
        } catch (subscriptionError) {
          console.error('Subscription error:', subscriptionError);
          const errorMessage = subscriptionError.response?.data?.message || 
                             subscriptionError.response?.data?.error || 
                             'Failed to create subscription';
          toast.error(errorMessage);
        }
      } else {
        const errorMessage = paymentRes.data?.message || 'Payment failed: No success confirmation';
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Payment failed: Server error';
      toast.error(errorMessage);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
  };

  if (!location.state?.planId) {
    return null; // Component will redirect in useEffect
  }

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Payment</h2>
        <div className="flex flex-col gap-4 text-lg">
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">User Name:</span>
            <span className="text-gray-900">{auth?.user?.username || ''}</span>
          </div>
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">Amount:</span>
            <input
              type="number"
              className="border rounded px-2 py-1 w-32 text-right"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min={0}
              step="0.01"
              required
              readOnly={!!planData.amount}
            />
          </div>
          <div className="flex justify-between border-b-2 pb-2 items-center">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <select
              className="border rounded px-2 py-1 w-40"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              required
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">Payment Date:</span>
            <span className="text-gray-900">{dayjs().format('YYYY-MM-DD HH:mm')}</span>
          </div>
          {planData.planId && (
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-semibold text-gray-700">Subscription Period:</span>
              <span className="text-gray-900">
                {dayjs(planData.startDate).format('YYYY-MM-DD')} to {dayjs(planData.endDate).format('YYYY-MM-DD')}
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded-full px-10 py-3 shadow-lg transition-colors duration-200"
        >
          Confirm Payment
        </button>
      </form>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Payment</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to proceed with this payment?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelConfirm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-full shadow-md"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Payment; 