import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Tabs from './components/Tabs';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1>Route App</h1>
        <Tabs />
      </div>
    </>
  )
}

export default App
