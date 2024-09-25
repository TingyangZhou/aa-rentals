const express = require('express');
const { Spot, SpotImage, Review } = require('../../db/models');


const router = express.Router();

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

module.exports = router;