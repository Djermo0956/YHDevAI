document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchResults(query);
    }
});

async function fetchResults(query) {
    const response = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await response.json();
    displayResults(data);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'p-4 bg-white border-b border-gray-300';
        resultItem.innerHTML = `<h2 class="text-xl font-bold">${result.title}</h2><p>${result.snippet}</p>`;
        resultsContainer.appendChild(resultItem);
    });
}
