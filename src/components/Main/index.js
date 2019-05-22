import React, { Component } from 'react'
import Search from './Search'
import Card from './Card'
import styles from './styles'

const getPlayers = () => {
  return fetch('http://localhost:3008/players').then(response =>
    response.json()
  )
}

class Main extends Component {
  render () {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Interview</div>
        <Search style={styles.search} />
        <Card />
      </div>
    )
  }
}

export default Main
