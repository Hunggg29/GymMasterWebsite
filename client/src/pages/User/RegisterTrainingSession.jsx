import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Dumbbell, CheckCircle, AlertCircle } from 'lucide-react';

const RegisterTrainingSession = () => {
  const [trainers, setTrainers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        console.log('Fetching trainers from:', 'http://localhost:5242/api/trainer');
        const response = await fetch('http://localhost:5242/api/trainer');
        console.log('Trainers response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Trainers data:', data);
          // Include user information for each trainer
          const trainersWithUserInfo = await Promise.all(
            data.map(async (trainer) => {
              const userResponse = await fetch(`http://localhost:5242/api/users/${trainer.userId}`);
              if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                  ...trainer,
                  name: userData.fullName || userData.username,
                  specialty: trainer.specialty,
                  experience: trainer.experience,
                  pricePerHour: trainer.pricePerHour
                };
              }
              return trainer;
            })
          );
          setTrainers(trainersWithUserInfo);
        } else {
          const errorText = await response.text();
          console.error('Trainers API error:', response.status, errorText);
          setError(`Could not load trainer list (${response.status})`);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
        setError(`Connection error when loading trainer list: ${error.message}`);
      }
    };

    const fetchRooms = async () => {
      try {
        console.log('Fetching rooms from:', 'http://localhost:5242/api/gymroom');
        const response = await fetch('http://localhost:5242/api/gymroom');
        console.log('Rooms response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Rooms data:', data);
          // Map room data to ensure all required fields exist
          const roomsWithInfo = data.map(room => ({
            ...room,
            roomName: room.roomName || 'Training Room',
            roomType: room.roomType || 'No information',
            roomQuantity: room.roomQuantity || 0
          }));
          setRooms(roomsWithInfo);
        } else {
          const errorText = await response.text();
          console.error('Rooms API error:', response.status, errorText);
          setError(`Could not load training room list (${response.status})`);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(`Connection error when loading training room list: ${error.message}`);
      }
    };

    const loadData = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      await Promise.all([fetchTrainers(), fetchRooms()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!selectedTrainer || !selectedRoom || !startTime || !endTime) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError('End time must be after start time');
      setIsSubmitting(false);
      return;
    }

    try {
      const authData = localStorage.getItem('auth');
      let userId = '1'; // Default value

      if (authData) {
        try {
          const parsedAuthData = JSON.parse(authData);
          if (parsedAuthData && parsedAuthData.user && parsedAuthData.user.id) {
            userId = parsedAuthData.user.id.toString(); // Get user ID from auth data
          }
        } catch (parseError) {
          console.error('Error parsing auth data from localStorage:', parseError);
          // Optionally set an error for the user
        }
      }
      
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);
      
      const requestBody = {
        userId: parseInt(userId),
        trainerId: parseInt(selectedTrainer),
        roomId: parseInt(selectedRoom),
        date: startDateTime.toISOString().split('T')[0],
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        sessionType: sessionType || null,
      };

      console.log('Sending request:', requestBody);

      const response = await fetch('http://localhost:5242/api/trainingsession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess('Training session registration successful!');
        // Reset form
        setSelectedTrainer('');
        setSelectedRoom('');
        setStartTime('');
        setEndTime('');
        setSessionType('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Could not register training session');
      }
    } catch (error) {
      console.error('Error registering training session:', error);
      setError('Connection error when registering training session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Register Training Session
          </h1>
          <p className="text-xl text-gray-300">
            Schedule your training with professional trainers
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          {loading && (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70">Loading data...</p>
            </div>
          )}

          {!loading && (
            <>
              {error && (
                <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-200">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-200">{success}</span>
                </div>
              )}

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <User className="w-5 h-5 text-blue-400" />
                      Select Trainer
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTrainer}
                        onChange={(e) => setSelectedTrainer(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                        required
                      >
                        <option value="" className="bg-gray-800 text-white">Select a trainer...</option>
                        {trainers.map((trainer) => (
                          <option key={trainer.trainerId} value={trainer.trainerId} className="bg-gray-800 text-white">
                            {trainer.name} - {trainer.specialty} ({trainer.experience} years experience)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      Select Room
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none"
                        required
                      >
                        <option value="" className="bg-gray-800 text-white">Select a room...</option>
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id} className="bg-gray-800 text-white">
                            {room.roomName} - {room.roomType} (Capacity: {room.roomQuantity})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-white font-semibold text-lg">
                      <Clock className="w-5 h-5 text-blue-400" />
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-white font-semibold text-lg">
                    <Dumbbell className="w-5 h-5 text-blue-400" />
                    Session Type (Optional)
                  </label>
                  <input
                    type="text"
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    placeholder="Example: Personal Training, Group Training, Yoga..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-5 h-5" />
                        Register Session
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterTrainingSession;