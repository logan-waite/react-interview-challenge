import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as R from 'ramda'
import { getFavorites } from 'src/api'
import Card from 'src/components/Card'

const CardList = ({ players }) =>
  R.map(player => <Card small key={player.id} player={player} />, players)

class Favorites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      favorites: []
    }
  }

  componentDidMount () {
    getFavorites({}).then(favorites => this.setState({ favorites }))
  }

  render () {
    return (
      <div>
        <Link to='/'>Back</Link>
        <h2>Favorites</h2>
        <CardList players={this.state.favorites} />
      </div>
    )
  }
}

export default Favorites
