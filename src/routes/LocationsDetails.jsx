import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocationDetails } from '../features/locationDetails/locationDetailsSlice'
import DetailsCharacterCard from '../components/DetailsCharacterCard'
import '../App.css'
import '../details.css'

export default function locationDetails() {
  const locationDetail = useSelector((state) => state.locationDetail)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchLocationDetails('https://rickandmortyapi.com/api/location/' + location.state))
  }, [])

  let charactersContent;
  if (locationDetail.status === 'loading') {
    charactersContent = <p>"Loading..."</p>;
  } else if (locationDetail.status === 'succeeded') {
    charactersContent = locationDetail.characters.map((characterDetails) => <DetailsCharacterCard info={characterDetails} key={characterDetails.id} />)
  } else if (locationDetail.status === 'failed') {
    charactersContent = <p>error</p>;
  }

  return (
    <section className="location__main">
      <div onClick={() => history.back()} className="main__back-button">
      <img src="../img/characterDetails/arrow_back_24px.svg" alt=""/>
      <p className="main__back-text">Go back</p>
    </div>
    <div className="main__top-container location__top-container" id="top">
    <h1 className="main__top-h1-text location__top-h1-text">{locationDetail.details.name}</h1>
      <div className="main-location__top-row-container">
        <div>
          <p className="main-location__top-text_bold">Type</p>
          <p className="main-location__top-text_grey">{locationDetail.details.type}</p>
        </div>
        <div>
          <p className="main-location__top-text_bold">Dimention</p>
          <p className="main-location__top-text_grey">{locationDetail.details.dimension}</p>
        </div>
      </div>
    </div>
    <div className="main__bottom-container characters__container" id="bottom">
      {charactersContent}
    </div>
    </section>
  )
}