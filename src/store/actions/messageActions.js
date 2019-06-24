export const createMessage = (message) => (dispatch, getState) => {
  // make async call

  dispatch({
    type: 'CREATE_MESSAGE',
    message
  })
}