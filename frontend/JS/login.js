// Predefined credentials (updated to include username)
// const validCredentials = [
//   { username: "sanju", email: "sanju@gmail.com", password: "123" }, // First set of credentials
//   { username: "avnish", email: "avnish@gmail.com", password: "456" }, // Second set of credentials
// ];

// Function to handle login validation
async function validateAndRedirect() {
  // Get input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Clear any previous messages
  message.textContent = "";

  // Validate input

  if (!email) {
    message.textContent = "Please enter your email.";
    return;
  }

  if (!password) {
    message.textContent = "Please enter your password.";
    return;
  }

  // Check if credentials match any pair in the validCredentials array
  const backendURL = "http://127.0.0.1:5000"; // Backend URL

  try {
    // Make a POST request to your signup API endpoint
    const response = await fetch(`${backendURL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Include username in the request body
    });

    // Check if the response is okay (status 200-299)
    if (response.ok) {
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";

      // Redirect to another page after a short delay
      setTimeout(() => {
        window.location.href = "index.html"; // Ensure this file exists
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email, or password.";
    }
  } catch (err) {
    
    message.style.color = "red";
    message.textContent = "Invalid email, or password.";
  }

}

// Attach event listener to the login button
document.querySelector(".login-button").addEventListener("click", validateAndRedirect);

// Handle form submission for summarization
document.getElementById("summarize-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const videoUrl = document.getElementById("videoUrl").value;

  if (!videoUrl) {
    alert("Please enter a valid YouTube URL");
    return;
  }

  try {
    // Simulate a request to a summarization API (you can replace it with an actual API call)
    const summary = `This is a summary for the video at URL: ${videoUrl}. It contains key insights and information relevant to the content.`;

    // Display the summary in the summary-box
    const summaryBox = document.getElementById("summary-box");
    summaryBox.textContent = summary;
    summaryBox.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while summarizing the video.");
  }
});

// Dropdown toggle functionality
document.getElementById("dropdownToggle").addEventListener("click", () => {
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("show"); // Toggle visibility
});

// Close the dropdown if the user clicks outside of it
window.addEventListener("click", (event) => {
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownToggle = document.getElementById("dropdownToggle");

  if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.remove("show"); // Hide the dropdown
  }
});

// Toggle Dropdown
const menuButton = document.querySelector('.menu-button');
const dropdownContent = document.querySelector('.dropdown-content');

menuButton.addEventListener('click', () => {
  dropdownContent.classList.toggle('open');
});

// Handle user signup form


  