import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import { userApi } from "../../../config/api";
import axios from "axios";

const OrderRatingAndReview = () => {
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [starss, setStars] = useState(0);
  const [review, setReview] = useState('');
  
  const location = useLocation();
  const data = location?.state?.data


  
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
        let newData={
            ...data,stars:rating,review
        }
        console.log(newData,"new data")
      const response = await axios.post(`${userApi}ratingAndReview`, {newData});
     
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/userProfile")
        setStars(0);
        setReview('');
    } else {
 
      toast.error(response.data.message);
    }
      
    } catch (error) {
      console.error(error.message,"errrorrrrrrr");
      alert('Error saving rating');
    }
  };
  


  const handleStarClick = (starValue) => {
    setRating(starValue);
    setStars(starValue);
  };
  const handleStarHover = (starValue) => {
    setHoveredRating(starValue);
  };
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };



  const stars = [1, 2, 3, 4, 5].map((starValue) => (
    <svg
      key={starValue}
      className={`w-12 h-12 cursor-pointer text-${
        starValue <= (hoveredRating || rating) ? "yellow" : "gray"
      }-500`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      onClick={() => handleStarClick(starValue)}
      onMouseEnter={() => handleStarHover(starValue)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

  return (
    <div>
      <form action="">
      <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div className="px-12 py-5">
              <h2 className="text-gray-800 text-3xl font-semibold">
                Your opinion matters to us!
              </h2>
            </div>
            <div className="bg-gray-200 w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-6 space-y-3">
                <span className="text-lg text-gray-800">
                  How was quality of the call?
                </span>
                <div className="flex space-x-3" onMouseLeave={handleMouseLeave}>
                  {stars}
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <textarea
                value={review} 
                onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="p-4 text-gray-500 rounded-xl resize-none"
                >
                  Text
                </textarea>
                <button onClick={handleRatingSubmit} className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                  Rate now
                </button>
              </div>
            </div>
            <div className="h-20 flex items-center justify-center">
              <a href="#" className="text-gray-600">
                Maybe later
              </a>
            </div>
          </div>

        </div>
      </div>
      </form>
    </div>
  );
};

export default OrderRatingAndReview;