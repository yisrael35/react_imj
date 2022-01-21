export let ws = null
let messages = []
let last_token

export const init_ws = ({ token }) => {
  try {
    if ((ws === null || ws.readyState === 3) && token) {
      last_token = token
      ws = new WebSocket(`${process.env.REACT_APP_WS_IMJ_URL}/?token=${token}`)
    }

    ws.onopen = () => {
      messages.forEach((message) => {
        ws.send(JSON.stringify(message))
      })
    }

    ws.onmessage = (message) => {
      if (message.data.size !== 0) {
        const response = JSON.parse(message.data)
        postMessage(response)
      }
    }
    ws.onclose = () => {
      console.log('closing ws connection')
    }
    ws.onerror = (err) => {
      if (ws.code !== 4000) {
        setTimeout(() => {
          init_ws({ token: last_token })
        }, 2000)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const send_message = (data) => {
  try {
    if (ws.readyState !== 1) {
      messages.push(data)
    } else {
      ws.send(JSON.stringify(data))
    }
  } catch (error) {
    console.log(error)
  }
}

export const close_ws = () => {
  if (ws?.readyState === 1) {
    ws.send(JSON.stringify({ type: 'close-connection' }))
    ws.close()
    ws = null
  }
}
