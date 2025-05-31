import { useState, useEffect } from 'react';
import { Heading, UserStaff, Loader,Member } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
 import { useAuth } from "../../context/auth";
const MemberList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(true);
  const [trainer, settrainer] = useState(true);
  const [showModal,setShowModal]=useState(false);
 const [selectedUserPlans, setSelectedUserPlans] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
const { auth, setAuth } = useAuth();
  const getAllUsers = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer/${id}/users`);
      console.log(res.data)
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
    getAllUsers(auth.user.id);
  }, [auth]);

const handleDelete= async () =>{
  const res = await axios.get(`${BASE_URL}/api/users`);
  setUsers(Array.isArray(res.data) ? res.data : []);
}
  if(loading){
    return <Loader/>
  }
  const handleClick=async(id)=>{
    setShowModal(true)
  }

  return (
    <div>
        
      <section className=' pt-10 bg-gray-900'>
        
       
         <div>
            <Heading name="Member  List" />
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((u, i) => ( 
                
                  <Member  id={u.id} fullname={u.fullName} userImg={userImg} name={u.username} email={u.email} contact={u.phone} role={u.role}  i={i} key={i}/>
               
              )
               
            
              )}
            </div>
          </div>
         </div>
        
        
        
      </section>
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Gói tập của: {selectedUserId}</h2>
            {selectedUserPlans.length > 0 ? (
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {selectedUserPlans.map((plan, index) => (
                  <li key={index} className="border p-3 rounded">
                    <p><strong>Tên gói:</strong> {plan.name}</p>
                    <p><strong>Giá:</strong> ${plan.price}</p>
                    <p><strong>Thời hạn:</strong> {plan.durationInDays} ngày</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có gói tập nào.</p>
            )}
            <div className="mt-4 text-right">
              <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default MemberList;