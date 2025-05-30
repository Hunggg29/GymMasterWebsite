import React, {useState, useEffect} from 'react';
import {toast} from "react-hot-toast";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Plan from "../../components/staff/Plan";
import { BASE_URL } from '../../utils/fetchData';
import { Loader, Heading } from '../../components';
const PlansStaff = () => {
const [plans, setplans] = useState([]);
const [loading, setLoading] = useState(false);
console.log(plans);

const {pid} = useParams();
console.log(plans);
   //  handle get Plans
   const getAllPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/plan`);
      setplans(Array.isArray(res.data) ? res.data : []);
      setLoading(false); 
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false); 
    }
  }

  useEffect(() => {
    getAllPlans();
  }, []);

  if(loading){
    return <Loader/>
  }

return (
  <section className='bg-gray-900 pt-10'>
      <Heading name="Plans List"/>
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {plans.length > 0 && plans.map((p, i) => (
         <Plan  planName={p.name} price={p.price} duration={p.durationInDays} p_id={p.id} key={i} planImage={p.imageUrl}/>
        ))}
      </div>
    </div>
  </section>
)

}

export default PlansStaff;