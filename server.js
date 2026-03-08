// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- DATABASE (In-Memory) ---
let isCanteenOpen = false; // Starts CLOSED by default
let menu = []; 
let orders = [];

// --- STATUS API ---
app.get('/api/status', (req, res) => {
    res.json({ isOpen: isCanteenOpen });
});

app.post('/api/status', (req, res) => {
    isCanteenOpen = req.body.isOpen;
    res.json({ success: true, isOpen: isCanteenOpen });
});

// --- MENU API ---
app.get('/api/menu', (req, res) => res.json(menu));

app.post('/api/menu', (req, res) => {
    menu.push(req.body);
    res.json({ success: true });
});

app.delete('/api/menu/:id', (req, res) => {
    menu = menu.filter(item => item.id != req.params.id);
    res.json({ success: true });
});

// Wipes the entire menu clean
app.delete('/api/menu-clear', (req, res) => {
    menu = [];
    res.json({ success: true });
});

// --- ORDERS API ---
app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
    if (!isCanteenOpen) return res.status(403).json({ error: "Canteen is closed!" });
    req.body.id = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    req.body.status = "preparing";
    orders.push(req.body);
    res.json({ success: true, orderId: req.body.id });
});

app.patch('/api/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (order) order.status = req.body.status;
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));