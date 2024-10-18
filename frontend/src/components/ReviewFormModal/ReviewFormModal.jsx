//frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as reviewsActions from '../../store/reviews';
import './ReviewFormModal.css'


function ReviewFormModal({spotId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [errors, setErrors] = useState({});

   
    console.log('\nspotId:', spotId)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newReview = { review, stars: rating };
    
    // Dispatch the action and handle the result or errors
    dispatch(reviewsActions.writeReview(newReview, spotId))
        .then(closeModal) // Close the modal on success
        .catch((error) => { // Handle any errors from the dispatch
            if (error.errors) {
                setErrors(error.errors);
            } else if (error.message) {
                setErrors({ message: error.message });
            }
        });
};
//end submit
    
    
    const validationErrors = {};

   const handleReviewChange = (e) =>{
        setReview(e.target.value)
        if (review.trim().length < 10) {
            validationErrors.review ='The review should be at least 10 characters long.'
            console.log(validationErrors.review)
        }
        if (!rating || rating < 1) {
            validationErrors.stars = 'The star rating should be at least one star.'
        }

        setErrors(validationErrors);
   }


    const handleStarClick =(rating) =>{
        
        setRating(rating);
       
        if (!rating || rating < 1) {
            validationErrors.stars= 'The star rating should be at least one star.'
        }

        setErrors(validationErrors);
    }

    const StarIcon = ({ filled, onClick }) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={filled ? "#FFD700" : "none"}  // Gold color for filled stars
          stroke="#FFD700"  // Gold color for the border
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={onClick} // Correctly pass onClick to make the stars interactive
          style={{ cursor: 'pointer' }} // Ensures stars are clickable
        >
          <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17 5.5 21 7 14 2 9.3 9 8.5 12 2" />
        </svg>
      );
      

    return (
        <form onSubmit ={handleSubmit} className='review-form'>
            <h1>How was your stay?</h1>
            {errors?.message && <p className='hint'>{errors?.message}</p>}
            {errors?.review && <p className='hint'>{errors?.review}</p>}
            <textarea 
                className='review-text'
                placeholder='Leave your review here...'
                onChange={handleReviewChange}
                value={review}
            />
           
           {errors?.stars && <p className='hint'>{errors?.stars}</p>}
            <div className='reviewStars' style={{ display: 'flex' }}>
               
                {[...Array(5)].map((_, index) => (
                        <StarIcon 
                            key={index} 
                            onClick={() => handleStarClick(index + 1)}
                            style={{cursor:'pointer'}}
                            filled = {index < rating}
                        />
                    
                    ))//end map
                    }
                    <span> Stars</span>
                         
            </div>
            
            
        
            <button 
                className='submit-review-button'
                disabled = {review.trim().length < 10 || rating < 1}
                >
                Submit Your Review
            </button>
        </form>
    )
}

export default ReviewFormModal;