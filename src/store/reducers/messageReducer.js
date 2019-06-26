const initState = {
  messages: []
}

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      return state

    case 'CREATE_MESSAGE_ERROR': 
      console.error('error during create message', action.error)
      return state

    default:
      return state
  }
}

export default messageReducer