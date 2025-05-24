import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Input } from "../../components";
import { BASE_URL } from '../../utils/fetchData';

const CreatePlan = () => {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError 
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      durationInDays: '',
      imageUrl: '',
      maxMembers: '',
      planType: 'Standard'
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price),
        durationInDays: parseInt(data.durationInDays),
        maxMembers: data.maxMembers ? parseInt(data.maxMembers) : null,
        subscriptions: []
      };

      const res = await axios.post(`${BASE_URL}/api/plan`, formattedData);
      
      if (res.status === 201 || res.status === 200) {
        toast.success("Plan created successfully");
        navigate("/dashboard/admin/plans");
        return;
      }

      toast.error("Failed to create plan");
    } catch (error) {
      console.error("Create plan error:", error);
      
      if (error.response?.data?.errors) {
        // Map backend validation errors to form fields
        Object.entries(error.response.data.errors).forEach(([key, value]) => {
          setError(key.toLowerCase(), {
            type: 'server',
            message: value.join(', ')
          });
        });
      } else {
        toast.error(error.response?.data?.message || "Failed to create plan");
      }
    }
  };

  return (
    <section className='py-60 bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form className='flex w-full h-screen justify-center items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-center text-4xl text-white font-bold'>Create Plan</h2>

          <div className="w-full sm:max-w-[750px]">
            <input
              type="text"
              placeholder="Plan Name"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 100,
                  message: "Name must be less than 100 characters"
                }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full sm:max-w-[750px]">
            <textarea
              placeholder="Description"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 1000,
                  message: "Description must be less than 1000 characters"
                }
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="w-full sm:max-w-[750px]">
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than 0"
                },
                validate: value => !isNaN(value) || "Price must be a number"
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div className="w-full sm:max-w-[750px]">
            <input
              type="number"
              placeholder="Duration in Days"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("durationInDays", {
                required: "Duration is required",
                min: {
                  value: 1,
                  message: "Duration must be at least 1 day"
                },
                max: {
                  value: 3650,
                  message: "Duration cannot exceed 3650 days"
                }
              })}
            />
            {errors.durationInDays && (
              <p className="text-red-500 text-sm mt-1">{errors.durationInDays.message}</p>
            )}
          </div>

          <div className="w-full sm:max-w-[750px]">
            <input
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("imageUrl", {
                required: "Image URL is required",
                maxLength: {
                  value: 2048,
                  message: "Image URL must be less than 2048 characters"
                }
              })}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          <div className="w-full sm:max-w-[750px]">
            <input
              type="number"
              placeholder="Maximum Members (optional)"
              className="w-full px-4 py-3 rounded-md border-none outline-none bg-white placeholder:text-gray-600 placeholder:font-bold font-medium text-black"
              {...register("maxMembers", {
                min: {
                  value: 0,
                  message: "Max members must be at least 0"
                },
                max: {
                  value: 100,
                  message: "Max members cannot exceed 100"
                }
              })}
            />
            {errors.maxMembers && (
              <p className="text-red-500 text-sm mt-1">{errors.maxMembers.message}</p>
            )}
          </div>

          <button 
            type='submit' 
            className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'
          >
            Create Plan
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePlan;
