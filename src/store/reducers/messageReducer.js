const initState = {
  messages: [
    {id: 1, author: 'Romain Ville', content: 'OMG! Cool stuff here!', date: 'July 20, 14:05', isPublic: true},
    {id: 2, author: 'Romain Ville', content: 'Hey Cesar, you there?', date: 'July 20, 14:06', isPublic: false},
    {id: 3, author: 'Romain Ville', content: 'Answer me! :(', date: 'July 20, 14:06', isPublic: false}
  ]
}

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_MESSAGE':
      console.log('created', action.message)
      return state

    default:
      return state
  }
}

export default messageReducer