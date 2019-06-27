/**
 * Receives a message from the component that called this action.
 * Use getFirestore middleware to create a firestore db instance.
 * Here firestore === db
 * More https://firebase.google.com/docs/firestore/manage-data/add-data
 * @param {*} message 
 * @returns async Function that dispatches reducers 
 */
export const createMessage = (message = {}) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()

  try {
    // save message in firestore
    await firestore.collection('messages').add({
      ...message,
      date: new Date(),
      isNew: true
    })

    dispatch({
      type: 'CREATE_MESSAGE', // I would normally user CONSTANTS for type names to avoid using magic strings.
      message
    })
  } catch (error) {
    dispatch({
      type: 'CREATE_MESSAGE_ERROR',
      error
    })
  }
}

/**
 * Receives a privateMessages array and makes sure that they are marked as read
 * "isNew: false" in the Firestore db.
 * @param {*} privateMessages 
 * @returns async Function that dispatches reducers 
 */
export const markPrivateMessagesAsRead = (privateMessages = []) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()

  try {
    const batch = firestore.batch()

    privateMessages.forEach(message => {
      const messageRef = firestore.collection('messages').doc(message.id)
      batch.update(messageRef, { isNew: false })
    })

    await batch.commit()

    /**
     * There's no need to dispatch the new state because Firestore connects
     * with the app via web sockets and the middleware handles the rest
     */
  } catch (error) {
    dispatch({
      type: 'EDIT_MESSAGES_ERROR',
      error
    })
  }
}
