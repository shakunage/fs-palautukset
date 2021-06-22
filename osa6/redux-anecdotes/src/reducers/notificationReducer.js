const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.string
        case 'HIDE':
            return null
        default:
            return null
      }
  }

const hide = () => {
    return ({
        type: 'HIDE'
    })
}

const show = (string) => {
    return ({
        type: 'SET_NOTIFICATION',
        string: string
    })
}

export const setNotification = (string, duration) => {


    const realDuration = duration * 1000

    return dispatch => {
        dispatch(show(string))
        setTimeout( () => dispatch(hide()), realDuration )
      }
}

  export default notificationReducer