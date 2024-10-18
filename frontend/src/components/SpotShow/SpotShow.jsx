//frontend/src/components/SpotShow/SpotShow.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import Reviews from '../Reviews'
import './SpotShow.css'

const SpotShow = ({ isLoaded }) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    
    const [errors, setErrors] = useState({});

    const currSpot = useSelector(state => state.spots[spotId]);

    const reviews = useSelector(state => state.reviews);
    console.log('reviews:', reviews)

    const spotImageArr = currSpot?.SpotImages;
    const previewImage = spotImageArr?.length > 0 ? spotImageArr[0] : null; 
    const otherImages = spotImageArr?.length > 1 ? spotImageArr.slice(1) : null; 

    const numReviews = currSpot?.numReviews || 0;   
    const ownerId = currSpot?.ownerId;
   
    useEffect(() => {
        setErrors({});
        dispatch(spotsActions.fetchSingleSpot(spotId))
            .catch((error) => {
                setErrors(error);
            });
    }, [dispatch, spotId, reviews]);
    

    return (
      <>
        {Object.keys(errors).length !== 0 ? (<p className='hint'>{errors.message}</p>) : 
        (<div className='container'>
            <h1 className='spot-name'>{currSpot?.name}</h1>
            <p className='location'>{currSpot?.city}, {currSpot?.state}, {currSpot?.country}</p>

            <ul className='image-container'>
                <img className='preview-image' src ={previewImage?.url} alt={currSpot?.name} />
                <div className='other-images-wrapper'>
                    {otherImages?.map(image => (
                        <li className='other-image-list' key={image?.id}><img
                            src={image?.url} 
                            alt={currSpot?.name}
                            className='other-images'/></li>
                    ))}
                </div>
            </ul>

            <div className='spot-details-wrapper'>
                <div className='host-discription-wrapper'>
                    <h1 className='spot-host'>Hosted by {currSpot?.Owner?.firstName} {currSpot?.Owner?.lastName}</h1>
                    <p className='spot-description'>{currSpot?.description}</p>
                </div>

                <div className='reserve-wrapper'>
                    <div className='price-review-wrapper'>
                        <div className="price">${currSpot?.price} <label>night</label></div>
                        <p className='rating'>
                            <span>&#9733;</span>
                            {currSpot?.avgStarRating ? currSpot?.avgStarRating.toFixed(1) : "New"}{numReviews === 0 
                            ? '':
                            ` · ${numReviews} ${numReviews > 1 ? 'reviews' : 'review'}`}
                        </p>
                         
                    </div>
                    <button 
                        onClick={() => {alert('Feature coming soon')}}
                        className='reserve-button'>
                        Reserve
                    </button>
                </div>
            </div>
           
            <div>
                <Reviews 
                    spotId={spotId} 
                    avgRating={currSpot?.avgStarRating} numReviews={numReviews} 
                    isLoaded={isLoaded}
                    ownerId={ownerId}/>
            </div>
        </div>
        )}
    </>
    )
}

export default SpotShow;