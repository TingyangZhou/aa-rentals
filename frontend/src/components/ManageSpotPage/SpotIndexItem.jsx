
import { Link, useNavigate } from 'react-router-dom';
import './ManageSpotPage.css'
import OpenModalButton from '../OpenModalButton';
import ConfirmDeleteFormModal from './ConfirmDeleteFormModal';'./ConfirmDeleteFormModal.jsx'

const SpotIndexItem = ({spot}) => {
    const navigate = useNavigate();
    // console.log('typeof avgRating:', typeof Number(spot?.avgRating))

    return (
        <div data-testid='user-spots' className='spot-container'>
            <Link to={`/spots/${spot?.id}`}>
                <li className='manage-spot-tile' title={spot?.name}>
                    <img
                        src={spot?.previewImage}
                        alt={`Image of ${spot.name}`}
                        className="spot-image"
                    />
                    
                    <div className='spot-info-wrapper'>
                        <div className="spot-location-container">
                            <div className='spot-location'>{spot?.city}, {spot?.state}</div>
                            <div className='rating'><span>&#9733;</span>{spot?.avgRating ? Number(spot?.avgRating).toFixed(1) : "New"}</div>
                        </div>
                        <div className="spot-price">${spot?.price} <label>night</label></div>
                    </div>
                    
                </li>
            </Link>
            <div className='edit-spot-buttons'>
                <button 
                    className='spot-update-button'
                    onClick={()=>{
                        navigate(`/spots/${spot?.id}/edit`)}}
                
                >Update</button>

                 <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<ConfirmDeleteFormModal spotId={spot?.id}/>}
              />
            </div>
        </div>
        
        
    )
}

export default SpotIndexItem;

