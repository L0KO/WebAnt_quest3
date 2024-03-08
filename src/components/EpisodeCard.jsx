import { Link } from "react-router-dom";

export default function EpisodeCard({ info }) {

  return (
    <Link to={'/episodeDetails'} state={info.id} className="episodes__card">
      <p className="locations__card-header-text">{info.name}</p>
      <p className="locations__card-text">{info.air_date}</p>
      <p className="locations__card-text_bold">{info.episode}</p>
    </Link>

  )
}