import React from 'react'

const Nav_bar = () => {
  return (
    <div className='container-fluid'>
      <div className='collapse navbar-collapse' id='navbarCollapse'>
        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
          <li className='nav-item'>
            <a className='nav-link active' aria-current='page' href='#'>
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Login
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#'>
              Register
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Nav_bar
