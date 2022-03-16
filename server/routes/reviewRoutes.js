const express = require('express');
const router = express.Router();
const db = require('../db/db');

//Get the review of a product
router.get('/:id', async (req,res)=>{
    try {
        const reviews = await db.query("SELECT * FROM reviews WHERE productId = $1",
        [req.params.id]);
        res.json({
            status:"Success",
            data:
            {
                reviews:reviews.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

//Get all reviews posted by a user
router.get("/user/:id", async (req,res)=>{
    try {
        const response = await db.query("SELECT R.review_id,R.review,R.rating,P.name,P.id FROM reviews AS R INNER JOIN products AS P ON R.productId = P.id WHERE R.userId = $1",
        [req.params.id]);
        res.json({
            status:"Success",
            data:{
            reviews:response.rows
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//Post a review
router.post('/create/:id', async (req,res)=>{
    try {
        const newReview = await db.query("INSERT INTO reviews (userId,username,review,rating,productId) VALUES ($1,$2,$3,$4,$5)",
        [req.body.userid,req.body.username,req.body.review,req.body.rating,req.params.id]);
        const updatedReview = await db.query("SELECT add_review($1)",
        [req.params.id]);
        const updateRating = await db.query("SELECT update_rating($1)",
        [req.params.id]);
        res.json({
            status:"success",
            data: {
                review:newReview,
                updatedReview: updatedReview,
                updateRating: updateRating
            }
        });
    } catch (error ) {
        console.log(error);   
    }
});


//Update the review
router.put('/update/:id', async (req,res)=>{
    try {
        const updateReview = await db.query("UPDATE reviews SET userId = $1, SET review = $2, SET rating = $3, SET productId = $4 WHERE id = $5 RETURNING *",
        [req.body.userid,req.body.review,req.body.rating,req.body.productid,req.params.id]);
        res.json({
            status:"Success",
            data:{
                review: updateReview
            }
        })
    } catch (error) {
        console.log(error);
    }
});

//Delete a review
router.delete("/delete/:id", async (req,res)=>{
    try {
        const deleteReview = await db.query("DELETE FROM reviews WHERE id = $1",
        [req.params.id]);
        res.json({
            status:"Sucess"
        })
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;