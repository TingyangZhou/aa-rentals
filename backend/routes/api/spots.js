// backend/routes/api/spots.js
const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { where } = require('sequelize');

const router = express.Router();

const validateSpots = [
    // Example
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({min: -90, max: 90})
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .isFloat({min: -180, max: 180})
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .isLength({max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .isFloat({min: 0})
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
]   

// Create a Spot
router.post(
    '/',
    validateSpots,
    requireAuth,
    async (req, res, next) => {
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        } = req.body;

        const ownerId = req.user.id;
        
        const spot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        const safeSpot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
        };

        await setTokenCookie(res, safeSpot);

        res.status(201);
        return res.json({
            spot: safeSpot
        });
    }
);

// Get all Spots
router.get('/', async (_req, res) => {
    const spots = await Spot.findAll({
        include:[{
            model:SpotImage,
            where:{preview:true},
            required:false
        }]
    });
    
    let spotsWithRating = await Promise.all(spots.map(async spot => {
        let totalStars = await Review.sum(
            'stars',
            {where:{spotId:spot.id}}
        );
        let reviewsCount = await Review.count(
            {where:{spotId:spot.id}}
        );
        
        let avgRating = totalStars/reviewsCount;
        spot.dataValues.avgRating = avgRating;

        if (spot.SpotImages && spot.SpotImages.length > 0) {
            spot.dataValues.previewImage = spot.SpotImages[0].dataValues.url; 
        } else {
            spot.dataValues.previewImage = null;
        }
      
        delete spot.dataValues.SpotImages;
        

        return spot
    })
)
        // console.log(`\nspotId: `, spot.id)

    res.status(200).json(
        {spots:spotsWithRating});
    
})

//Get all Spots owned by the Current User
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
        const spots = await Spot.findAll({
            where: {ownerId: userId},
            include: [
                {model: Review},
                {model: SpotImage}
            ],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')),'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
                ]
            },
            group: ['spot.id', 'SpotImages.id']
        });

        const safeSpots = spots.map(spot => ({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.dataValues.avgRating,
            previewImage: spot.dataValues.previewImage
        }));

        await setTokenCookie(res, safeSpots)

        res.status(200);
        return res.json({
            Spots: safeSpots
        });
    }
);

module.exports = router;