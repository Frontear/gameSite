window.addEventListener("load", function () {
    setTime(); //Initial call to show time immediatly
    setInterval(setTime, 1000); // Set a timer to call function setTime every 1000ms, or 1 second.
});

function setTime() {
    document.getElementById("time").innerHTML = new Date().toLocaleTimeString(); // Find the element with ID date, and modify contents to the local time, which gets time from System Clock.
}