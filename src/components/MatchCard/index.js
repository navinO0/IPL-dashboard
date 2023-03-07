// Write your code here

import './index.css'

const MatchCard = props => {
  const {eachOne} = props
  const {result, competingTeamLogo, competingTeam, matchStatus} = eachOne
  const textColor = matchStatus === 'Won' ? 'won-text' : 'lost-text'

  return (
    <li className="match-card-super-container">
      <div className="match-card-main-container">
        <div className="match-card-competing-img-text">
          <img
            src={competingTeamLogo}
            alt={`competing team ${competingTeam}`}
            className="match-card-competing-team-logo"
          />
          <p className="match-card-competing-team-text">{competingTeam}</p>
        </div>
        <p className="match-card-result-text">{result}</p>
        <p className={`match-status-text ${textColor}`}>{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
