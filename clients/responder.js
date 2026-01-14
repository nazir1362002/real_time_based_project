const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server"); // <-- check connection
});

socket.on("Emergency", (data) => {
    console.log("Emergency received on client", data); // <-- debug
    document.getElementById("alert").innerText = data.message;
});