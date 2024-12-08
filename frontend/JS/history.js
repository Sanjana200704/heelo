document.addEventListener("DOMContentLoaded", () => {
    const historyTableBody = document.querySelector("#historyTable tbody");
    const loader = document.getElementById("loader");
  
    // Function to fetch history from the backend API
    const fetchHistory = async () => {
      loader.style.display = "block"; // Show the loader
      try {
        const response = await fetch("http://localhost:5000/api/history"); // Update with your backend API endpoint
        if (!response.ok) throw new Error("Failed to fetch history");
  
        const history = await response.json(); // Parse the JSON response
        loader.style.display = "none"; // Hide the loader
  
        // Check if history is empty
        if (history.length === 0) {
          const row = document.createElement("tr");
          row.innerHTML = `<td colspan="3" style="text-align:center;">No history found</td>`;
          historyTableBody.appendChild(row);
          return;
        }
  
        // Populate the table with history
        history.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.query}</td>
            <td>${new Date(item.date).toLocaleString()}</td>
          `;
          historyTableBody.appendChild(row);
        });
      } catch (error) {
        loader.textContent = "Failed to load history. Please try again later.";
        console.error("Error fetching history:", error);
      }
    };
  
    // Call fetchHistory on page load
    fetchHistory();
  });
  