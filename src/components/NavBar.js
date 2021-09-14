import React from 'react'
import { Link } from 'react-router-dom'
const words_he = require('../helper/words_he').words_he

const Nav = (props) => {
  const logout = async () => {
    await fetch(process.env.REACT_APP_REST_IMJ_URL + '/auth', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    props.setName('')
  }

  let menu

  if (props.name === '') {
    menu = (
      <ul className='navbar-nav me-auto mb-2 mb-md-0'>
        <li className='nav-item active'>
          <Link to='Login' className='nav-link'>
            {words_he['login']}
          </Link>
        </li>
        <li className='nav-item active'>
          <Link to='/register' className='nav-link'>
            {words_he['register']}
          </Link>
        </li>
      </ul>
    )
  } else {
    menu = (
      <ul className='navbar-nav me-auto mb-2 mb-md-0'>
        <li className='nav-item active'>
          <Link to='/login' className='nav-link' onClick={logout}>
            {words_he['logout']}
          </Link>
        </li>
      </ul>
    )
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
