const express = require('express');
const app = express();
const PORT = 8080;

// middleware to parse the body
app.use(express.json());

// simulated grocery items
const groceries = [
    {
        id: 1,
        name: "Milk",
        quantity: 1
    },
    {
        id: 2,
        name: "Bread",
        quantity: 2
    },
    {
        id: 3,
        name: "Eggs",
        quantity: 10
    }
];

// GET - /groceries - get all groceries
app.get('/groceries', (req, res) => {
    try {
        res.json(groceries);
    } catch (error) {
        console.error(error);
    }
});

// GET - /groceries/:id - get a single grocery item by id
app.get('/groceries/:id', (req, res) => {
    try {
        const id = req.params.id;
        const grocery = groceries.find(item => item.id === parseInt(id));
        if (!grocery) {
            res.status(404).json({ message: 'Grocery item not found' });
        } else {
            res.json(grocery);
        }
    } catch (error) {
        console.error(error);
    }
});

// POST - /groceries - create a new grocery item
app.post('/groceries', (req, res) => {
    try {
        const newGrocery = req.body;
        groceries.push(newGrocery);
        res.status(201).json(newGrocery);
    } catch (error) {
        console.error(error);
    }
});

// PUT - /groceries/:id - update a grocery item by id
app.put('/groceries/:id', (req, res) => {
    try {
        const id = req.params.id;
        const updatedGrocery = req.body;
        const index = groceries.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            res.status(404).json({ message: 'Grocery item not found' });
        } else {
            groceries[index] = updatedGrocery;
            res.json(updatedGrocery);
        }
    } catch (error) {
        console.error(error);
    }
});

// DELETE - /groceries/:id - delete a grocery item by id
app.delete('/groceries/:id', (req, res) => {
    try {
        const id = req.params.id;
        const index = groceries.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            res.status(404).json({ message: 'Grocery item not found' });
        } else {
            groceries.splice(index, 1);
            res.status(204).end();
        }
    } catch (error) {
        console.error(error);
    }
});

// start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});