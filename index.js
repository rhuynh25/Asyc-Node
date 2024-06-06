const express = require ('express');
const app = express ();
const port = 3000;
app.use(express.json());


const people = [
    {id: 1, name: 'Richard', ethnicity: 'Vietnamese'},
    {id: 2, name: 'Ly', ethnicity: 'Vietnamese'},
    {id: 3, name: 'Erica', ethnicity: 'Hmong'}
];

// Checking is my server running and letting me know
app.get('/', (req, res) => {
    res.send('API is running');
});

// Getting all of the entries
app.get("/api/items", async (req, res) => { 
    res.json(people);
});

// "Post" new entries
app.post('/api/items', async (req, res) => {
    const {id, name} = req.query
    const person = {
        id,
        name, 
        ethnicity: 'TBD',
    }
    people.push(person);
    res.status(201).send(person);
});

// "Put" to update the existing entry
app.put('/api/items/:id', async (req, res) => {
    await runAsync();
    const id = parseInt(req.params.id);
    const index = people.findIndex(items => items.id === id);

    if (index === -1) {
        return res.status(404).send('Item not found');
    }

    people[index] = {
        ...people[index],
        name: req.body.name,
        ethnicity: req.body.ethnicity
    }
    res.json(people[index]);
});

// Deleting a entry
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    people = people.filter(item => item.id !== id);
    res.status(204).send();

    const index = people.indexOf(person);
    people.splice(index, 1);
});



// Running the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});