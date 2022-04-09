import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/index'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import CreateBid from './pages/CreateBid'
import Bids from './pages/Bids'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import ProfileSettings from './pages/ProfileSettings'
import Reports from './pages/Reports'
import Events from './pages/Events'
import Clients from './pages/Clients.js'
import TwoFaVerification from './pages/TwoFaVerification'
import Suppliers from './pages/Suppliers'
import Tests from './pages/Tests'

//components
import NavBar from './components/general/NavBar'
import SnackBar from './components/general/SnackBar'
import PrivateRoute from './components/general/PrivateRoutes'
import PopUp from './components/general/PopUp'
import Loading from './components/general/Loading'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <SnackBar />
          <NavBar />
          <PopUp />
          <Loading />
          <main>
            <Switch>
              <Route path='/Login' component={() => <Login />} />
              <Route path='/ForgotPassword' component={() => <ForgotPassword />} />
              <Route path='/ResetPassword/:token' component={() => <ResetPassword />} />
              <Route path='/TwoFaVerification' component={TwoFaVerification} />
              <PrivateRoute path='/Home' exact component={() => <Home />} />
              <PrivateRoute path='/Register' component={Register} />
              <PrivateRoute path='/Users' component={Users} />
              <PrivateRoute path='/Bids' component={Bids} />
              <PrivateRoute path='/Events' component={Events} />
              <PrivateRoute path='/Reports' component={Reports} />
              <PrivateRoute path='/CreateBid' component={CreateBid} />
              <PrivateRoute path='/ProfileSettings' component={ProfileSettings} />
              <PrivateRoute path='/Clients' component={Clients} />
              <PrivateRoute path='/Suppliers' component={Suppliers} />
              <PrivateRoute path='/Tests' component={Tests} />
              <PrivateRoute path='/*' component={Login} />
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  )
}

export default App
