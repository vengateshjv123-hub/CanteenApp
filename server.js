const express = require('express');
const path = require('path');
const app = express();

// 1. Middleware to serve all static files (CSS, Images, JS) from your 'public' folder
// This is essential so your HTML can find its styles and scripts
app.use(express.static(path.join(__dirname, 'public')));

// 2. Route for the main URL (Homepage)
// This automatically sends users to customer.html when they visit your base link
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

// 3. Specific route for the Seller page
// Users can access this at https://your-url.onrender.com/seller
app.get('/seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'seller.html'));
});

// 4. Handle "Page Not Found" (404)
// If a user types a wrong URL, this sends them back to the customer page
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page Not Found</h1><a href="/">Go back to Home</a>');
});

// 5. Define the Port
// Render provides the PORT dynamically, otherwise it defaults to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CanteenApp is running on port ${PORT}`);
});