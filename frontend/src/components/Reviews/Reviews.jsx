import * as reviewsActions from '../../store/reviews';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../ReviewFormModal';
import './Reviews.css'


function Reviews({ spotId, avgRating, numReviews, isLoaded, ownerId }){
    const dispatch = useDispatch();
    const [ errors, setErrors ] = useState({});

    
    const sessionUser = useSelector(state => state.session.user);
    let isNotOwner = (sessionUser?.id !== ownerId)

    // console.log('\nsessionUser.id:', sessionUser.id)
    // console.log('\nisNotOwner:', isNotOwner)
 
    const reviews = useSelector(state => state.reviews);
    const allReviews = Object.values(reviews);
    const reviewArr = allReviews.filter(review => {
        return review?.spotId === +spotId;
    }).sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt))

    let hasReview = (reviewArr.length !== 0)

//check if the session user has posted review yet for the current spot
    let reviewUserIdArr = reviewArr.map(review => review.User.id);
    // console.log('reviewUserIdArr:', reviewUserIdArr)
    let hasPostedReview = reviewUserIdArr.includes(sessionUser?.id)
    console.log('hasPostedReview:', hasPostedReview)

    
    // console.log('reviewArr:', reviewArr);
  
    
    useEffect(()=>{
        setErrors({});
        const fetchReviews = async () =>{
            try {
                await dispatch(reviewsActions.fetchReviews(spotId));
            } catch(error){
                setErrors(error)
            }
        }

        fetchReviews();
    }, [dispatch, spotId])

    return(
        <div className='reviews-container'>
            <br></br>
            <div className='avgRating-wrapper'>
                <h2 className='review-rating'>
                    <span> &#9733; </span> 
                    {avgRating ? avgRating.toFixed(1) : "New"} {numReviews === 0 
                    ? '' 
                    : ` ·  ${numReviews} ${numReviews > 1 ? 'reviews' : 'review'}`}
                                    
                </h2>
            </div>
           

        {sessionUser !== null && isNotOwner && !hasPostedReview && 
            <OpenModalButton
                
                buttonText="Post Your Review"
                modalComponent={<ReviewFormModal />}
                
              />
            }            
                
        {!hasReview ? (
        sessionUser !== null && isNotOwner && <p>Be the first to post a review!</p>
        ) : (
        <ul className="reviews-wrapper">
            {reviewArr.map((review) => (
            <li className="review" key={review?.id}>
                <h3 className="reviewer-first-name">{review?.User.firstName}</h3>
                <h4 className="review-date">
                {new Date(review?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                })}
                </h4>
                <p>{review.review}</p>
            </li>
            ))}
        </ul>
        )}
        </div>
    )
}

export default Reviews;