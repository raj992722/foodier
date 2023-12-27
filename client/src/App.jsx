import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicCard from './pages/home/BasicCard';

import Categories from './pages/home/Categories';
import Banner from './components/Banner';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      
      <Banner />
    </>
  )
}

export default App
