import React from 'react'
import s from "./Contact.module.css"

const Contact = () => {
  return (
    <div className={s.ctn}>
      <div className={s.wrapper}>
        <h1 className={s.heading}> 
          If You Have Any Questions about Logistics, Please Feel Free to 
          <span> Contact Us</span>
        </h1>
        <p className={s.subHeading}>
          Dulux Express is the world's driving worldwide coordinations supplier — 
          we uphold industry and exchange the worldwide trade.
        </p>
        <button className="bigBtn">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default Contact