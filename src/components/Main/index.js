import React, { Component } from 'react'
import * as R from 'ramda'
import Search from './Search'
import Card from './Card'
import styles from './styles'

const getPlayers = () => {
  return fetch('http://localhost:3008/players').then(response =>
    response.json()
  )
}

const Main = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <div style={styles.title}>NBA Interview</div>
      <Search style={styles.search} />
      <Card />
    </div>
  )
}

export default Main
