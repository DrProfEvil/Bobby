// include the ipc module to communicate with main process.
const ipcRenderer = require('electron').ipcRenderer; 

$(document).on("close", () => {
    ipcRenderer.send("settingsWindow_Close");
});