import React from 'react'
import styles from './styles'

const TextInput = ({ name, value, onChange, placeholder }) => (
  <div style={styles.container}>
    <label style={styles.label} htmlFor={name}>
      {name}
    </label>
    <input
      style={styles.input}
      id={name}
      type='text'
      name={name}
      value={value}
      placeholder={placeholder || name}
      onChange={onChange}
    />
  </div>
)

export default TextInput
