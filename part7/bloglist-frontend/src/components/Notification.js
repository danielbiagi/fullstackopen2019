import React from 'react'
import {connect} from 'react-redux'
import {Message} from 'semantic-ui-react'

const Notification = props => {
  const {notification} = props.notification
  if (notification === undefined || notification === '') {
    return null
  }

  const floatStyle = {
    position: 'absolute',
    zIndex: 9,
    left: 20,
    right: 20,
    bottom: 40,
    margin: 'auto'
  }

  return (
    <Message positive style={floatStyle}>
      <pre>{notification}</pre>
    </Message>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification ? state.notification : undefined
  }
}

export default connect(mapStateToProps, null)(Notification)
