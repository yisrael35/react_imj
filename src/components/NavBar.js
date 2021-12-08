import React ,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from '../redux/Auth/action'
const words_he = require('../utils/words_he').words_he

const Nav = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const permissions = useSelector((state) => state.auth.permissions)
  const dispatch = useDispatch()
  const logout = async () => {
    dispatch(authActions.logout())
  }
  
  useEffect(() => {
    const token = localStorage.getItem('TokenAccess')
    if (token) {
      dispatch(authActions.check_if_token_exist(token))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  let menu
  if (!isAuthenticated) {
    menu = (
      <ul className='navbar-nav me-auto mb-2 mb-md-0'>
        <li className='nav-item active'>
          <Link to='Login' className='nav-link'>
            {words_he['login']}
          </Link>
        </li>
      </ul>
    )
  } else {
    if (permissions === 1) {
      menu = (
        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
          <li className='nav-item active'>
            <Link to='/ProfileSettings' className='nav-link'>
              {words_he['profile_settings']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Bids' className='nav-link'>
              {words_he['bids']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/CreateBid' className='nav-link'>
              {words_he['new_bid']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Register' className='nav-link'>
              {words_he['create_new_user']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Users' className='nav-link'>
              {words_he['users']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Login' className='nav-link' onClick={logout}>
              {words_he['logout']}
            </Link>
          </li>
        </ul>
      )
    } else if (permissions === 2) {
      menu = (
        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
          <li className='nav-item active'>
            <Link to='/ProfileSettings' className='nav-link'>
              {words_he['profile_settings']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/CreateBid' className='nav-link'>
              {words_he['new_bid']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/login' className='nav-link' onClick={logout}>
              {words_he['logout']}
            </Link>
          </li>
        </ul>
      )
    }
  }

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
      <div className='container-fluid'>
        <Link to='Home' className='navbar-brand'>
          {words_he['home']}
        </Link>

        <div>{menu}</div>
      </div>
    </nav>
  )
}

export default Nav
