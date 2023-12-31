import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ReadReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/review/get`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setReviews(data);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} className={`w-4 h-4 text-${i < rating ? 'yellow-300' : 'gray-300'} dark:text-${i < rating ? 'yellow-300' : 'gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading reviews</div>}
      {!loading && !error && reviews.map((review, index) => (
        <div key={index} className="bg-white p-6 shadow rounded-lg my-6">
          <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900">{review.property?.name}</h2>
          <p className="text-gray-600">{review.property?.city}, {review.property?.state}, {review.property?.country}</p>
            <div className="flex flex-col mt-2">
            <p className="text-gray-500">Zip: {review.property?.zip}</p>
            <p className="text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
          
              <div className='review-rating flex'>
                <p className="mr-2">Health and Safety:</p>
                {renderStars(review.ratings.healthAndSafety)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">repair:</p>
                {renderStars(review.ratings.repair)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">depositReturnChances:</p>
                {renderStars(review.ratings.depositReturnChances)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">overallCleanliness:</p>
                {renderStars(review.ratings.overallCleanliness)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">noiseLevel:</p>
                {renderStars(review.ratings.noiseLevel)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">maintenanceResponse:</p>
                {renderStars(review.ratings.maintenanceResponse)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">security:</p>
                {renderStars(review.ratings.security)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">amenities:</p>
                {renderStars(review.ratings.amenities)}
              </div>
              <div className='review-rating flex'>
                <p className="mr-2">managementResponsiveness:</p>
                {renderStars(review.ratings.managementResponsiveness)}
              </div>
              
            </div>


           

          </div>
          <div className="mt-6">
            <p className='text-black-900'>Written Review</p>
            <p className="text-gray-700">{review.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadReview;
