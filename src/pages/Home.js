import React from 'react'
const words_he = require('../utils/words_he').words_he

const Home = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <a href='http://localhost:3001/assets/README.md'>readme</a> */}

      <p>{words_he['welcome']}</p>
      {/* {props.name ? `${words_he['hello']} ` + props.name : `${words_he['please_sign_in']}`} */}
    </div>
  )
}

export default Home
