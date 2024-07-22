import React from 'react'
import { useEffect } from 'react'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import Background from './components/background/Background'
function App() {
  const pongHandle = () => window.electron.ipcRenderer.send('ping')
  const ipcHandle = (type) => {
    window.electron.ipcRenderer.send(`run-${type}-script`)
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
      <Background />
    </>
  )
}

export default App
