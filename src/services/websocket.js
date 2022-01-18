export let ws = null
let messages = []
let token
export const connectWS = (incoming_token) => {
  if (incoming_token) {
    token = incoming_token
  }
  if ((ws === null || ws.readyState === 3) && token) {
    ws = new WebSocket(`${process.env.REACT_APP_WS_IMJ_URL}/?token=${token}`)
  }

  messages = []
}

export const sendEvent = (data, token) => {
  if (ws !== null) {
    if (ws.readyState !== 1) {
      messages.push(data)
    } else {
      ws.send(JSON.stringify(data))
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
      console.log("closing ws connection");
    }
    ws.onerror = (err) => {
      if (ws.code !== 4000) {
        setTimeout(function () {
          connectWS()
        }, 2000)
      }
    }
  } else {
    connectWS(token)
  }
}

export const closeWS = (token) => {
  if (ws) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'close-connection' }))
      ws.close()
      ws = null
    }
  }
}
