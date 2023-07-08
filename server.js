const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the 'cors' package

const app = express();
const port = 8000;

app.use(cors()); // Enable CORS for all routes

app.get('/api/products', (req, res) => {
    const productsFilePath = path.join(__dirname, 'db.json');
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products;
    res.json(products);
});

app.listen(port, () => {
    console.log(`Mock server is running on http://localhost:${port}`);
});
