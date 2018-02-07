const fs = require('fs');
const url = require('url');
const path = require('path');
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  BrowserView,
} = require('electron');

const env = process.env.NODE_ENV || 'development';
let mainWindow;

function createWindow() {
  const mainMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin')
    mainMenuTemplate.unshift({});


  if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'F12',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          },
        }, {
          role: 'reload',
        },
      ],
    });
  }

  let mainURL;
  if (env === 'production') {
    mainURL = url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true,
    });
  } else {
    mainURL = url.format({
      pathname: 'localhost:4200',
      protocol: 'http:',
      slashes: true,
    });
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
    },
  });

  mainWindow.loadURL(mainURL);

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  if (mainWindow === null)
    createWindow();
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
