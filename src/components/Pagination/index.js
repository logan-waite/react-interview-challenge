import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import styles from './styles'

const Pagination = props => (
  <div style={styles.container}>
    <FontAwesomeIcon
      icon={faChevronLeft}
      style={styles.arrows}
      onClick={props.pageCallback(props.currentPage - 1)}
    />
    <span style={styles.page}>Page {props.currentPage}</span>
    <FontAwesomeIcon
      icon={faChevronRight}
      style={styles.arrows}
      onClick={props.pageCallback(props.currentPage + 1)}
    />
  </div>
)

export default Pagination
