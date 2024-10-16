import { useEffect, useState } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import './CreateSpotForm.css'

export default function CreateSpotForm() {
    const [ country, setCountry ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ spotName, setSpotName ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ previewImage, setPreviewImage ] = useState('');
    const [ imageUrl1, setImageUrl1 ] = useState('');
    const [ imageUrl2, setImageUrl2 ] = useState('');
    const [ imageUrl3, setImageUrl3 ] = useState('');
    const [ imageUrl4, setImageUrl4 ] = useState('');
    const [errors, setErrors] = useState({});    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        
    }

    return(
        <form onSubmit={handleSubmit} className='create-spot-form'>
            <h1>Create a new Spot</h1>

            <section className='form-location'>
                <h2>Where's your place located</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div>
                    <label>
                        Country
                    <input 
                        type="text" 
                        placeholder='Country' />
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                    </label>
                </div>
                
                <div>
                    <label>
                        Street Address
                    <input 
                        type="text" 
                        placeholder='Address'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                         />
                    </label>
                </div>

                <div className='city-state-wrapper'>
                    <label className='city'>
                        City
                        <input 
                            type="text" 
                            placeholder='City'
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                    </label>
                    
                    <label className='state'>
                        State
                        <input 
                            type="text" 
                            placeholder='State'
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                        />
                    </label>
                </div>                
                
            </section>

            <section className='form-description'>
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea 
                    placeholder='Please write at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}   
                    value={description} 
                />
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
            </section>

            <section className='form-price'>
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className='price-input-div'>
                    <span>$</span>
                    <input 
                        type="number" placeholder='Price per night (USD)' 
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
            
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
                    </div>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Image URL'
                            onChange={(e) => setImageUrl1(e.target.value)}
                            value={imageUrl1}
                        />
                    </div>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Image URL'
                            onChange={(e) => setImageUrl2(e.target.value)}
                            value={imageUrl2}
                        />
                    </div>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Image URL'
                            onChange={(e) => setImageUrl3(e.target.value)}
                            value={imageUrl3}
                        />
                    </div>
                    <div>
                        <input 
                            type='text' 
                            placeholder='Image URL' 
                            onChange={(e) => setImageUrl4(e.target.value)}
                            value={imageUrl4}
                        />
                    </div>
            </section>
            <div class="button-container">
                 <button 
                    class="create-spot-button"
                >
                        Create Spot
                </button>
            </div>
            
        </form>
    )
}