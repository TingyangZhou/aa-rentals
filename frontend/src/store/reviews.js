import { csrfFetch } from "./csrf";

/** Action Type Constants: */
const LOAD_REVIEWS = "spots/LOAD_REVIEWS";
const ADD_REVIEW = 'spots/ADD_REVIEW'
const REMOVE_REVIEW = 'spots/REMOVE_REVIEW,'


/**  Action Creators: */
const loadReviews = (reviews) => {
    return {
      type: LOAD_REVIEWS,
      payload: reviews
    };
  };

  const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        payload: review
    }
  }

  const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewId
    }
  }


/** Thunk Action Creators: */

// Fetch all reviews
export const fetchReviews = (spotId) => async(dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if(res.ok){
        // console.log('fetching!!!')
        const reviews = await res.json();
        dispatch(loadReviews(reviews.Reviews)); //This should give an array
        // console.log('\nfetchedReviews:', reviews)
    } else{
        const error = await res.json();
        throw new Error(error);
    }

}


// Add review

export const writeReview = (review, spotId) => async(dispatch) => {
    try{
       
        const res = await csrfFetch (`/api/spots/${spotId}/reviews`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        const newReview = await res.json();
        dispatch(addReview(newReview));

    } catch(res){
        const error = await res.json();
        throw error;
    }
    
}


//Delete review
export const deleteReview = (reviewId) => async(dispatch) =>{

 const res = await csrfFetch(` /api/reviews/${reviewId}`,
    {method: 'DELETE'}
    );
    
    dispatch(removeReview(reviewId))
    return res;
    
}



/** Reducer: */

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case(LOAD_REVIEWS):{
            const reviews = action.payload;
            let newState = {...state};
            reviews.forEach(review => {
                newState[review.id] =review;
            })
            return newState;            
        }
        case(ADD_REVIEW): {
            const review = action.payload;
            return {...state, [review.id]: review}; 
        }
        case(REMOVE_REVIEW):{
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        }

        default:
            return state;
    }
}

export default reviewsReducer;