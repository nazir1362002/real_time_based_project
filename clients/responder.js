const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server"); // <-- check connection
});

/*socket.on("Emergency", (data) => {
    console.log("Emergency received on client", data); // <-- debug
    document.getElementById("alert").innerText = data.message;
});*/

const alertList = document.getElementById("alerts");

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

loadEmergencies();