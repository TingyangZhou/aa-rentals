import * as reviewsActions from '../../store/reviews';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal';
import ConfirmDeleteReviewModal from './ConfirmDeleteReviewModal.jsx'
import './Reviews.css'


function Reviews({ spotId, avgRating, numReviews, ownerId }){
    const dispatch = useDispatch();
    const [ errors, setErrors ] = useState({});
 
    const [isNotOwner, setIsNotOwner] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    

    // console.log('\nsessionUser.id:', sessionUser?.id)
    // console.log('\nisNotOwner:', isNotOwner)
 
    const fetchedReviews = useSelector(state => state.reviews);
   
    const reviewArr =((Object.values(fetchedReviews)).filter(review => {
        return review?.spotId === +spotId;
    }).sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt)));
    const hasReview =(reviewArr.length !== 0);
  
    let hasPostedReview = false;
    if (reviewArr.length > 0){
        hasPostedReview = reviewArr.some(review => review?.userId === sessionUser?.id);
    }
        // console.log('reviewArr:', reviewArr);

    useEffect(()=>{
        if (sessionUser)  setIsNotOwner(sessionUser?.id !== ownerId);

    },[sessionUser, ownerId])


    useEffect(()=>{
        setErrors({});
        const fetchReviews = async () =>{
            try {
                dispatch(reviewsActions.fetchReviews(spotId));
            } catch(error){
                setErrors(error)
            }
        }

        fetchReviews();
    }, [dispatch, spotId])

    return(
        <div className='reviews-container'>
              {errors?.message && <p className='hint'>{errors.message}</p>}
            <br></br>
            <div data-testid='reviews-heading' className='avgRating-wrapper'>
                <h2 data-testid='review-count' className='review-rating'>
                    <span> &#9733; </span> 
                    {avgRating ? Number(avgRating).toFixed(1) : "New"} {numReviews === 0 
                    ? '' 
                    : ` ·  ${numReviews} ${numReviews > 1 ? 'reviews' : 'review'}`}
                                    
                </h2>
            </div>
           

        {sessionUser !== null && isNotOwner && !hasPostedReview && 
        <OpenModalButton
            data-testid='review-button'
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal spotId={spotId}/>}
            
            />
        }            
                
        {!hasReview ? (
        sessionUser !== null && isNotOwner && <p>Be the first to post a review!</p>
        ) : (
        <ul data-testid='review-list' className="reviews-wrapper">
            {reviewArr.map((review) => (
            <li data-testid='review-item' className="review" key={review?.id}>
                <h3 className="reviewer-first-name">{review?.User?.firstName}</h3>
                <h4 data-testid='review-date' className="review-date">
                    {new Date(review?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                })}
                </h4>
                <p data-testid='review-text'>{review.review}</p>
                {sessionUser !==null 
                  && sessionUser.id === review.userId 
                  && <OpenModalButton
                  data-testid='review-button'
                  buttonText="Delete"
                  modalComponent={<ConfirmDeleteReviewModal reviewId={review?.id}/>}
            />}
            </li>
            ))}
        </ul>
        )}
        </div>
    )
}

export default Reviews;