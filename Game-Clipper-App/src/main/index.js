import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { spawn } from 'node:child_process'
import path from 'path'
import icon from '../../resources/icon.png?asset'
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Launching webserver

  // Start the server.js
  // Start the server.js
  const serverPath = path.join(__dirname, '..', '..', 'obs-webserver', 'server', 'server.js')
  const server = spawn('node', [serverPath])

  server.stdout.on('data', (data) => {
    console.log(`server.js stdout: ${data}`)
  })

  server.stderr.on('data', (data) => {
    console.error(`server.js stderr: ${data}`)
  })

  server.on('close', (code) => {
    console.log(`server.js process exited with code ${code}`)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// IPC handler for running the Python script
ipcMain.on('run-python-script', (event) => {
  try {
    const exePath = path.join(
      __dirname,
      '..',
      '..',
      // '..',  removes one path for running the app using pnpm dev

      'compiled-scripts',
      'script.exe'
    )
    console.log('Logging the path now')
    console.log(exePath)
    const py = spawn(exePath)

    py.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
      event.reply('python-script-output', data.toString())
    })

    py.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
      event.reply('python-script-error', data.toString())
    })

    py.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      event.reply('python-script-close', code)
    })
  } catch (err) {
    console.log(err)
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
