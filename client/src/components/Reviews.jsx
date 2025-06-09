import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { review1, review2, review3 } from '../images';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      review: "Amazing gym with top-notch equipment and trainers. The atmosphere is motivating and the community is supportive.",
      rating: 5,
      image: review1
    },
    {
      name: "Mike Thompson",
      role: "Professional Athlete",
      review: "Best gym I've ever been to. The trainers are knowledgeable and the facilities are always clean.",
      rating: 5,
      image: review2
    },
    {
      name: "Emily Davis",
      role: "Yoga Practitioner",
      review: "Great variety of classes and excellent instructors. The yoga sessions are particularly amazing.",
      rating: 4,
      image: review3
    }
  ];

  return (
    <div className="h-full">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Client Reviews</h3>
        <p className="text-gray-400">What our members say about us</p>
      </div>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[Pagination, Autoplay, EffectCards]}
        className="h-[400px]"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 p-6 rounded-xl h-full flex flex-col">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-indigo-500">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white font-semibold text-xl mb-1">{review.name}</h4>
                <p className="text-indigo-400 mb-2">{review.role}</p>
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-500 mx-1"></i>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-300 text-lg text-center italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;




