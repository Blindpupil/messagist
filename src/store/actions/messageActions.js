export const createMessage = (message) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()

  try {
    // save message in firestore
    await firestore.collection('messages').add({
      ...message,
      date: new Date(),
      isNew: true
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

export const markPrivateMessagesAsRead = (privateMessages) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()

  try {
    const batch = firestore.batch()

    privateMessages.forEach(message => {
      const messageRef = firestore.collection('messages').doc(message.id)
      batch.update(messageRef, { isNew: false })
    })

    await batch.commit()
  } catch (error) {
    dispatch({
      type: 'EDIT_MESSAGES_ERROR',
      error
    })
  }
}
