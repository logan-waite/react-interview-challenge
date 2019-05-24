import React from 'react'
import styles from './styles'
import inputStyles from 'src/components/TextInput/styles'

const Search = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <input
        style={inputStyles.input}
        placeholder='Search...'
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Search
