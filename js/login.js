import { auth } from "../firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Array of background image URLs
const backgrounds = [
    "https://images.pexels.com/photos/31785128/pexels-photo-31785128.jpeg",
    "https://images.pexels.com/photos/947185/pexels-photo-947185.jpeg",
    "https://images.pexels.com/photos/1059078/pexels-photo-1059078.jpeg",
    "https://images.pexels.com/photos/33511530/pexels-photo-33511530.jpeg",
    "https://images.pexels.com/photos/257499/pexels-photo-257499.jpeg",
    "https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg",
    "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
    "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg",
];

function changeBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
}

// Change immediately on load
changeBackground();

// Repeat every 5 seconds
setInterval(changeBackground, 3000);

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const forgotPasswordLink = document.getElementById("forgotPassword");


signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


// This code is for signupform information getting form from end and capture here
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;

    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // update display name
        await updateProfile(userCredential.user, { displayName: name });
        alert('Account created! Please Sign In.');
        // Optionally switch to Sign In form
        showSignInForm();
        form.reset();
    } catch (error) {
        alert(error.message);
    }
});

// Login form 
// This code is for signupform information getting form from end and capture here
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        // Redirect user to dashboard or main page
        window.location.href = "./dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});


//  forgot password code logic

forgotPasswordLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector(".sign-in-container form input[type='email']");
    const email = emailInput.value.trim();

    if (!email) {
        alert("Please Enter Your Email Address To Reset Password");
        emailInput.focus();
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        alert(`Password reset email sent to ${email} Please check your inbox.`)
    } catch (error) {
        alert("Error while sending reset Email:" + error.message);
    }
});





