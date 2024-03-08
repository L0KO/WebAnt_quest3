import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCharacters, filterCharacters } from '../features/characters/charactersSlice'
import CharacterCard from '../components/CharacterCard'
import '../App.css'

export default function CharactersPage() {
  const characters = useSelector((state) => state.character)
  const dispatch = useDispatch();
  const [filterInfo, setFilterInfo] = useState('')

  useEffect(() => {
    if (characters.status === 'idle') {
      dispatch(fetchCharacters('https://rickandmortyapi.com/api/character'))
    }
  }, [characters, dispatch])

  let content;
  if (characters.status === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (characters.status === 'succeeded') {
    content = characters.characters.map((character) => <CharacterCard info={character} key={character.id} />)
  } else if (characters.status === 'failed') {
    content = <p>Nothing found</p>;
  }

  function getMoreCharacters(event) {
    event.preventDefault();
    dispatch(fetchCharacters(characters.nextLink))
  }

  function getFilteredCharacters(e) {
    e.preventDefault();
    setFilterInfo(e.target.value)
    let link = 'https://rickandmortyapi.com/api/character/?name=' + filterInfo
    dispatch(filterCharacters(link))
  }


  return (
    <>
      <section className="filters">
        <img src="./img/filters/name.svg" alt="" className="filters__img" />
        <div className="filters__conteiner">
          <input type="text" value={filterInfo} onChange={(e) => getFilteredCharacters(e)} className="filters__filters filters__filter-input" placeholder="Filter by name..." />
          <select name="" id="" className="filters__filters filters__filter-select">
            <option value="" hidden>Species</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <select name="" id="" className="filters__filters filters__filter-select">
            <option value="" hidden>Gender</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <select name="" id="" className="filters__filters filters__filter-select">
            <option value="" hidden>Status</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <button id="filters__advanced" className="filters__advanced">Advanced filters</button>
          <div id="myModal" className="filters__modal">
            <div className="filters__modal-content">
              <span className="filters__modal-text-row">
                <p className="filters__modal-text">Filters</p>
                <span className="close">&times;</span>
              </span>
              <select name="" id="" className="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Species</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <select name="" id="" className="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Gender</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <select name="" id="" className="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Status</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <button className="filters__apply-btn">Apply</button>
            </div>
          </div>
        </div>
      </section>
      <section className="characters">
        <div className="characters__container" id="res">
          {content}
        </div>
        <div className="characters__button-container">
        <button onClick={getMoreCharacters} className="characters__button">Load more</button>
        </div>
      </section>
    </>
  )
}