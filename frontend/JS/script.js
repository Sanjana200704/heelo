document.getElementById('summarize-btn').addEventListener('click', async () => {
    const videoUrl = document.getElementById('video-url').value;
    const backendURL = "http://127.0.0.1:5000"; // Correct backend URL

    if (!videoUrl) {
        alert('Please enter a YouTube video URL');
        return;
    }

    try {
        // Show a loading message
        document.getElementById('summary').innerText = 'Loading summary...';
        document.getElementById('summary-points').innerHTML = ''; // Clear previous points

        // Send a POST request to the backend with the video URL as a body
        const response = await fetch(`${backendURL}/api/summary/summarize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ videoUrl: videoUrl }),  // Correct payload: send videoUrl
        });

        // Parse the JSON response
        const data = await response.json();

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        // Ensure the response contains the expected data
        if (!data.summary) {
            throw new Error('Summary is missing from the response');
        }

        // Display the summary description
        document.getElementById('summary').innerText = data.summary || 'No description available.';
    } catch (error) {
        // Log and display errors
        console.error('Error fetching summary:', error.message);
        document.getElementById('summary').innerText = 'Error fetching summary. Please try again.';
    }
});

// Function to add a point to the sidebar
function addToKeyPoints(point) {
    const keyPointsList = document.getElementById('key-points');
    const li = document.createElement('li');
    li.textContent = point;
    keyPointsList.appendChild(li);
}

// Get the button and the dropdown content
const menuButton = document.querySelector('.menu-button');
const dropdownContent = document.querySelector('.dropdown-content');

// Add an event listener to toggle visibility
menuButton.addEventListener('click', () => {
  if (dropdownContent.style.display === 'block') {
    dropdownContent.style.display = 'none';
  } else {
    dropdownContent.style.display = 'block';
  }
});

// Optional: Close the dropdown if the user clicks outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    dropdownContent.style.display = 'none';
  }
});