import React from 'react'
import styles from './styles'

const Modal = props => {
  return (
    <div
      style={styles.background}
      onClick={event => {
        props.onClose()
      }}
    >
      <div style={styles.content} onClick={event => event.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
