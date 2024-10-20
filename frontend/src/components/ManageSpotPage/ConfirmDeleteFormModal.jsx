import { useState } from 'react';
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

    const handleKeepClick = () => {
        closeModal();
    }

    return (
        <form data-testid='delete-spot-modal' className='confirm-delete-form'>
             {errors?.message && <p className='hint'>{errors.messagey}</p>}
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot 
            from the listings?</p>
            <button 
                 data-testid='confirm-delete-spot-button'
                 className='yes-button'
                 onClick={handleDeleteClick}
            >Yes (Delete Spot)</button>
            <button 
                data-testid='cancel-delete-spot-button'
                className='no-button'
                onClick={handleKeepClick}
            >No (Keep Spot)</button>
        </form>
        
    )
}

export default ConfirmDeleteFormModal;