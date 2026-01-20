const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server"); // <-- check connection
});
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token || role !== "responder") {
    window.location.href = "login.html";
}

/*socket.on("Emergency", (data) => {
    console.log("Emergency received on client", data); // <-- debug
    document.getElementById("alert").innerText = data.message;
});*/

/*const alertList = document.getElementById("alerts");

// 1️⃣ Load existing emergencies
async function loadEmergencies() {
    const res = await fetch("http://localhost:5000/api/emergency");
    const data = await res.json();

    data.data.forEach(showEmergency);
}

// 2️⃣ Show emergency
function showEmergency(emergency) {
    const li = document.createElement("li");
    li.innerText = `${emergency.message} | Status: ${emergency.status}`;
    alertList.prepend(li);
}

// 3️⃣ Real-time update
socket.on("Emergency", (emergency) => {
    showEmergency(emergency);
});

loadEmergencies();*/


const alertList = document.getElementById("alerts");

async function loadEmergencies() {
    const res = await fetch("http://localhost:5000/api/emergency");
    const data = await res.json();
    data.data.forEach(showEmergency);
}

function showEmergency(emergency) {
    const li = document.createElement("li");
    li.id = emergency._id;

    li.innerHTML = `
      <strong>${emergency.message}</strong>
      <br>Status: <span>${emergency.status}</span>
      ${emergency.status === "pending"
            ? `<button
            onclick="acceptEmergency('${emergency._id}')">Accept</button>`
            : ''
        }
      ${emergency.status === "pending"
            ? `<button onclick="rejectEmergency('${emergency._id}')">Reject</button>`
            : ''
        }

        <hr/>
    `;

    alertList.prepend(li);
}

async function acceptEmergency(id) {
    await fetch(`http://localhost:5000/api/emergency/${id}/accept`, {
        method: "PUT",
    });
}
async function rejectEmergency(id) {
    await fetch(`http://localhost:5000/api/emergency/${id}/reject`, {
        method: "PUT",
    });
}

socket.on("Emergency", (emergency) => {
    showEmergency(emergency);

    if (emergency.location) {
        const { lat, lng } = emergency.location;

        if (emergencyMarker) {
            map.removeLayer(emergencyMarker);
        }

        emergencyMarker = L.marker([lat, lng], {
            title: "Emergency Location",
        }).addTo(map);
        drawRoute()
    }
});


socket.on("EmergencyAccepted", (emergency) => {
    const li = document.getElementById(emergency._id);
    if (li) {
        li.querySelector("span").innerText = emergency.status;
        const buttons = li.querySelectorAll("button");
        buttons.forEach(btn => btn.remove());
    }
});
socket.on("EmergencyRejected", (emergency) => {
    const li = document.getElementById(emergency._id);
    if (li) {
        li.querySelector("span").innerText = emergency.status;
        const buttons = li.querySelectorAll("button");
        buttons.forEach(btn => btn.remove());

    }
});
//For Static Map
const map = L.map("map").setView([23.8103, 90.4125], 13); // Dhaka



L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
}).addTo(map);


let emergencyMarker = null;
let routeLine = null;
let responderLatLng = [23.8103, 90.4125];
let responderMarker = L.marker([23.8103, 90.4125], { title: "Responder Location", }).addTo(map);

//For Interacting map marker
/*navigator.geolocation.watchPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        responderLatLng = [latitude, longitude];

        // Update marker position
        responderMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude]);
        //Send location to the server
        socket.emit("responderLocation", {
            lat: latitude,
            lng: longitude,
        });

        drawRoute()
        console.log("My location:", latitude, longitude);
    },
    (error) => {
        console.error("Location error", error);
    },
    {
        enableHighAccuracy: true,
    }
);

let otherResponderMarker = L.marker([23.8103, 90.4125],{title:"Responder Location",}).addTo(map);

socket.on("responderLocation", (location) => {
  otherResponderMarker.setLatLng([location.lat, location.lng]);
});*/

//For draw the routes
function drawRoute() {
    console.log("Responder:", responderLatLng);
    console.log("Emergency marker:", emergencyMarker);

    if (!responderLatLng || !emergencyMarker) return;

    const emergencyLatLng = emergencyMarker.getLatLng();

    if (routeLine) {
        map.removeLayer(routeLine);
    }

    routeLine = L.polyline(
        [responderLatLng, [emergencyLatLng.lat, emergencyLatLng.lng]],
        { color: "red" }
    ).addTo(map);
}




loadEmergencies();
drawRoute();

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

