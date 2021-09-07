import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Nav_bar from './components/Nav_bar'
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState('')

  useEffect(() => {
    ;(async () => {
      const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/user', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const content = await response.json()
      setName(content.name)
    })()
  })

  return (
    <div className='App'>
      <BrowserRouter>
        <Nav_bar name={name} setName={setName} />

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
