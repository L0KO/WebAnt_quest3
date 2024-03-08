import { Outlet, Link } from "react-router-dom";
import '../App.css'

export default function Root() {
  return (
    <>
      <header id="header__nav" className="header__nav">
        <img src="/img/header/logo.svg" alt="" className="header__img" />
        <div id="header__container" className="header__container">
          <Link to={'/'} className="header__element">Characters</Link>
          <Link to={'/locationsPage'} className="header__element">Locations</Link>
          <Link to={'/episodesPage'} className="header__element">Episodes</Link>
        </div>
        {/* <button id="menu" className="header__burger" onClick="dropList()"><img src=".img/header/burgerIcon.svg" alt=""/></button> */}
        <button id="menu" className="header__burger" ><img src=".img/header/burgerIcon.svg" alt="" /></button>
      </header>
      <div className="header__popup" id="header__popup">

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