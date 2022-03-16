require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const prodRoute = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const orderRoute = require('./routes/orderRoutes');

app.use("/products", prodRoute);
app.use("/user", userRoute);
app.use('/reviews', reviewRoute);
app.use('/orders', orderRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is running!");
})