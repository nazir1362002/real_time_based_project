const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("User connected to server"); // debug
});

/*document.getElementById("alertBtn").addEventListener("click", () => {
    socket.emit("Emergency", { message: "Emergency Alert 🚑" });
});*/
/*document.getElementById("alertBtn").addEventListener("click", () => {
    fetch("http://localhost:5000/api/emergency", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: "Road accident happened in Dhaka 🚑"
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Emergency sent:", data);
            alert("Emergency sent to responders! 🚨"); // optional feedback
        })
        .catch(err => console.error("Error sending emergency:", err));
});*/

//Add location sharing features
document.getElementById("alertBtn").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        await fetch("http://localhost:5000/api/emergency", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Road accident happened in Dhaka 🚑",
                location: {
                    lat: latitude,
                    lng: longitude,
                },
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Emergency sent:", data);
                alert("Emergency sent to responders! 🚨");
            })
            .catch(err => console.error("Error sending emergency:", err));

    });
});
