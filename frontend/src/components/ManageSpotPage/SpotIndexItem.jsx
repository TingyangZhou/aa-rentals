
import { Link } from 'react-router-dom';
import './ManageSpotPage.css'

const SpotIndexItem = ({spot}) => {

    return (
        <Link to={`/spots/${spot?.id}`}>
            <li className='spot-tile' title={spot?.name}>
                <img
                    src={spot?.previewImage}
                    alt={`Image of ${spot.name}`}
                    className="spot-image"
                />
                
                <div className='spot-info-wrapper'>
                    <div className="spot-location-container">
                        <div className='spot-location'>{spot?.city}, {spot?.state}</div>
                        <div className='rating'><span>&#9733;</span>{spot?.avgRating ? spot?.avgRating.toFixed(1) : "New"}</div>
                    </div>
                    <div className="spot-price">${spot?.price} <label>night</label></div>
                </div>
                <div className='edit-spot-buttons'>
                    <button className='spot-update-button'>Update</button>
                    <button className='spot-delete-button'>Delete</button>
                </div>
            </li>
        </Link>
        
    )
}

export default SpotIndexItem;

