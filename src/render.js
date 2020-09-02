const btnStart = document.getElementById("start");
const btnStop  = document.getElementById("stop");

const ipcRenderer = require('electron').ipcRenderer;

btnStart.onclick = () => {
    sendNotification("Bobby is active!", "Bobby is now watching you!");
};

