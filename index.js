const express = require('express');
const app = express();
const PORT = 8080;

// Middleware to parse request body
app.use(express.json());

// serve static public directory
app.use(express.static('public'));

// Simulated database using an array
let groceryList = [
    { id: 1, item: 'Milk', quantity: 1 },
    { id: 2, item: 'Bread', quantity: 2 }
];

// Get all grocery items
app.get('/groceries', (req, res) => {
    res.status(200).json(groceryList);
});

// Get a single grocery item by id
app.get('/groceries/:id', (req, res) => {
    const { id } = req.params;
    const groceryItem = groceryList.find(item => item.id === parseInt(id));
    if (!groceryItem) return res.status(404).send('Item not found.');
    res.status(200).json(groceryItem);
});

// Create a new grocery item
app.post('/groceries', (req, res) => {
    const { item, quantity } = req.body;
    const groceryItem = {
        id: groceryList.length + 1,
        item,
        quantity
    };
    groceryList.push(groceryItem);
    res.status(201).send(groceryItem);
});

// Update an existing grocery item
app.put('/groceries/:id', (req, res) => {
    const { id } = req.params;
    const { item, quantity } = req.body;
    const groceryItem = groceryList.find(item => item.id === parseInt(id));
    if (!groceryItem) return res.status(404).send('Item not found.');

    groceryItem.item = item;
    groceryItem.quantity = quantity;
    res.status(200).json(groceryItem);
});

// Delete a grocery item
app.delete('/groceries/:id', (req, res) => {
    const { id } = req.params;
    const index = groceryList.findIndex(item => item.id === parseInt(id));
    if (index === -1) return res.status(404).send('Item not found.');

    const [deletedItem] = groceryList.splice(index, 1);
    res.status(200).json(deletedItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
