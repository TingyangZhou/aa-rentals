import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './UpdateSpotForm.css'


const UpdateSpotForm = () => {
 

  const {spotId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /*select current spot*/
  const spots = useSelector(state => state.spots)
  // console.log('spots:', spots)
  // console.log('spotId:', spotId)
  const currSpot = spots[spotId]
  console.log('currSpot:', currSpot)
  const sessionUser = useSelector(state=>state.session.user);
  console.log('sesssionUser:', sessionUser)
  

  /* dispatch current spot information in store*/
  useEffect(() => {
    setErrors({});
    if(sessionUser.id !== currSpot?.ownerId){
      setErrors({message: 'You must be the owner to edit this spot.'})
    }
    dispatch(spotsActions.fetchSingleSpot(spotId))
        .catch((error) => {
            setErrors(error);
        });
}, [dispatch, spotId]);


  const [country, setCountry] = useState(currSpot?.country);
  const [address, setAddress] = useState(currSpot?.address);
  const [city, setCity] = useState(currSpot?.city);
  const [state, setState] = useState(currSpot?.state);
  const [lat, setLat] = useState(currSpot?.lat);
  const [lng, setLng] = useState(currSpot?.lng);
  const [description, setDescription] = useState(currSpot?.description)
  const [spotName, setSpotName] = useState(currSpot?.name);
  const [price, setPrice] = useState(currSpot?.price);
  const [errors, setErrors] =useState({});

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    let validationError = {};

    
    const validationItems = {country, address, city, state, lat, lng, spotName, price};
    Object.keys(validationItems).forEach(key => {
      const value = validationItems[key];
      console.log(key, value);
      if(!value || value?.length === 0){
        validationError[key]=`${key} is required`;
      }
    })

    if (description?.length < 30) {
      validationError.description = 'Description needs 30 or more characters';
    }

    setErrors(validationError);


    // If there are validation errors, stop form submission
    if (Object.keys(validationError).length > 0) {
      return;
    }
  
    
      const updatedSpot = {
            address, 
            city,
            state, 
            country,
            name: spotName,
            description,
            price,
            lat,
            lng
          }

      console.log('updated Spot:', updatedSpot);

          dispatch(spotsActions.editSpot(updatedSpot, spotId))          
          .catch((error) =>{
            console.log('error:', error);
            if(error.errors){
              setErrors(prevError => ({ ...prevError, ...error.errors }))
              console.log('\nerrors:', errors)
            } else if(error.message) {
              setErrors({message: error.message});
            } else{
              setErrors({message:error});
            }
          

            return;
        }
      
        
      )
      navigate(`/spots/${spotId}`);

}; //end handleSubmit

  return (
    <form onSubmit={handleSubmit} className='create-spot-form'>
      <h1>Update Your Spot</h1>
      {errors?.message&& <p className='hint'>{errors.message}</p>}

      <section className='form-location'>
        <h2>Where&apos; your place located</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <div>
          <label>
            Country
            <input
              type='text'
              placeholder='Country'
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </label>
          {errors?.country&& <p className='hint'>{errors.country}</p>}
        </div>

        <div>
          <label>
            Street Address
            <input
              type='text'
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </label>
          {errors?.address && <p className='hint'>{errors.address}</p>}
        </div>
        

        <div className='city-state-wrapper'>
          <label className='city'>
            City
            <input
              type='text'
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </label>
           
          <label className='state'>
            State
            <input
              type='text'
              placeholder='State'
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </label>
        </div>
        {errors?.city&& <p className='hint'>{errors.city}</p>}
        {errors?.state&& <p className='hint'>{errors.state}</p>}

        <div className='lat-lng-wrapper'>
          <label className='latitude'>
            Latitude
            <input
              type="number"
              step="0.0001"  
              placeholder='Latitude'
              onChange={(e) => setLat(e.target.value)}
              value={lat}
            />
          </label>
           
          <label className='longitude'>
            Longitude
            <input
              type="number"
              step="0.0001"  
              placeholder='Longitude'
              onChange={(e) => setLng(e.target.value)}
              value={lng}
            />
          </label>
        </div>
        {errors?.lat && <p className='hint'>{errors.lat}</p>}
        {errors?.lng && <p className='hint'>{errors.lng}</p>}
      </section>

      

      <section className='form-description'>
        <h2>Describe your place to guests</h2>
        <p>
          Mention the best features of your space, any special amenities like fast wifi or parking,
          and what you love about the neighborhood.
        </p>
        <textarea
          placeholder='Please write at least 30 characters'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {errors?.description && <p className='hint'>{errors.description}</p>}
      </section>

      <section className='form-title'>
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <input
          type='text'
          placeholder='Name of your spot'
          onChange={(e) => setSpotName(e.target.value)}
          value={spotName}
        />
        {errors?.name&& <p className='hint'>{errors.name}</p>}
      </section>

      <section className='form-price'>
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div className='price-input-div'>
          <span>$</span>
          <input
            type="number"
            step="0.01"  
            placeholder='Price per night (USD)'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        {errors?.price&& <p className='hint'>{errors.price}</p>}
        
      </section>

      <div className='button-container'>
        <button 
        className='update-spot-button'>Update Spot</button>
      </div>

     
    </form>
  );
}

export default UpdateSpotForm;