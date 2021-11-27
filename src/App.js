import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/index'

//pages
import Home from './pages/Home'
import Bid from './pages/CreateBid'
import Login from './pages/Login'
import Users from './pages/Users'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'

//components
import NavBar from './components/NavBar'
import SnackBar from './components/SnackBar'
import PrivateRoute from './components/PrivateRoutes'

function App() {
  const [name, setName] = useState('')
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <NavBar name={name} setName={setName} />
          <SnackBar />
          <main>
            <Switch>
              <Route path='/Login' component={() => <Login />} />
              <Route path='/ForgotPassword' component={() => <ForgotPassword />} />
              <Route path='/ResetPassword/:token' component={() => <ResetPassword />} />
              <PrivateRoute path='/Home' exact component={() => <Home name={name} />} />
              <PrivateRoute path='/Register' component={Register} />
              <PrivateRoute path='/Users' component={Users} />
              <PrivateRoute path='/CreateBid' component={Bid} />
              <PrivateRoute path='/*' component={Login} />
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  )
}

export default App
