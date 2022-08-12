import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import * as authActions from '../../redux/Auth/action'
import * as action_popUp from '../../redux/PopUp/action'
import Reports from '../../pages/Reports'

import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Tooltip, MenuItem, FormControlLabel, Switch } from '@mui/material/'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'

import Dictionary from '../../utils/dictionary'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
})
const Nav = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const permissions = useSelector((state) => state.auth.permissions)
  const two_fa_status = useSelector((state) => state.auth.two_fa_status)

  const dictionary = Dictionary()

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

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handle_report_click = () => {
    handleCloseNavMenu()
    const reports = <Reports />
    dispatch(action_popUp.setPopUp(reports))
  }

  const handle_switch_2fa = () => {
    dispatch(authActions.update_2fa_status(!two_fa_status))
  }
  const handle_go_to_login = () => {
    handleCloseNavMenu()
    dispatch(authActions.update_type(''))
  }

  let pages = []
  if (permissions !== 3 && isAuthenticated) {
    pages = [
      <Link to='/Events' key={'Events'} className='navbar_links' onClick={handleCloseNavMenu}>
        {dictionary['events']}
      </Link>,
      <Link to='/Bids' key={'Bids'} className='navbar_links' onClick={handleCloseNavMenu}>
        {dictionary['bids']}
      </Link>,
      <Link to='/Clients' key={'Clients'} className='navbar_links' onClick={handleCloseNavMenu}>
        {dictionary['clients']}
      </Link>,
      <Link to='/Suppliers' key={'Suppliers'} className='navbar_links' onClick={handleCloseNavMenu}>
        {dictionary['suppliers']}
      </Link>,
      <span className='navbar_links' key={'reports'} onClick={handle_report_click}>
        {dictionary['reports']}
      </span>,
      // <Link to='/Tests' className='navbar_links' key={'Tests'} onClick={handleCloseNavMenu}>
      //   Tests
      // </Link>,
    ]
  }
  let settings = []
  if (permissions === 1 && isAuthenticated) {
    settings.push(
      <FormControlLabel control={<Switch checked={two_fa_status} onChange={handle_switch_2fa} />} label='2FA' />,
      <Link to='/Users' key={'Users'} className='navbar_links' onClick={handleCloseNavMenu}>
        {dictionary['users']}
      </Link>
    )
  }
  settings.push(
    <Link to='/ProfileSettings' key={'ProfileSettings'} className='navbar_links' onClick={handleCloseNavMenu}>
      {dictionary['profile_settings']}
    </Link>,
    <Link to='/Login' key={'Login'} className='navbar_links' onClick={logout}>
      {dictionary['logout']} <LogoutIcon />
    </Link>
  )
  if (!isAuthenticated) {
    settings = [
      <Link to='/Login' key={'Login'} className='navbar_links' onClick={handle_go_to_login}>
        {dictionary['login']}
      </Link>,
    ]
    pages = []
  }

  return (
    <div style={{ position: 'sticky', top: 0 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar style={{ marginBottom: '24px' }} position='sticky'>
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                <Link to='/Home'>
                  <img src='logo2.png' alt='logo' style={{ marginLeft: '10px', height: '35px', width: '40px' }} />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Link to='/Home'>
                  <img src='logo2.png' alt='logo' style={{ marginLeft: '10px', height: '35px', width: '40px' }} />
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>{pages.map((page) => page)}</Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src='/broken-image.jpg' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem key={index}>
                      <Typography textAlign='center' onClick={handleCloseUserMenu}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Nav
