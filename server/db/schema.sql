CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(300) NOT NULL,
    password VARCHAR(256) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    img TEXT NOT NULL,
    descp TEXT NOT NULL,
    ratings INT DEFAULT 0,
    numReviews INT,
    price INT NOT NULL,
    countStock INT NOT NULL
);

CREATE TABLE reviews(
    review_id BIGSERIAL NOT NULL PRIMARY KEY,
    userId BIGINT REFERENCES users(id),
    username VARCHAR(50),
    review TEXT,
    rating INT NOT NULL,
    productId BIGINT REFERENCES products(id)
);

CREATE TABLE orders(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    userId BIGINT REFERENCES users(id),
    productid BIGINT [] NOT NULL,
    quantity INT [] NOT NULL,
    total INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    delivered BOOLEAN NOT NULL DEFAULT false
);

CREATE FUNCTION check_delivered(orderId BIGINT)
RETURNS VOID AS $$
BEGIN
UPDATE orders SET delivered = true WHERE id = orderId;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION add_stock(productId BIGINT, stock INT)
RETURNS VOID AS $$
BEGIN 
UPDATE products SET countStock = countStock + stock WHERE id = productId;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_price(productId BIGINT, newPrice INT)
RETURNS VOID AS $$
BEGIN
UPDATE products SET price = newPrice WHERE id = productId;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION add_review(productId BIGINT)
RETURNS VOID AS $$
BEGIN
UPDATE products SET numReviews = numReviews + 1 WHERE id = productId;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_rating(productid BIGINT)
RETURNS VOID AS $$
DECLARE average INT;
BEGIN
UPDATE products SET ratings = ratings + 1 WHERE id = productid;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION reduce_stock(productid BIGINT, quant INT)
RETURNS VOID AS $$
BEGIN
UPDATE products SET countStock = countStock - quant WHERE id = productid;
END;
$$ LANGUAGE plpgsql;


SELECT R.id,R.review,R.rating,P.name
FROM reviews AS R
INNER JOIN products AS P ON R.productId = P.id
WHERE R.userId = 25;