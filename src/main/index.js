const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("node:path");
const { is } = require("@electron-toolkit/utils");

Menu.setApplicationMenu(null);

function createWindow() {
  const win = new BrowserWindow({
    width: 1680,
    height: 1000,
    minWidth: 1366,
    minHeight: 860,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#ECE9D8",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
