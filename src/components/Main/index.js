import React, { Component } from 'react'
import * as R from 'ramda'
import { getPlayers, getTeams } from '../../api'
import Search from './Search'
import Card from './Card'
import styles from './styles'

const getByValue = R.curry((value, prop, list) =>
  R.find(item => R.equals(R.prop(prop, item), value), list)
)

const getPlayerInfo = async () => {
  const players = await getPlayers({ page: 1 })
  const teams = await getTeams({})
  return R.map(
    player =>
      R.assoc('team', getByValue(player.team, 'id', teams).name, player),
    players
  )
}

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      players: []
    }
  }

  componentDidMount () {
    getPlayerInfo().then(result => {
      this.setState({ players: result })
    })
  }

  render () {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Interview</div>
        <Search style={styles.search} />
        {R.map(
          player => (
            <Card
              key={player.id}
              name={player.name}
              image={player.image}
              team={player.team}
            />
          ),
          this.state.players
        )}
      </div>
    )
  }
}

export default Main
