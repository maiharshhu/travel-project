import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMuMGE4qqtesCjYlfUaMFWJWeOR0Wke1Q",
    authDomain: "travel-data-7de90.firebaseapp.com",
    projectId: "travel-data-7de90",
    storageBucket: "travel-data-7de90.firebasestorage.app",
    messagingSenderId: "188112377500",
    appId: "1:188112377500:web:9d1c70f372043eed7a7f59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);

