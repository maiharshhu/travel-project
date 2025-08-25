// dashboard.js
import { getAuth, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { app } from "../firebase-config.js"; // 

const auth = getAuth(app);

// Elements
const userNameEl = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

// ✅ Check user login status
onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById("userName").textContent = "Welcome " + (user.displayName || user.email);
    } else {
        // Redirect if not logged in
        window.location.href = "./index.html";
    }
});

// ✅ Handle logout
logoutBtn?.addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "./index.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout failed:", error);
        alert("An error occurred during logout.");
    }
});


// Get the necessary elements from the HTML
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

// Add an event listener to the menu button
menuBtn.addEventListener("click", () => {
    // Toggle the 'open' class on the nav links element
    navLinks.classList.toggle("open");
});