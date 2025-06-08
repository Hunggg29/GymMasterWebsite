import { useState, useEffect } from 'react';
import { Heading, User, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
import EditUserModal from '../../components/modal/EditUserModal';
import { useAuth } from '../../context/auth';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const { auth } = useAuth();

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
      setLoading(false); 
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting all users || internet issue");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditClick = (user) => {
    setCurrentUserData(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setCurrentUserData(null);
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await axios.put(`${BASE_URL}/api/users/${updatedData.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      });
      // If the above line doesn't throw, it's a success
      toast.success('User updated successfully');
      getAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || `Error updating user: ${error.response.status}`);
      } else {
        toast.error('An unexpected error occurred during update.');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      // If the above line doesn't throw, it's a success (e.g., 204 No Content)
      toast.success('User deleted successfully');
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || `Error deleting user: ${error.response.status}`);
      } else {
        toast.error('An unexpected error occurred during deletion.');
      }
    }
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      <section className=' pt-10 bg-gray-900'>
         <div className="px-6">
           <div className="flex justify-end mb-4"></div>
         </div>
        {/* User List */}
         <div>
            <Heading name="Staff List" />
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((u, i) => (u.role === "staff" &&
                <User 
                  key={i} 
                  id={u.id} 
                  fullname={u.fullName} 
                  userImg={userImg} 
                  name={u.username} 
                  email={u.email} 
                  contact={u.phone} 
                  role={u.role} 
                  onEditClick={() => handleEditClick(u)}
                />
              ))}
            </div>
          </div>
         </div>
      </section>
      {showEditModal && currentUserData && (
        <EditUserModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          userData={currentUserData}
          onSave={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  )
}

export default UserList;