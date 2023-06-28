import logo from "../../assets/logo.png"
import { NavLink, Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { Helmet } from "react-helmet"

export default function Nav({black}) {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
      setShowMenu(!showMenu)
      console.log(showMenu)
  }

  return (
    <>
      <Helmet>
      <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        <script type="text/javascript">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
            }
          `}
        </script>
      </Helmet>
      <nav className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo"/>
        </Link>

        <div id="google_translate_element"></div>

        {!(black) &&
          <div className={styles.menu}  style={showMenu ? {right:  "0"} : {right:  '-100%'}} onClick={handleClick}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/plans">Plans</NavLink>

          {!user &&
          <>
            <Link className={styles.getStarted} to="/signUp">Sign up</Link>
            <Link className={styles.login} to="/login">Login</Link>
          </>
           }

          {user && <Link className={styles.getStarted} to="/dashboard">Dashboard</Link>}
        </div>
        }

      <div className={styles.hamburger} onClick={handleClick}>
          <span 
          className={showMenu ? styles.activeBar : styles.bar}
          ></span>
          <span 
          className={showMenu ? styles.activeBar : styles.bar}
          ></span>
          <span 
          className={showMenu ? styles.activeBar : styles.bar}
          ></span>
      </div>
      </nav>
    </>
  )
}
