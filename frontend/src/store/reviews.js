/** Action Type Constants: */
const LOAD_REVIEWS = "spots/LOAD_REVIEWS";


/**  Action Creators: */
const loadReviews = (reviews) => {
    return {
      type: LOAD_REVIEWS,
      payload: reviews
    };
  };


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
        default:
            return state;
    }
}

export default reviewsReducer;