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

// PUT - /groceries/:id - update a grocery item by id

// DELETE - /groceries/:id - delete a grocery item by id

// start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});