import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState } from 'react'

function App() {
  const [name, setName] = useState('')

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/user', {
  //         headers: { 'Content-Type': 'application/json' },
  //         credentials: 'include',
  //       })
  //       const content = await response.json()
  //       setName(content.name)
  //     } catch (error) {
  //       // console.log(error)
  //     }
  //   })()
  // })

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar name={name} setName={setName} />

        <main className='form-signin'>
          <Route path='/' exact component={() => <Home name={name} />} />
          <Route path='/login' component={() => <Login setName={setName} />} />
          <Route path='/register' component={Register} />
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
