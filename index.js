const express = require('express');
const app = express ();
const port = 3000;
app.use(express.json());


const people = [
    {id: 1, name: 'Richard', ethnicity: 'Vietnamese'},
    {id: 2, name: 'Ly', ethnicity: 'Vietnamese'},
    {id: 3, name: 'Erica', ethnicity: 'Hmong'},
];

// Checking is my server running and letting me know
app.get('/', (req, res) => {
    res.send('API is running');
});

// Getting all of the entries
app.get("/api/items", (req, res) => {
    res.json(people);
});

// "Post" new entries
app.post('/api/items', (req, res) => {
    const { id, name, ethnicity } = req.body;
    if (!id || !name || !ethnicity) {
        return res.status(400).json({ error: "Please provide id, name, and ethnicity" });
    }

    const person = {
        id,
        name,
        ethnicity,
    }
    people.push(person);
    res.status(201).json(person);
});

// "Put" to update the existing entry
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, ethnicity } = req.body;
    if (!name || !ethnicity) {
        return res.status(400).json({ error: "Provide name and ethnicity" });
    }

    let found = false;
    people = people.map(person => {
        if (person.id === id) {
            found = true;
            return { ...person, name, ethnicity };
        }
        return person;
    });

    if (!found) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.json({ message: "Item updated successfully" });
});

// Deleting a entry
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    people = people.filter(person => person.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});



// Running the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});