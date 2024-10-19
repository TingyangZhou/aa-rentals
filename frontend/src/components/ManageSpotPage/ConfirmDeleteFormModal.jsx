import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';
import { useModal } from '../../context/Modal';


function ConfirmDeleteFormModal({spotId}) {
    const dispatch=useDispatch();
    const { closeModal } = useModal();

    const [ errors, setErrors ]=useState({});


    const handleDeleteClick = (e) => {
        setErrors({});
        e.preventDefault();

        return dispatch(spotsActions.deleteSpot(spotId))
        .then(closeModal)
        .catch(error => setErrors(error));
        
    }

    const handleKeepClick = (e) => {
        closeModal();
    }

    return (
        <form className='confirm-delete-form'>
            
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot 
            from the listings?</p>
            <button className='yes-button'
                 onClick={handleDeleteClick}
            >Yes (Delete Spot)</button>
            <button 
                className='no-button'
                onClick={handleKeepClick}
            >No (Keep Spot)</button>
        </form>
        
    )
}

export default ConfirmDeleteFormModal;