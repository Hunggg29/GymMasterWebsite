import React, { useState } from 'react';
import { useAuth } from '../../context/auth'
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';

const ExtendPlan = ({ isOpen, onClose, onSubmit, planData = {} }) => {
  const { auth } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  if (!isOpen) return null; // Ẩn nếu không mở modal
    console.log('plandata nè',planData)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!auth?.user?.id || !planData?.id) {
      toast.error('Missing required information');
      return;
    }

    const dataToSubmit = {
     
      id: planData.id,
     autoRenew:true
      
    };

    onSubmit(dataToSubmit);
    onClose(); // Đóng modal sau khi submit
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full flex flex-col gap-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center">Payment</h2>

        <div className="flex flex-col gap-4 text-lg">
          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">User Name:</span>
            <span className="text-gray-900">{auth?.user?.username || 'N/A'}</span>
          </div>

          <div className="flex justify-between border-b-2 pb-2">
            <span className="font-semibold text-gray-700">Amount:</span>
            <input
              type="number"
              className="border rounded px-2 py-1 w-32 text-right"
              value={planData.paymentAmount || ''}
              readOnly
            />
          </div>

          <div className="flex justify-between border-b-2 pb-2 items-center">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <select
              className="border rounded px-2 py-1 w-40"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
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

          {planData.startDate && planData.endDate && (
            <div className="flex justify-between border-b-2 pb-2">
              <span className="font-semibold text-gray-700">Subscription Period:</span>
              <span className="text-gray-900">
                {dayjs(planData.startDate).format('YYYY-MM-DD')} to{' '}
                {dayjs(planData.endDate).format('YYYY-MM-DD')}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded-full px-10 py-3 shadow-lg"
          >
            Confirm Extend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendPlan;
