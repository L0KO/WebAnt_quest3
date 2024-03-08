import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import '../App.css'

export default function Root() {

  let [headerBurgerState, setHeaderBurgerState] = useState('header__popup')
  let [burgerPopup, setBurgerPopup] = useState(<div></div>)

  function handleBurgerClick() {
    if (headerBurgerState === 'header__popup') {
      setHeaderBurgerState('header__popup responsive')
      document.body.style.overflow = "hidden";
      setBurgerPopup(
        <ol className="header__popup-ol">
          <li className="header__popup-li">
            <Link to={'/'} onClick={() => {
              setHeaderBurgerState('header__popup')
              setBurgerPopup(<div></div>)
              document.body.style.overflow = "visible";
            }} className="header__element">Characters</Link>
          </li>
          <li className="header__popup-li">
            <Link to={'/locationsPage'} onClick={() => {
              setHeaderBurgerState('header__popup')
              setBurgerPopup(<div></div>)
              document.body.style.overflow = "visible";
            }} className="header__element">Locations</Link>
          </li>
          <li className="header__popup-li">
            <Link to={'/episodesPage'} onClick={() => {
              setHeaderBurgerState('header__popup')
              setBurgerPopup(<div></div>)
              document.body.style.overflow = "visible";
            }} className="header__element">Episodes</Link>
          </li>
        </ol>
      )
    } else {
      setHeaderBurgerState('header__popup')
      setBurgerPopup(<div></div>)
      document.body.style.overflow = "visible";
    }
  }

  return (
    <>
      <header className="header__nav" >
        <img src="/img/header/logo.svg" alt="" className="header__img" />
        <div id="header__container" className="header__container">
          <Link to={'/'} className="header__element">Characters</Link>
          <Link to={'/locationsPage'} className="header__element">Locations</Link>
          <Link to={'/episodesPage'} className="header__element">Episodes</Link>
        </div>
        <button id="menu" className='header__burger' onClick={() => handleBurgerClick()}><img src="/img/header/burgerIcon.svg" alt="" /></button>
      </header>
      <div className={headerBurgerState} id="header__popup">
        {burgerPopup}
      </div>
      <main>
        <Outlet />
      </main>
      <footer id="footer">
        <div className="footer__text">Make with ❤️ for the MobProgramming team</div>
      </footer>
    </>
  );
}