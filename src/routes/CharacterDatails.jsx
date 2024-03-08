import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacterDetails } from '../features/characterDetails/characterDetailsSlice'
import CharacterDetailsEpisodeCard from '../components/CharacterDetailsEpisodeCard'
import '../App.css'
import '../details.css'

export default function characterDetails() {
  const characterDetails = useSelector((state) => state.characterDetail)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCharacterDetails('https://rickandmortyapi.com/api/character/' + location.state))
  }, [])

  let typeContent;
  if (characterDetails.details.type == null || characterDetails.details.type === '' || characterDetails.details.type === undefined) {
    typeContent = <p class="main__info-li-sub-text">Unknown</p>
  } else {
    typeContent = <p class="main__info-li-sub-text">{characterDetails.details.type}</p>
  }

  let episodesContent;
  if (characterDetails.status === 'loading') {
    episodesContent = <p>"Loading..."</p>;
  } else if (characterDetails.status === 'succeeded') {
    episodesContent = characterDetails.episodes.map((episodeDetails) => <CharacterDetailsEpisodeCard info={episodeDetails} key={episodeDetails.id} />)
  } else if (characterDetails.status === 'failed') {
    episodesContent = <p>error</p>;
  }

  return (
    <section className="character__main">
      <div onClick={() => history.back()} className="main__back-button">
        <img src="/img/characterDetails/arrow_back_24px.svg" alt="" />
        <p className="main__back-text">Go back</p>
      </div>
      <div className="main__top-container" id="top">
        <img src={characterDetails.details.image} alt="" className="main__img" />
        <h1 className="main__top-h1-text">{characterDetails.details.name}</h1>
      </div>
      <div className="main__bottom-container">
        <div className="main__info-container">
          <h2 className="main__bottom-list-header">Informations</h2>
          <ol className="main__bottom-list">
            <li className="main__info-li" id="gender">
              <p className="main__info-li-main-text">Gender</p>
              <p className="main__info-li-sub-text">{characterDetails.details.gender}</p>
            </li>
            <li className="main__info-li" id="status">
              <p className="main__info-li-main-text">Status</p>
              <p class="main__info-li-sub-text">{characterDetails.details.status}</p>
            </li>
            <li className="main__info-li" id="specie">
              <p className="main__info-li-main-text">Specie</p>
              <p class="main__info-li-sub-text">{characterDetails.details.species}</p>
            </li>
            <li className="main__info-li" id="origin">
              <p className="main__info-li-main-text">Origin</p>
              <p class="main__info-li-sub-text">{characterDetails.details.origin.name}</p>
            </li>
            <li className="main__info-li" id="type">
              <p className="main__info-li-main-text">Type</p>
              {typeContent}
            </li>
            <li className="main__info-li" id="location">
              <Link to={'/locationDetails'} state={characterDetails.details.location.url.substring(characterDetails.details.location.url.lastIndexOf('/') + 1)} >
                <div>
                  <p class="main__info-li-main-text">Location</p>
                  <p class="main__info-li-sub-text">{characterDetails.details.location.name}</p>
                </div>
                <img src="/img/characterDetails/navigation_chevron_right_24px.svg" alt="" class="main__location-arrow" />
              </Link>
            </li>
          </ol>
        </div>
        <div className="main__episodes-container">
          <h2 className="main__bottom-list-header">Episodes</h2>
          <ol className="main__bottom-list" id="episodes">
            {episodesContent}
          </ol>
        </div>
      </div>
    </section>
  )
}