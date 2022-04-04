const { app, BrowserWindow, Menu } = require('electron');

const createWindow = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    icon: __dirname + "/icon.icns",
  });
  window.loadFile('index.html');

  const template = [
    {
      label: 'Today',
      submenu: [],
    },
    {
      label: 'Week',
      submenu: [],
    },
  ];

  const customMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(customMenu)
}

app.whenReady().then(() => {
  createWindow();
})