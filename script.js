// script.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    const travelForm = document.getElementById('travel-form');
    const popularDestinations = document.querySelectorAll('.destination');

    // Handle form submission
    travelForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get user input values
        const travelGroup = document.getElementById('travel-group').value;
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;
        const budget = document.getElementById('budget').value;

        // Display filtered results
        filterDestinations(travelGroup, destination, budget);
    });

    // Function to filter destinations based on user input
    function filterDestinations(travelGroup, destination, budget) {
        popularDestinations.forEach(dest => {
            const destName = dest.querySelector('h3').textContent.toLowerCase();

            // Check if the destination matches the selected filter
            if (destination === destName || destination === "") {
                dest.style.display = 'block'; // Show matching destination
            } else {
                dest.style.display = 'none'; // Hide non-matching destination
            }
        });
    }
});


// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// API route for fetching destinations (this could later fetch from a database)
app.get('/api/destinations', (req, res) => {
    const destinations = [
        { name: 'Goa', description: 'Beaches and nightlife', budget: 15000 },
        { name: 'Ladakh', description: 'Himalayan adventure', budget: 25000 },
        { name: 'Kerala', description: 'Backwaters and nature', budget: 20000 },
        { name: 'Rajasthan', description: 'Deserts and palaces', budget: 18000 },
    ];
    res.json(destinations);
});

// API route for handling form submissions
app.post('/api/search', (req, res) => {
    const { travelGroup, destination, date, budget } = req.body;
    
    // Here you would typically handle the search logic, filtering, etc.
    // For now, just send back the received data as a response
    res.json({ travelGroup, destination, date, budget });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
