const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');

const isMac = app.platform == "darwin";
const { dialog } = require('electron')
const {ipcMain} = require('electron'); // include the ipc module to communicate with render process ie to receive the message from render process

/**
 * @type {SettingsWindow}
 */
var settingsWindow = undefined;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (width = 1300, height = 900, htmlFile = "index.html") => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the html file of the window.
  mainWindow.loadFile(path.join(__dirname, htmlFile));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // returning the new object
  return mainWindow;
};

/**
 * Erstellt und öffnet ein neues Startfenster.
 * @param {Number} width 
 * @param {Number} height 
 */
const createStartWindow = (width = 800, height = 600) => {
  const win = createWindow(width, height, "index.html");
  
  win.setMenu(createMenu());

  return win;
};

/**
 * Erstellt und öffnet ein neues Einstellungsfenster.
 * @param {Number} width 
 * @param {Number} height 
 */
const openSettingsWindow = (width = 800, height = 600) => {
  if(settingsWindow == undefined)
  {
    settingsWindow = createWindow(width, height, "./windows/settings/settings.html");

    // Events
    settingsWindow.on("closed", () => {
      settingsWindow = undefined;
    });

    settingsWindow.setMenu(createMenu());
  } else {
    // Wenn das Fenster nicht geschlossen wurde, dann soll es in den Fokus geholt werden.
    settingsWindow.focus();
  }
  
  return settingsWindow;
}

const createMenu = () => {
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'Start',
      submenu: [
        { type: "separator" },
        isMac ? { role: 'close' } : { role: 'quit' },
      ]
    },
    {
      label: "Übungen",
      submenu: [
        { label: 'Rücken'},
        { label: 'Schultern'},
        { label: 'Augen'}
      ]
    },
    { 
      role: 'help',
      submenu: [
        {
          label: "Einstellungen",
          click: settings_onClick
        },
        {
          label: 'Lerne Mehr',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ]

  return Menu.buildFromTemplate(template);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createStartWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createStartWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Click-Events
/**
 * Wird ausgeführt, wenn das MenuItem "Einstellungen" gedrückt wird.
 * @param {MenuItem} sender 
 * @param {BrowserWindow} browserWindow 
 * @param {KeyboardEvent} event 
 */
function settings_onClick(sender, browserWindow, event)
{
  openSettingsWindow();
}

//IPC - Events
ipcMain.on("settingsWindow_close", function(event, arg) {
  const response = dialog.showMessageBox(null);
});