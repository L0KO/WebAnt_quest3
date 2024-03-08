import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEpisodes, filterEpisodes } from '../features/episodes/episodesSlice'
import EpisodeCard from '../components/EpisodeCard'
import '../App.css'

export default function EpisodesPage() {
  const episodes = useSelector((state) => state.episode)
  const dispatch = useDispatch();
  const [filterInfo, setFilterInfo] = useState('')

  useEffect(() => {
    if (episodes.status === 'idle') {
      dispatch(fetchEpisodes('https://rickandmortyapi.com/api/episode', false))
    }
  }, [episodes, dispatch])

  let content;
  if (episodes.status === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (episodes.status === 'succeeded') {
    content = episodes.episodes.map((character) => <EpisodeCard info={character} key={character.id} />)
  } else if (episodes.status === 'failed') {
    content = <p>error</p>;
  }

  function getMoreEpisodes(e) {
    e.preventDefault();
    dispatch(fetchEpisodes(episodes.nextLink))
  }

  function getFilteredEpisodes(e) {
    e.preventDefault();
    setFilterInfo(e.target.value)
    let link = 'https://rickandmortyapi.com/api/episode/?name=' + filterInfo
    dispatch(filterEpisodes(link))
  }

  return (
    <>
      <section className="filters">
        <img src="../img/episodes/episodes_logo.svg" alt="" className="filters__img" />
        <div className="filters__conteiner filters__container-locations">
          <input type="text" value={filterInfo} onChange={(e) => getFilteredEpisodes(e)} className="filters__filters filters__filter-input filters__episodes" placeholder="Filter by name or episode (ex. S01 or S01E02)" />
        </div>
      </section>
      <section className="locations">
        <div className="characters__container" id="res">
          {content}
        </div>
        <div className="characters__button-container">
          <button onClick={getMoreEpisodes} className="characters__button">Load more</button>
        </div>
      </section>
    </>
  )
}