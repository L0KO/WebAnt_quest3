import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchEpisodeDetails } from '../features/episodeDetails/episodeDetailsSlice'
import DetailsCharacterCard from '../components/DetailsCharacterCard'
import '../App.css'
import '../details.css'

export default function EpisodeDetails() {
  const episodeDetail = useSelector((state) => state.episodeDetail)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchEpisodeDetails('https://rickandmortyapi.com/api/episode/' + location.state))
  }, [])

  let charactersContent;
  if (episodeDetail.status === 'loading') {
    charactersContent = <p>"Loading..."</p>;
  } else if (episodeDetail.status === 'succeeded') {
    charactersContent = episodeDetail.characters.map((characterDetails) => <DetailsCharacterCard info={characterDetails} key={characterDetails.id} />)
  } else if (episodeDetail.status === 'failed') {
    charactersContent = <p>error</p>;
  }

  return (
    <section className="location__main">
      <div onClick={() => history.back()} className="main__back-button">
        <img src="../img/characterDetails/arrow_back_24px.svg" alt="" />
        <p className="main__back-text">Go back</p>
      </div>
      <div className="main__top-container location__top-container" id="top">
      <h1 className="main__top-h1-text location__top-h1-text">{episodeDetail.details.name}</h1>
      <div className="main-location__top-row-container">
        <div>
          <p className="main-location__top-text_bold">Episode</p>
          <p className="main-location__top-text_grey">{episodeDetail.details.episode}</p>
        </div>
        <div>
          <p className="main-location__top-text_bold">Date</p>
          <p className="main-location__top-text_grey">{episodeDetail.details.air_date}</p>
        </div>
      </div>
      </div>
      <div className="main__bottom-container characters__container" id="bottom">
        {charactersContent}
      </div>
    </section>
  )
}