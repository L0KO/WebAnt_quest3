import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations, filterLocations } from '../features/locations/locationsSlice'
import LocationCard from '../components/LocationCard'
import '../App.css'

export default function LocationsPage() {
  const locations = useSelector((state) => state.location)
  const dispatch = useDispatch();
  const [filterInfo, setFilterInfo] = useState('')

  useEffect(() => {
    if (locations.status === 'idle') {
      dispatch(fetchLocations('https://rickandmortyapi.com/api/location'))
    }
  }, [locations, dispatch])

  let content;
  if (locations.status === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (locations.status === 'succeeded') {
    content = locations.locations.map((character) => <LocationCard info={character} key={character.id} />)
  } else if (locations.status === 'failed') {
    content = <p>error</p>;
  }

  function getMoreLocations(e) {
    e.preventDefault();
    dispatch(fetchLocations(locations.nextLink))
  }

  function getFilteredLocations(e) {
    e.preventDefault();
    setFilterInfo(e.target.value)
    let link = 'https://rickandmortyapi.com/api/location/?name=' + filterInfo
    dispatch(filterLocations( link ))
  }

  return (
    <>
      <section className="filters">
        <img src="/img/locations/main_image.svg" alt="" className="filters__img" />
        <div className="filters__conteiner filters__container-locations">
          <input type="text" value={filterInfo} onChange={(e) => getFilteredLocations(e)} className="filters__filters filters__filter-input filters__locations" placeholder="Filter by name..." />

          <select name="" id="" className="filters__filters filters__filter-select">
            <option value="" hidden>Type</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <select name="" id="" className="filters__filters filters__filter-select">
            <option value="" hidden>Demention</option>
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
                <option value="" hidden>Type</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <select name="" id="" className="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Demention</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <button className="filters__apply-btn">Apply</button>
            </div>
          </div>
        </div>
      </section>
      <section className="locations">
        <div className="characters__container" id="res">
          {content}
        </div>
        <button onClick={getMoreLocations} className="characters__button">Load more</button>
      </section>
    </>
  )
}