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
      <div className={s.services}>
        <h2>Services</h2>
        <Link to="/shipment">Shipment</Link>
        <Link to="/plans">Investment</Link>
        <Link to="/rent-home">Rent A Home</Link>
        <Link to="/buy-home">Buy A Home</Link>
      </div>
      <div className={s.address}>
        <h2>Email</h2>
        <p>help@genesis-experts.com</p>
      </div>
    </div>
    <Copyright />
    </>
  )
}
