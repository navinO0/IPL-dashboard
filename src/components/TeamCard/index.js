// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {eachOne} = props
  const {name, id, teamImageUrl} = eachOne

  return (
    <Link className="link-text" to={`/team-matches/${id}`}>
      <li className="team-card-list-item-container">
        <div className="team-imgae-name-container">
          <img src={teamImageUrl} alt={name} className="team-card-img" />
          <p className="team-name">{name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard
