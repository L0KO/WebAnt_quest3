import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

export default function EpisodesPage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => console.log(res))
  }, [])


  return (
    <>
       <section class="filters">
      <img src="../img/episodes/episodes_logo.svg" alt="" class="filters__img"/>
      <div class="filters__conteiner filters__container-locations">
        <input type="text" class="filters__filters filters__filter-input filters__episodes" placeholder="Filter by name or episode (ex. S01 or S01E02)" id="filterName" value="" onchange="filter()"/>
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