import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/index'
import PrivateRoute from './components/PrivateRoutes'
import SnackBar from './components/SnackBar'
function App() {
  const [name, setName] = useState('')
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <NavBar name={name} setName={setName} />
          <SnackBar />
          <main className='form-signin'>
            <Switch>
              <PrivateRoute path='/Home' exact component={() => <Home name={name} />} />
              <Route path='/Login' component={() => <Login />} />
              <Route path='/ForgotPassword' component={() => <ForgotPassword />} />
              <Route path='/ResetPassword/:token' component={() => <ResetPassword />} />
              <PrivateRoute path='/register' component={Register} />
              <PrivateRoute path='/*' component={Login} />
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  )
}

export default App
