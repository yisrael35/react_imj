import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './redux/index'
import PrivateRoute from './components/PrivateRoutes'
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
    <Provider store={store}>
      <div className='App'>
        <Router>
          <NavBar name={name} setName={setName} />

          <main className='form-signin'>
            <Switch>
              <PrivateRoute path='/Home' exact component={() => <Home name={name} />} />
              <Route path='/Login' component={() => <Login setName={setName} />} />
              <PrivateRoute path='/register' component={Register} />
              <PrivateRoute path="/*" component={Login} />
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
  )
}

export default App
