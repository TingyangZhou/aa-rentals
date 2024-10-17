//frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function ReviewFormModal(){

    return (
        <form className='review-form'>
            <h1>How was your stay?</h1>
        </form>
    )
}

export default ReviewFormModal;