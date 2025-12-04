// --------------Pickup shedule ---------

const pickupCard = document.querySelectorAll(".card")[0];
const pickupModal = document.getElementById("pickupModal");
const closeModalBtn = document.getElementById("closeModal");
const areaSelect = document.getElementById("areaSelect");
const timeResult = document.getElementById("timeResult");
const savedReminder = document.getElementById("savedReminder");
const setReminderBtn = document.getElementById("setReminder");

// Pickup times
const pickupTimes = {
    uttara: "Monday & Thursday - 7:00 AM",
    mirpur: "Tuesday & Friday - 8:00 AM",
    banani: "Wednesday & Saturday - 6:30 AM",
    dhanmondi: "Monday, Wednesday, Friday - 7:30 AM",
    mohakhali:"Sunday, Monday - 5:00 PM"
};

// Function to close all modals
function closeAllModals() {
    const modals = [pickupModal, document.getElementById("recyclingModal")];
    modals.forEach(modal => {
        if(modal.style.display === "block"){
            modal.classList.remove("show");
            setTimeout(() => { modal.style.display = "none"; }, 300);
        }
    });
}

// --- Pickup modal open ---
pickupCard.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllModals(); 
    pickupModal.style.display = 'block';
    pickupModal.classList.add('show');

    const area = areaSelect.value;
    timeResult.textContent = `Pickup Time: ${pickupTimes[area]}`;

    const reminder = localStorage.getItem('pickupReminder');
    savedReminder.textContent = reminder ? `Previously set reminder: ${reminder}` : '';
});

// --- Close modal ---
closeModalBtn.addEventListener('click', () => {
    closeAllModals();
});

// --- Prevent closing when clicking inside ---
pickupModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// --- Outside click closes modal ---
window.addEventListener('click', () => {
    closeAllModals();
});

// --- Update time on area change ---
areaSelect.addEventListener('change', () => {
    const area = areaSelect.value;
    timeResult.textContent = `Pickup Time: ${pickupTimes[area]}`;
});

// --- Set reminder ---
setReminderBtn.addEventListener('click', () => {
    const area = areaSelect.value;
    const reminderText = `${area} - ${pickupTimes[area]}`;
    localStorage.setItem('pickupReminder', reminderText);
    savedReminder.textContent = `Previously set reminder: ${reminderText}`;
    alert(`Reminder set for ${area}: ${pickupTimes[area]}`);
});


// ------------- Recycling Centers -------------
const recyclingCard = document.querySelectorAll(".card")[1];
const recyclingModal = document.getElementById("recyclingModal");
const recyclingAreaSelect = document.getElementById("recyclingAreaSelect");
const recyclingResult = document.getElementById("recyclingResult");
const closeRecyclingModal = document.getElementById("closeRecyclingModal");

let map, markers = [];

// Example recycling locations with lat/lng
const recyclingData = {
    "uttara": [
        { name: "Bin A – Sector 4", lat: 23.874, lng: 90.398 },
        { name: "Bin B – Sector 6", lat: 23.878, lng: 90.402 }
    ],
    "mirpur": [
        { name: "Bin C – Mirpur 10", lat: 23.810, lng: 90.366 },
        { name: "Bin D – Mirpur 12", lat: 23.812, lng: 90.370 }
    ],
    "banani": [
        { name: "Bin E – Banani 32", lat: 23.780, lng: 90.400 },
        { name: "Bin F – Banani 36", lat: 23.784, lng: 90.404 }
    ],
    "dhanmondi": [
        { name: "Bin G – Dhanmondi 27", lat: 23.746, lng: 90.374 },
        { name: "Bin H – Dhanmondi 32", lat: 23.750, lng: 90.378 }
    ],
    "mohakhali": [
        { name: "Bin I – Mohakhali 12", lat: 23.780, lng: 90.420 },
        { name: "Bin J – Mohakhali DOHS", lat: 23.782, lng: 90.425 }
    ]
};

// Function to close all modals
function closeAllModals() {
    const modals = [recyclingModal, document.getElementById("pickupModal")];
    modals.forEach(modal => {
        if(modal.style.display === "block"){
            modal.classList.remove("show");
            setTimeout(() => { modal.style.display = "none"; }, 300);
        }
    });
}

// Show recycling data + map
function showRecyclingData(area) {
    const bins = recyclingData[area];
    recyclingResult.innerHTML = `<strong>${area.toUpperCase()}:</strong><br>` +
        bins.map(b => b.name).join("<br>");

    // Initialize or update map
    if(!map){
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: {lat: bins[0].lat, lng: bins[0].lng}
        });
    } else {
        map.setCenter({lat: bins[0].lat, lng: bins[0].lng});
        markers.forEach(m => m.setMap(null));
        markers = [];
    }

    bins.forEach(b => {
        const marker = new google.maps.Marker({
            position: {lat: b.lat, lng: b.lng},
            map: map,
            title: b.name
        });
        markers.push(marker);
    });
}

// --- Open modal ---
recyclingCard.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAllModals();
    recyclingModal.style.display = "block";
    recyclingModal.classList.add("show");
    showRecyclingData(recyclingAreaSelect.value);
});

// --- Close modal ---
closeRecyclingModal.addEventListener("click", () => {
    closeAllModals();
});

// --- Prevent closing when clicking inside ---
recyclingModal.addEventListener("click", (e) => {
    e.stopPropagation();
});

// --- Outside click closes modal ---
window.addEventListener("click", () => {
    closeAllModals();
});

// --- Update area selection ---
recyclingAreaSelect.addEventListener("change", () => {
    showRecyclingData(recyclingAreaSelect.value);
});

recyclingCard.addEventListener("click", () => {
    showRecyclingData(recyclingAreaSelect.value); // map init এখানে হবে
});


// ----------End of recycling---------