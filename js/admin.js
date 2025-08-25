import { db } from '../firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const placeForm = document.getElementById('placeForm');
const hotelForm = document.getElementById('hotelForm');
const placeResult = document.getElementById('placeResult');
const hotelResult = document.getElementById('hotelResult');

// Places form submit
placeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    placeResult.textContent = 'Saving...';

    const formData = new FormData(placeForm);
    const data = {
        name: formData.get('name'),
        location: formData.get('location'),
        googleMap: formData.get('googleMap'),
        image: formData.get('image'),
        description: formData.get('description'),
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, 'places'), data);
        placeResult.textContent = '✅ Place saved!';
        placeForm.reset();
    } catch (error) {
        placeResult.textContent = '❌ Error saving place';
        console.error(error);
    }

    setTimeout(() => placeResult.textContent = '', 3000);
});

// Hotels form submit  
hotelForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hotelResult.textContent = 'Saving...';

    const formData = new FormData(hotelForm);
    const data = {
        name: formData.get('name'),
        location: formData.get('location'),
        toBook: formData.get('toBook'),
        image: formData.get('image'),
        description: formData.get('description'),
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, 'hotels'), data);
        hotelResult.textContent = '✅ Hotel saved!';
        hotelForm.reset();
    } catch (error) {
        hotelResult.textContent = '❌ Error saving hotel';
        console.error(error);
    }

    setTimeout(() => hotelResult.textContent = '', 3000);
});
