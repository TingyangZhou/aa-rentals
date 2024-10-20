//frontend/src/components/LandingPage/SpotIndexItem.jsx
import './LandingPage.css'
import { Link } from 'react-router-dom';

const SpotIndexItem = ({spot}) => {
    return (
        
        <li  data-testid='spot-tile' className='spot-tile' title={spot.name}>
            <Link to={`spots/${spot.id}`} data-testid='spot-link'>
                <img 
                    data-testid='spot-thumbnail-image'
                    src={spot.previewImage}
                    alt={`Image of ${spot.name}`}
                    className="spot-image"
                />
                
                <div className='spot-info-wrapper'>
                    <div className="spot-location-container">
                        <div data-testid='spot-city' className='spot-location'>{spot.city}, {spot.state}</div>
                        <div data-testid='spot-rating' className='rating'><span>&#9733;</span>{spot.avgRating ? spot.avgRating.toFixed(1) : "New"}</div>
                    </div>
                    <div data-testid='spot-price' className="spot-price">${spot.price} <label>night</label></div>
                </div>
            </Link>
        </li>
        
        
    )
}

export default SpotIndexItem;