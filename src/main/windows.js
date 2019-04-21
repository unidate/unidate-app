import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { readFileSync } from 'fs'

export default function createWindow(windows, i, state = { width: 800, height: 600 }) {
  const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  const url = 'https://unidate.world/'

  windows[i] = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    type: 'textured',
    backgroundColor: 'grey',
    show: false,
    title: 'UniDate',
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../renderer/index.js'),
      nodeIntegration: false,
    },
  })

  // Emitted when the window is closed
  windows[i].on('closed', () => {
    // Dereference the window object
    windows.splice(i, 1)
  })

  windows[i].webContents.on('dom-ready', () => {
    windows[i].webContents.insertCSS(readFileSync(join(__dirname, '../renderer/styles/index.css'), 'utf8'))
    windows[i].show()
  })

  // Open links in external applications
  windows[i].webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  windows[i].webContents.setUserAgent(userAgent)
  windows[i].loadURL(url)
}
