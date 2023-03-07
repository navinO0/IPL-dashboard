// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import MatchCard from '../MatchCard/index'

import './index.css'

class TeamMatches extends Component {
  state = {
    updatedDetails: [],
    latestMatchDetails: {},
    recentmatches: [],
    isLoading: true,
    id: '',
  }

  componentDidMount() {
    this.getinfo()
  }

  getBackgroundImage = () => {
    const {id} = this.state
    let className = ''
    if (id === 'RCB') {
      className = 'teamrcb'
    } else if (id === 'KKR') {
      className = 'teamkkr'
    } else if (id === 'KXP') {
      className = 'teamk11'
    } else if (id === 'CSK') {
      className = 'teamcsk'
    } else if (id === 'RR') {
      className = 'teamrr'
    } else if (id === 'MI') {
      className = 'teammi'
    } else if (id === 'SH') {
      className = 'teamsrh'
    } else if (id === 'DC') {
      className = 'teamdc'
    }
    return className
  }

  getinfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,

      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        firstInnings: data.latest_match_details.first_innings,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        matchStatus: each.match_status,
      })),
    }
    this.setState({
      updatedDetails: updatedData,
      latestMatchDetails: updatedData.latestMatchDetails,
      recentmatches: updatedData.recentMatches,
      isLoading: false,
      id: `${id}`,
    })
  }

  render() {
    const {
      updatedDetails,
      latestMatchDetails,
      recentmatches,
      isLoading,
    } = this.state
    const {teamBannerUrl} = updatedDetails
    const {
      umpires,
      result,
      manOfTheMatch,
      secondInnings,

      date,
      firstInnings,
      venue,
      competingTeam,
      competingTeamLogo,
    } = latestMatchDetails

    return (
      <div className={`isLoading-container ${this.getBackgroundImage()}`}>
        {!isLoading ? (
          <div className="team-matches-main-container">
            <div className="teamBanner-container">
              <img
                src={teamBannerUrl}
                alt="team banner"
                className="team-banner"
              />
            </div>
            <p className="latest-matches-test">latest mathces</p>
            <div className="latest-match-big-container">
              <div className="column-1-details-container">
                <p className="competing-team-text">{competingTeam}</p>
                <p className="date-text">{date}</p>
                <p className="venue-text">{venue}</p>
                <p className="result-text">{result}</p>
              </div>
              <div className="competing-team-logo-container">
                <img
                  src={competingTeamLogo}
                  alt={`latest match ${competingTeam}`}
                  className="competing-img"
                />
              </div>
              <hr className="hr-line" />
              <div className="third-container">
                <h1 className="heading-text">First Innings</h1>
                <p className="actual-text">{firstInnings}</p>
                <h1 className="heading-text">Second Innings</h1>
                <p className="actual-text">{secondInnings}</p>
                <h1 className="heading-text">Man Of The Match</h1>
                <p className="actual-text">{manOfTheMatch}</p>
                <h1 className="heading-text">Umpires</h1>
                <p className="actual-text">{umpires}</p>
              </div>
            </div>
            <ul className="match-card-list-container">
              {recentmatches.map(eachOne => (
                <MatchCard key={eachOne.id} eachOne={eachOne} />
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <Loader type="Oval" color="#24ffff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
