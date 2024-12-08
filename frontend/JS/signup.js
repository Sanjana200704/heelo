document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Get the values from the form fields 
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const backendURL = "http://127.0.0.1:5000"; // Backend URL

  try {
    // Make a POST request to your signup API endpoint
    const response = await fetch(`${backendURL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Include username in the request body
    });

    // Check if the response is okay (status 200-299)
    if (response.ok) {
      const data = await response.json(); // Parse JSON response
      localStorage.setItem("auth_token", data.token); // Store the token in localStorage
      alert("Signup successful! Please log in.");
      window.location.href = "../HTML/login.html"; // Redirect to login page after successful signup
    } else {
      // If the response is not okay, get the error message and show it
      const error = await response.json();
      alert(error.message || "Failed to sign up. Please try again.");
    }
  } catch (err) {
    // If an error occurs during the fetch request
    console.error("Signup error:", err);
    alert("Something went wrong. Please try again later.");
  }
});
