export const createMessage = (message) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore()

  // Will be provided by auth
  const name = 'Dude One'
  const userId = 'testuserid1'

  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  }
  const now  = new Date()
  const date = now.toLocaleDateString("en-US", dateOptions)

  try {
    // save message in firestore
    await firestore.collection('messages').add({
      ...message,
      date,
      author: name,
      authorId: userId
    })

    dispatch({
      type: 'CREATE_MESSAGE',
      message
    })
  } catch (error) {
    dispatch({
      type: 'CREATE_MESSAGE_ERROR',
      error
    })
  }
}