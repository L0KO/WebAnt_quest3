
export default function CharacterCard() {

  return (
    <a href="./pages/characterDetails.html?${e.id}" class="characters__card">
        <img src="${e.image}" alt="" class="characters__card-img"/>
        <div class="characters__text-container">
          <div class="characters__header">${e.name}</div>
          <div class="characters__text">${e.species}</div>
        </div>
      </a>
  )
}