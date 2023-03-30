import logoPath from "../images/header-logo.svg";
import {Link, useLocation, NavLink} from "react-router-dom";



export default function Header({loggedIn, onLogout}) {

  // const location = useLocation();
  //
  // const handleLogout = () => {
  //   onLogout()
  // }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип" />

      {/*{loggedIn ? (*/}
      {/*  <nav className={'header__auth-nav'}>*/}
      {/*    <p className={'header__email'}>email@exapmle.com</p>*/}
      {/*    <button className={'header__link'} onClick={handleLogout}>Выйти</button>*/}
      {/*  </nav>*/}
      {/*) : (*/}
      {/*  <nav className={'header__auth-nav'}>*/}

      {/*    {location.pathname === '/sign-in' && (*/}
      {/*      <NavLink to={"/sign-in"} className={'header__link'}>Регистрация</NavLink>*/}
      {/*    )}*/}

      {/*    {location.pathname === '/sign-up' && (*/}
      {/*      <NavLink to={'/sign-up'} className={'header__link'}>Войти</NavLink>*/}
      {/*    )}*/}

      {/*  </nav>*/}
      {/*)}*/}

    </header>
  )
}