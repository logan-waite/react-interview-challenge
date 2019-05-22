import React from 'react'
import styles from './styles'

const Search = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <input
        placeholder='Search...'
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Search
