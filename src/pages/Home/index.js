import React, { Component } from 'react'
import * as R from 'ramda'
import { Link } from 'react-router-dom'
import { getPlayers, getTeams, getFavorites } from 'src/api'
import { getByValue } from 'src/utils'
import Search from 'src/components/Search'
import Card from 'src/components/Card'
import Modal from 'src/components/Modal'
import EditForm from 'src/components/EditForm'
import Pagination from 'src/components/Pagination'
import styles from './styles'

const getPlayerInfo = async (page, search) => {
  const players = await getPlayers({ page, search })
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

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      players: [],
      teams: [],
      favorites: [],
      searchTerm: '',
      page: 1,
      editPlayer: null
    }
  }

  updateAllInfo = (
    page = this.state.page,
    searchTerm = this.state.searchTerm
  ) => {
    getPlayerInfo(page, searchTerm).then(result => {
      this.setState({
        players: result.players,
        teams: result.teams,
        editPlayer: null,
        page
      })
    })
    getFavorites({}).then(favorites => {
      this.setState({ favorites })
    })
  }

  componentDidMount () {
    this.updateAllInfo()
  }

  handleChange = event => {
    const searchTerm = event.target.value
    this.setState({ searchTerm })
    getPlayerInfo(1, searchTerm).then(result =>
      this.setState({ players: result.players, page: 1 })
    )
  }

  openModal = playerId => event => {
    this.setState({ editPlayer: playerId })
  }

  updatePage = page => () => {
    if (page < 1) page = 1
    else if (page > 10) page = 10
    this.updateAllInfo(page)
  }

  render () {
    return (
      <div style={{ ...styles.container, ...this.props.style }}>
        <div style={styles.title}>NBA Interview</div>
        <header
          style={{
            width: '75%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Pagination
            pageCallback={this.updatePage}
            currentPage={this.state.page}
          />
          <Search
            style={styles.search}
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
          <Link to='/favorites'>
            <h2 style={styles.favoriteCounter}>
              Favorites: {this.state.favorites.length}
            </h2>
          </Link>
        </header>
        <div style={styles.cardWrapper}>
          {R.map(
            player => (
              <Card
                key={player.id}
                player={player}
                isFavorite={
                  R.find(R.propEq('id', player.id), this.state.favorites) !==
                  undefined
                }
                onFavorited={this.updateAllInfo}
                onEdit={this.openModal(player.id)}
              />
            ),
            this.state.players
          )}
        </div>
        {this.state.editPlayer !== null ? (
          <Modal onClose={() => this.setState({ editPlayer: null })}>
            <EditForm
              teams={this.state.teams}
              player={getByValue(
                this.state.editPlayer,
                'id',
                this.state.players
              )}
              onSave={this.updateAllInfo}
            />
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default Home
