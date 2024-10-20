import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './Reviews.css'


function ConfirmDeleteReviewModal({reviewId}) {
    const dispatch=useDispatch();
    const { closeModal } = useModal();

    const [ errors, setErrors ]=useState({});

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setErrors({});

        return dispatch(reviewsActions.deleteReview(reviewId))
        .then(closeModal)
        .catch(error => setErrors(error));
        
    }

    const handleKeepClick = (e) => {
        closeModal();
    }

    return (
        <form data-testid='delete-review-modal' className='confirm-delete-form'>
            
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this review?</p>
            <button 
                data-testid='confirm-delete-review-button' 
                className='yes-button'
                onClick={handleDeleteClick}
            >Yes (Delete Review)</button>
            <button 
                className='no-button'
                onClick={handleKeepClick}
            >No (Keep Review)</button>
        </form>
        
    )
}

export default ConfirmDeleteReviewModal;