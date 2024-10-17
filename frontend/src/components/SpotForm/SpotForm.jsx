import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SpotForm.css';

export default function SpotForm({ newSpot, formType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState('');
  const [spotName, setSpotName] = useState('');
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    setErrors({});

    const validateExtension = (imageUrl) => {
      return (
        imageUrl.endsWith('.png') || imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')
      );
    };

    let validationError = {};

    if (description.length < 30) {
      validationError.description = 'Description needs 30 or more characters';
    }

  
    if (previewImage.length === 0) {
      validationError.previewImage = 'Preview image is required.';
    }

    if (previewImage.length !== 0 && !validateExtension(previewImage)) {
      validationError.previewImage = 'Image URL needs to end in png or jpg (or jpeg)';
    }
    if (imageUrl1.length !== 0 && !validateExtension(imageUrl1)) {
      validationError.imageUrl1 = 'Image URL needs to end in png or jpg (or jpeg)';
    }
    if (imageUrl2.length !== 0 && !validateExtension(imageUrl2)) {
      validationError.imageUrl2 = 'Image URL needs to end in png or jpg (or jpeg)';
    }

    if (imageUrl3.length !== 0 && !validateExtension(imageUrl3)) {
      validationError.imageUrl3 = 'Image URL needs to end in png or jpg (or jpeg)';
    }

    if (imageUrl4.length !== 0 && !validateExtension(imageUrl4)) {
      validationError.imageUrl4 = 'Image URL needs to end in png or jpg (or jpeg)';
    }

    setErrors(validationError);

    let otherImageArr = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];


    // If there are validation errors, stop form submission
    // if (Object.keys(validationError).length > 0) {
    //   return;
    // }
  
      if (formType === 'Create Spot') {
        
        newSpot = {
            address, 
            city,
            state, 
            country,
            name: spotName,
            description,
            price,
            lat:latitude,
            lng:longitude
          }

        //   console.log('newSpot:', newSpot)
        try {
            // First dispatch: create the spot
            const spot = await dispatch(spotsActions.writeSpot(newSpot)); // Wait for spot to be created
            if (spot && spot.id) {
                try {
                  // Second dispatch: create the spotImage
                    await dispatch(spotsActions.createSpotImage(spot.id, previewImage)); // Wait for image creation
                    
                    for (const image of otherImageArr){
                      if (image){
                        await dispatch(spotsActions.createSpotImage(spot.id, image));
                      }
                    }

                } catch (error) {
                    setErrors({ message: error.message });
                    return;
                }
            }

        } catch (error) {
            console.log(error);
            setErrors(prevError => ({ ...prevError, ...error }));
            return;
        }
    
       
    
        // Only navigate after both the spot and image have been successfully created
        navigate(`/`);


  } //end if
}; //end handleSubmit

  return (
    <form onSubmit={handleSubmit} className='create-spot-form'>
      <h1>Create a new Spot</h1>

      <section className='form-location'>
        <h2>Where's your place located</h2>
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
              onChange={(e) => setLatitude(e.target.value)}
              value={latitude}
            />
          </label>
           
          <label className='longitude'>
            Longitude
            <input
              type="number"
              step="0.0001"  
              placeholder='Longitude'
              onChange={(e) => setLongitude(e.target.value)}
              value={longitude}
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
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
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

      <section className='form-photos'>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div>
          <input
            type='text'
            placeholder='Preview Image URL'
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
          />
          {errors?.previewImage && <p className='hint'>{errors.previewImage}</p>}
        </div>

        <div>
          <input
            type='text'
            placeholder='Image URL'
            onChange={(e) => setImageUrl1(e.target.value)}
            value={imageUrl1}
          />
          {errors?.imageUrl1 && <p className='hint'>{errors.imageUrl1}</p>}
        </div>
        <div>
          <input
            type='text'
            placeholder='Image URL'
            onChange={(e) => setImageUrl2(e.target.value)}
            value={imageUrl2}
          />
          {errors?.imageUrl2 && <p className='hint'>{errors.imageUrl2}</p>}
        </div>
        <div>
          <input
            type='text'
            placeholder='Image URL'
            onChange={(e) => setImageUrl3(e.target.value)}
            value={imageUrl3}
          />
          {errors?.imageUrl3 && <p className='hint'>{errors.imageUrl3}</p>}
        </div>
        <div>
          <input
            type='text'
            placeholder='Image URL'
            onChange={(e) => setImageUrl4(e.target.value)}
            value={imageUrl4}
          />
          {errors?.imageUrl4 && <p className='hint'>{errors.imageUrl4}</p>}
        </div>
      </section>
      <div className='button-container'>
        <button className='create-spot-button'>Create Spot</button>
      </div>

     
    </form>
  );
}
