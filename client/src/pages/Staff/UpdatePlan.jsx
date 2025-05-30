import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from "../../components";
import { BASE_URL } from '../../utils/fetchData';

const UpdatePlanStaff = () => {
  const navigate = useNavigate();
  const { planid } = useParams();
  const [name, setName] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [durationInDays, setDurationInDays] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const id = planid
 

  useEffect(() => {
    const getSinglePlan = async () => { 
      try {
        console.log('id plan la',id)
        const res = await axios.get(`${BASE_URL}/api/plan/${id}`);
          console.log('ap ta ve',res.data)
        if (res.data ) {
          const plan = res.data;
          setName(plan.name);
          setDescription(plan.description);
          setPrice(plan.price);
          setDurationInDays(plan.durationInDays);
          setImageUrl(plan.imageUrl);
          setMaxMembers(plan.maxMembers);
          setPreviewImage(plan.imageUrl);
          console.log("Plan data received:", plan);
        }
      }
      catch (err) {
        console.log("Error fetching plan:", err);
        toast.error("Something went wrong while getting plan details");
      }
    }
    getSinglePlan();
  }, [planid]);

  const handleImageChange = (e) => {
    const file = e.target.value;
    setImageUrl(file);
    setPreviewImage(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BASE_URL}/api/plan/${id}`, {
        name,
        description,
        price,
        durationInDays,
        imageUrl,
        maxMembers,
        planType: 'Standard'
      });

      if (res.data && res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/staff/plans");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating plan");
    }
  }

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this plan?");
      if (!answer) return;
      const { data } = await axios.delete(`${BASE_URL}/api/plan/${id}`);
      if (data?.success) {
        toast.success(`Plan deleted successfully`);
        navigate("/dashboard/staff/plans");
      }
      else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting plan")
    }
  }

  return (
    <section className='py-80 bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={handleUpdate}>
          <h2 className='text-center text-4xl text-white font-bold'>Update Plan</h2>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Plan Name</label>
            <Input
              type="text"
              placeholder="Enter plan name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Plan Description</label>
            <textarea
              placeholder={description || "Enter plan description"}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              required
              rows={4}
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Price</label>
            <Input
              type="number"
              placeholder={price || "Enter price"}
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Duration (Days)</label>
            <Input
              type="number"
              placeholder={durationInDays || "Enter duration in days"}
              name="durationInDays"
              value={durationInDays}
              onChange={(e) => setDurationInDays(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Max Members</label>
            <Input
              type="number"
              placeholder={maxMembers || "Enter maximum number of members (Optional)"}
              name="maxMembers"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              min="0"
            />
          </div>

          <div className="flex flex-col w-full sm:max-w-[750px]">
            <label className="text-white text-sm font-bold mb-1">Image URL</label>
            <Input
              type="url"
              placeholder={imageUrl || "Enter image URL"}
              name="imageUrl"
              value={imageUrl}
              onChange={handleImageChange}
              required
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Plan Preview"
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          <button type='submit' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'>
            Update
          </button>

          <button type='button' className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]' onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </section>
  )
}

export default UpdatePlanStaff;
