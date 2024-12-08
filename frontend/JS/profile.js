document.addEventListener("DOMContentLoaded", () => {
  const userData = {
    name: "Sanjana",
    dob: "2004-07-20",
    email: "sanjanasharma@gmail.com",
    phone: "2738463341",
  };

  const profilePic = document.getElementById("profilePic");
  const changePicBtn = document.getElementById("changePicBtn");
  const updateBtn = document.getElementById("updateBtn");

  // Randomly generate avatar on page load
  const randomSeed = Math.floor(Math.random() * 10000);
  profilePic.src = `https://picsum.photos/200/300`;

  // Change profile picture
  changePicBtn.addEventListener("click", () => {
    const newRandomSeed = Math.floor(Math.random() * 10000);
    profilePic.src = `njk`;
  });

  // Update user data (this will send data to backend)
  updateBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const updatedData = { name, dob, email, phone };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Profile updated successfully!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    }
  });
});

  