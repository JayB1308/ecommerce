const express = require("express");
const router = express.Router();
const db = require('../db/db');

//Get all products 
router.get('/', async (req,res) =>{
    try {
        const response = await db.query('SELECT * FROM products');
        res.json({
            status: "sucess",
            results: response.rows.length,
            data: {
                products: response.rows
            }
        });
    } catch (error) {
      console.log(error);  
    }
});

//Get a product
router.get("/:id",async (req,res) =>{
    try {
        const response = await db.query("SELECT * FROM products WHERE id = $1",
        [req.params.id]);
        res.json({
            status:"Sucess",
            data:{
                product: response.rows[0]
            }
            }
        )
    } catch (error) {
     console.log(error);   
    }
});

//Get Top 4 Products
router.get('/top/:id', async (req,res) =>{
    try {
        const response = await db.query("SELECT * FROM products LIMIT $1",
        [req.params.id]);
        res.json({
            status:"Success",
            data:{
                products:response.rows
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//Update stock of a product
router.post("/update/:id", async (req,res)=>{
    try {
        const updatedProduct = await db.query("SELECT add_stock($1,$2)",
        [req.params.id, req.body.addStock]);
        res.json({
            status: "Success",
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
    }
});

//Update price of the product
router.post("/update/price/:id", async (req,res) => {
    try {
        const updateProduct = await db.query("SELECT update_price($1,$2)",
        [req.params.id,req.body.newprice]);
    } catch (error) {
        console.log(error);
    }
})

//Create a product
router.post("/create", async (req,res)=>{
    try {
        const newProduct = await db.query("INSERT INTO products (name,img,descp,ratings,numReviews,price,countStock) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [req.body.name,req.body.img,req.body.desc,req.body.rating,req.body.numReviews,req.body.price,req.body.count]);
        res.json({
            status:"Success",
                product: newProduct.rows[0]
        });
    } catch (error) {
        console.log(error)
    }
});

//Delete a product
router.delete("/delete/:id", async (req,res)=>{
    try {
        const reponse = await db.query("DELETE FROM products WHERE id = $1",
        [req.params.id]);
        res.json({
            status:"Success"
        })
    } catch (error) {
        
    }
})

module.exports = router;