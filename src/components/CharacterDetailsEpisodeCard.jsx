import { Link } from "react-router-dom";

export default function CharacterDetailsEpisodeCard({ info }) {

  return (
    <li class="main__info-episodes-li">
      <Link to={'/episodeDetails'} state={info.id}>
        <div>
          <p class="main__info-li-main-text">{info.episode}</p>
          <p class="main__info-li-sub-text">{info.name}</p>
          <p class="main__info-li-date-text">{info.air_date}</p>
        </div>
        <img src="../img/characterDetails/navigation_chevron_right_24px.svg" alt="" class="main__location-arrow" />
      </Link>
    </li>
  )
}