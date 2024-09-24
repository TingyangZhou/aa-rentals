// backend/routes/api/spots.js
const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpots = [
    // Example
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    handleValidationErrors
]   

// Create a Spot
router.post(
    '/',
    validateSpots,
    async (req, res, next) => {

    }
);

module.exports = router;