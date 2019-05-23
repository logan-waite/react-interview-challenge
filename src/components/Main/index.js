import React, { Component } from 'react'
import * as R from 'ramda'
import { getPlayers, getTeams, getFavorites } from 'src/api'
import { getByValue } from 'src/utils'
import Search from 'src/components/Search'
import Card from 'src/components/Card'
import Modal from 'src/components/Modal'
import EditForm from 'src/components/EditForm'
import styles from './styles'

const getPlayerInfo = async search => {
  const players = await getPlayers({ page: 1, search })
  const teams = await getTeams({})
  return {
    players: R.map(
      player =>
        R.assoc('team', getByValue(player.team, 'id', teams).name, player),
      players
    ),
    teams
  }
}

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      players: [],
      teams: [],
      favorites: [],
      searchTerm: '',
      editPlayer: null
    }
  }

  componentDidMount () {
    getPlayerInfo().then(result => {
      this.setState({ players: result.players, teams: result.teams })
    })
    getFavorites({}).then(favorites => {
      this.setState({ favorites })
    })
  }

  handleChange = event => {
    const searchTerm = event.target.value
    this.setState({ searchTerm })
    getPlayerInfo(searchTerm).then(result =>
      this.setState({ players: result.players })
    )
  }

  openModal = playerId => event => {
    this.setState({ editPlayer: playerId })
  }

  refreshAfterSave = () => {
    getPlayerInfo(this.state.searchTerm).then(result =>
      this.setState({ players: result.players, editPlayer: null })
    )

    getFavorites({}).then(favorites => {
      console.log(favorites)
      this.setState({ favorites })
    })
  }

  render () {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Interview</div>
        <Search
          style={styles.search}
          value={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <h2>Favorites: {this.state.favorites.length}</h2>
        {R.map(
          player => (
            <Card
              key={player.id}
              player={player}
              isFavorite={R.contains(player, this.state.favorites)}
              onFavorited={this.refreshAfterSave}
              onEdit={this.openModal(player.id)}
            />
          ),
          this.state.players
        )}
        {this.state.editPlayer !== null ? (
          <Modal onClose={() => this.setState({ editPlayer: null })}>
            <EditForm
              teams={this.state.teams}
              player={getByValue(
                this.state.editPlayer,
                'id',
                this.state.players
              )}
              onSave={this.refreshAfterSave}
            />
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default Main
