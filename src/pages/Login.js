// import React from 'react'

// const Login = () => {
//   return (
//     <form>
//       <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
//       <div className='form-floating'>
//         <input type='email' className='form-control' id='floatingInput' placeholder='name@example.com' />
//         <label for='floatingInput'>Email address</label>
//       </div>
//       <div className='form-floating'>
//         <input type='password' className='form-control' id='floatingPassword' placeholder='Password' />
//         <label for='floatingPassword'>Password</label>
//       </div>
//       <div className='checkbox mb-3'>
//         <label>
//           <input type='checkbox' value='remember-me' /> Remember me
//         </label>
//       </div>
//       <button className='w-100 btn btn-lg btn-primary' type='submit'>
//         Sign in
//       </button>
//       <p className='mt-5 mb-3 text-muted'>© 2017–2021</p>
//     </form>
//   )
// }

// export default Login
import React, { SyntheticEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

    const response = await fetch(process.env.REACT_APP_REST_IMJ_URL + '/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username: 'yisraelb',
        password,
      }),
    })

    const content = await response.json()
    console.log(content)
    setRedirect(true)
    props.setName(content.name)
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={submit}>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
      <input type='email' className='form-control' placeholder='Email address' required onChange={(e) => setEmail(e.target.value)} />

      <input type='password' className='form-control' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        Sign in
      </button>
    </form>
  )
}

export default Login
