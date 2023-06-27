import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import logo from "../../assets/logo.png"
import Copyright from '../copyright/Copyright';


export default function Footer() {
  return (
    <>
    <div className={s.container}>
      <Link to="/" className={s.logo}>
          <img src={logo} alt="logo"/>
      </Link>
      <div className={s.links}>
        <h2>Useful Links</h2>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div className={s.address}>
        <h2>Email</h2>
        <p>help@swifttraderz.com</p>
      </div>
    </div>
    <Copyright />
    </>
  )
}
