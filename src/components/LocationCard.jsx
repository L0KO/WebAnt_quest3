import { Link } from "react-router-dom";

export default function LocationCard({ info }) {

  return (
    <Link to={'/locationDetails'} state={info.id} className="locations__card">
        <p className="locations__card-header-text">{info.name}</p>
        <p className="locations__card-text">{info.type}</p>
    </Link>
  )
}