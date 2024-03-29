const form = document.getElementById('groceryForm');
const itemInput = document.getElementById('item');
const quantityInput = document.getElementById('quantity');
const itemIdInput = document.getElementById('itemId');
const groceryList = document.getElementById('groceryList');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const item = itemInput.value;
    const quantity = quantityInput.value;
    const itemId = itemIdInput.value;

    try {
        if (itemId) {
            await updateItem(itemId, item, quantity);
        } else {
            await addItem(item, quantity);
        }
        itemInput.value = '';
        quantityInput.value = '';
        itemIdInput.value = '';
        await fetchGroceries();
    } catch (error) {
        console.error('Error processing item:', error);
    }
});

async function fetchGroceries() {
    try {
        const response = await fetch('/groceries');
        const data = await response.json();
        groceryList.innerHTML = ''; // Clear current list
        data.forEach(({ id, item, quantity }) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item} (Quantity: ${quantity}) <button onclick="editItem('${id}', '${item}', '${quantity}')">Edit</button> <button onclick="deleteItem('${id}')">Delete</button>`;
            groceryList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching groceries:', error);
    }
}

async function addItem(item, quantity) {
    try {
        await fetch('/groceries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, quantity: parseInt(quantity, 10) }),
        });
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}

async function updateItem(id, item, quantity) {
    try {
        await fetch(`/groceries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item, quantity: parseInt(quantity, 10) }),
        });
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
}

async function deleteItem(id) {
    try {
        await fetch(`/groceries/${id}`, {
            method: 'DELETE',
        });
        await fetchGroceries();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

window.editItem = (id, item, quantity) => {
    itemIdInput.value = id;
    itemInput.value = item;
    quantityInput.value = quantity;
};

window.deleteItem = deleteItem;

fetchGroceries();
