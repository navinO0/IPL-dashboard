// Write your code here
import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard/index'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamsData: updatedData, isLoading: false})
  }

  render() {
    const {teamsData, isLoading} = this.state
    return (
      <div className="home-main-container">
        <div className="ipl-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="dash-board-heading">IPL Dashboard</h1>
        </div>
        {!isLoading ? (
          <ul className="home-list-container">
            {teamsData.map(eachOne => (
              <TeamCard key={eachOne.id} eachOne={eachOne} />
            ))}
          </ul>
        ) : (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}

export default Home
