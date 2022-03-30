import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from '../../redux/Auth/action'
import * as action_popUp from '../../redux/PopUp/action'
import Reports from '../../pages/Reports'
// import LogoutIcon from '@mui/icons-material/Logout';
const words_he = require('../../utils/words_he').words_he

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

  const handle_report_click = () => {
    const reports = <Reports />
    dispatch(action_popUp.setPopUp(reports))
  }

  let menu
  if (!isAuthenticated) {
    menu = (
      <ul className='navbar-nav me-auto mb-2 mb-md-0'>
        <li className='nav-item active'>
          <Link to='/Login' className='nav-link'>
            {words_he['login']}
          </Link>
        </li>
      </ul>
    )
  } else {
    if (permissions === 1) {
      menu = (
        <ul className='navbar-nav  sticky-top me-auto mb-2 mb-md-0'>
          <li className='nav-item active'>
            <Link to='/Tests' className='nav-link'>
              Tests
            </Link>
          </li>
          <li className='nav-item active '>
            <span className='nav-link' onClick={handle_report_click}>
              {words_he['reports']}
            </span>
          </li>
          <li className='nav-item active'>
            <Link to='/Suppliers' className='nav-link'>
              {words_he['suppliers']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Events' className='nav-link'>
              {words_he['events']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Clients' className='nav-link'>
              {words_he['clients']}
            </Link>
          </li>
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
            <Link to='/Users' className='nav-link'>
              {words_he['users']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Login' className='nav-link' onClick={logout}>
              {words_he['logout']}
              {/* <LogoutIcon/> */}
              {/* <FaSignOutAlt style={{ fontSize: '28px', margin: '4px' }} /> */}
            </Link>
          </li>
        </ul>
      )
    } else if (permissions === 2) {
      menu = (
        <ul className='navbar-nav  sticky-top me-auto mb-2 mb-md-0'>
          {/* <li className='nav-item active'>
            <Link to='/Tests' className='nav-link'>
              Tests
            </Link>
          </li> */}
          <li className='nav-item active '>
            <Link to='/Reports' className='nav-link'>
              {words_he['reports']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Suppliers' className='nav-link'>
              {words_he['suppliers']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Events' className='nav-link'>
              {words_he['events']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Clients' className='nav-link'>
              {words_he['clients']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/ProfileSettings' className='nav-link'>
              {words_he['profile_settings']}
              {/* <FaUserEdit style={{ fontSize: '28px', margin: '4px' }} /> */}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Bids' className='nav-link'>
              {words_he['bids']}
            </Link>
          </li>
          <li className='nav-item active'>
            <Link to='/Login' className='nav-link' onClick={logout}>
              {words_he['logout']}
              {/* <FaSignOutAlt style={{ fontSize: '28px', margin: '4px' }} /> */}
            </Link>
          </li>
        </ul>
      )
    } else if (permissions === 3) {
      menu = (
        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
          <li className='nav-item active'>
            <Link to='/ProfileSettings' className='nav-link'>
              {words_he['profile_settings']}
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
    <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4 sticky-top'>
      <div className='container-fluid'>
        <Link to='/Home' className='navbar-brand'>
          <img src='logo2.png' alt='logo' style={{ marginLeft: '10px', height: '35px', width: '40px' }} />
        </Link>
        <div>{menu}</div>
      </div>
    </nav>
  )
}

export default Nav
