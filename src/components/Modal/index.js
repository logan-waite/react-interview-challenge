import React from 'react'
import styles from './styles'

const Modal = props => {
  return (
    <div style={styles.background} onClick={props.onClose}>
      <div style={styles.content}>{props.children}</div>
    </div>
  )
}

export default Modal
