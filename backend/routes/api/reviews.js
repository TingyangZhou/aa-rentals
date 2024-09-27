// backend/routes/api/spots.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


//Get all Reviews of the Current User
router.get('/current',
    requireAuth,
    async (req, res, next) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: {userId: userId},
        include:[
            {
                model: User,
                attributes:['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes:['id', 'ownerId', 'address', 'city', 'state', 'country', 
                    'lat', 'lng', 'name', 'price'],
                include:{
                    model: SpotImage,
                    attributes:['url']
                } 
            },
            {
                model: ReviewImage,
                attributes:['id', 'url']
            }

        ]
    })

    let formattedReviews = reviews.map(review => {
               
        review = review.toJSON();
        if (review.Spot.SpotImages && review.Spot.SpotImages.length > 0){
            review.Spot.previewImage = review.Spot.SpotImages[0].url;
            delete review.Spot.SpotImages; 
        } else{
            review.Spot.previewImage = null;
        }
                
        return review;        
    })

    res.status(200).json({
        Reviews: formattedReviews
    })
    
})


module.exports = router;