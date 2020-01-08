const asObject = ({notification}) => {
  return {
    notification
  }
}

const initialState = asObject('', '')

const notificationReducer = (state = initialState, action) => {
  if (action === undefined) return null

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data
    case 'CLEAR':
      return {
        notification: '',
        type: ''
      }
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  if (typeof time === 'number') {
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: {notification, type: 'success'}
      })
      setTimeout(
        () =>
          dispatch({
            type: 'CLEAR',
            data: {
              notification: '',
              type: 'success'
            }
          }),
        time
      )
    }
  } else {
    console.log('error!!!', notification)
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: {notification, type: 'error'}
      })
      setTimeout(
        () =>
          dispatch({
            type: 'CLEAR',
            data: {
              notification: '',
              type: 'error'
            }
          }),
        time
      )
    }
  }
}

export default notificationReducer
