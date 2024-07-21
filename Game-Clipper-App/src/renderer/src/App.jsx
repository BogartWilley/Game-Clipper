import React from 'react'
import { useEffect } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const pyIpcHandle = () => {
    window.electron.ipcRenderer.send('run-python-script')
  }

  React.useEffect(() => {
    window.electron.ipcRenderer.on('python-script-output', (data) => {
      console.log(`Python Script Output: ${data}`)
    })

    window.electron.ipcRenderer.on('python-script-error', (data) => {
      console.error(`Python Script Error: ${data}`)
    })

    window.electron.ipcRenderer.on('python-script-close', (code) => {
      console.log(`Python Script exited with code: ${code}`)
    })
  }, [])
  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={pyIpcHandle}>
            Start py script
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
