export const createMessage = (message) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()

  try {
    // save message in firestore
    await firestore.collection('messages').add({
      ...message,
      date: new Date()
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