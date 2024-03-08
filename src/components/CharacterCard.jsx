import { Link } from "react-router-dom";

export default function CharacterCard({ info }) {

  return (
    <Link to={'/characterDetails'} state={info.id} className="characters__card">
        <img src={info.image} alt="" className="characters__card-img" />
        <div className="characters__text-container">
          <div className="characters__header">{info.name}</div>
          <div className="characters__text">{info.species}</div>
        </div>
    </Link>
  )
}