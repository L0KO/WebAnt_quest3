import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => console.log(res))
  }, [])


  return (
    <>
       <section class="filters">
      <img src="./img/filters/name.svg" alt="" class="filters__img"/>
      <div class="filters__conteiner">
        <input type="text" class="filters__filters filters__filter-input" placeholder="Filter by name..."
          id="filterName" value="" onchange="filter()"/>
        <select name="" id="" class="filters__filters filters__filter-select">
          <option value="" hidden>Species</option>
          <option value="">Smth 1</option>
          <option value="">Smth 2</option>
          <option value="">Smth 3</option>
        </select>
        <select name="" id="" class="filters__filters filters__filter-select">
          <option value="" hidden>Gender</option>
          <option value="">Smth 1</option>
          <option value="">Smth 2</option>
          <option value="">Smth 3</option>
        </select>
        <select name="" id="" class="filters__filters filters__filter-select">
          <option value="" hidden>Status</option>
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
              <option value="" hidden>Species</option>
              <option value="">Smth 1</option>
              <option value="">Smth 2</option>
              <option value="">Smth 3</option>
            </select>
            <select name="" id="" class="filters__filters filters__filter-select filters__modal-filter">
              <option value="" hidden>Gender</option>
              <option value="">Smth 1</option>
              <option value="">Smth 2</option>
              <option value="">Smth 3</option>
            </select>
            <select name="" id="" class="filters__filters filters__filter-select filters__modal-filter">
              <option value="" hidden>Status</option>
              <option value="">Smth 1</option>
              <option value="">Smth 2</option>
              <option value="">Smth 3</option>
            </select>
            <button class="filters__apply-btn">Apply</button>
          </div>
        </div>
      </div>
    </section>
    <section class="characters">
      <div class="characters__container" id="res">

      </div>
      <div class="characters__button">Load more</div>
    </section>
    </>
  )
}

export default App
