import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

export default function LocationsPage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => console.log(res))
  }, [])


  return (
    <>
      <section class="filters">
        <img src="/img/locations/main_image.svg" alt="" class="filters__img" />
        <div class="filters__conteiner filters__container-locations">
          <input type="text" class="filters__filters filters__filter-input filters__locations" placeholder="Filter by name..." id="filterName" value="" onchange="filter()" />
          <select name="" id="" class="filters__filters filters__filter-select">
            <option value="" hidden>Type</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <select name="" id="" class="filters__filters filters__filter-select">
            <option value="" hidden>Demention</option>
            <option value="">Smth 1</option>
            <option value="">Smth 2</option>
            <option value="">Smth 3</option>
          </select>
          <button id="filters__advanced" class="filters__advanced">Advanced filters</button>
          <div id="myModal" class="filters__modal">
            <div class="filters__modal-content">
              <span class="filters__modal-text-row">
                <p class="filters__modal-text">Filters</p>
                <span class="close">&times;</span>
              </span>
              <select name="" id="" class="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Type</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <select name="" id="" class="filters__filters filters__filter-select filters__modal-filter">
                <option value="" hidden>Demention</option>
                <option value="">Smth 1</option>
                <option value="">Smth 2</option>
                <option value="">Smth 3</option>
              </select>
              <button class="filters__apply-btn">Apply</button>
            </div>
          </div>
        </div>
      </section>
      <section class="locations">
        <div class="characters__container" id="res">

        </div>
        <div class="characters__button">Load more</div>
      </section>
    </>
  )
}