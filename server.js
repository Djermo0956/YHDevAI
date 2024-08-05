const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/search', (req, res) => {
    const query = req.query.q;
    // Integrate with AI model here
    const results = performSearch(query);
    res.json(results);
});

function performSearch(query) {
    // Dummy data for now
    return [
        { title: "Result 1", snippet: "Snippet of result 1" },
        { title: "Result 2", snippet: "Snippet of result 2" }
    ];
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
