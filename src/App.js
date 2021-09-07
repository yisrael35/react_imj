import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Nav_bar from './components/Nav_bar'

function App() {
  return (
    <div className='App'>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
        <Nav_bar />
      </nav>
      <main className='form-signin'>
        <Login />
      </main>
    </div>
  )
}

export default App
