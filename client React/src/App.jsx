import { useState } from 'react'
import Header from './components/header/Header';
import Main from './components/main/Main';
import Success from './components/success/Success';
import Columns from './components/columns/Columns';

import './App.css'

  function App() {
    const [count, setCount] = useState(0)

    return (
      <div className='wrapper'>
        <Header />
        <Main />
        <Columns />
        <Success />
      </div>
    )
  }

export default App
