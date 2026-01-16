const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server"); // <-- check connection
});

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
            ? `<button onclick="acceptEmergency('${emergency._id}')">Accept</button>`
            :`<button onclick="rejectEmergency('${emergency._id}')">Reject</button>`
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
});

socket.on("EmergencyAccepted","EmergencyRejected",(emergency) => {
    const li = document.getElementById(emergency._id);
    if (li) {
        li.querySelector("span").innerText = emergency.status;
        const btn = li.querySelector("button");
        if (btn) btn.remove();
    }
});
/*socket.on("EmergencyRejected", (emergency) => {
    const li = document.getElementById(emergency._id);
    if (li) {
        li.querySelector("span").innerText = emergency.status;
        const btn = li.querySelector("button");
        if (btn) btn.remove();
    }
});*/


loadEmergencies();
