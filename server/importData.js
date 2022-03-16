require('dotenv').config();

const products = require('./db/products');
const db = require('./db/db');

const importData = () =>{
    try {
        products.map((product) => {
            let name = product.title;
            let desc = product.description;
            let price = product.price;
            let img = product.image;
            let rating = product.rating;
            let reviews = product.numReviews;
            let count = product.count;

            db.query("INSERT INTO products (name,img,descp,ratings,numReviews,price,countStock) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [name,img,desc,rating,reviews,price,count]);
        });
    } 
    catch (error) {
        console.log(error);
    }
}

importData();