import React from 'react'
import s from "./Services.module.css"
import {RiTruckLine} from 'react-icons/ri'
import { GiCommercialAirplane } from 'react-icons/gi'
import {IoBoatOutline} from 'react-icons/io5'

const servicesList = [
  {
    id: 1,
    title: "Land Transport",
    desc: "High quality road transportation, from standard services such as PTL (Part) or FTL (Full-Truck Load) shipments to temperature controlled and highly secured transports.",
    icon: RiTruckLine,
  },
  {
    id: 2,
    title: "Air Transport",
    desc: "Next flight out service to more than 220 countries and territories means that you’ll receive shipments in the shortest time possible.",
    icon: GiCommercialAirplane,
  },
  {
    id: 3,
    title: "Sea Transport",
    desc: "Our ocean freight shipment offer a wide range of quality controlled equipment types. We strive for on time deliverability and provide end-to-end visibility.",
    icon: IoBoatOutline,
  }
]

const Services = () => {
  return (
    <div className={s.ctn}>
      <h1 className={s.header}>Why <span>Trust Us</span></h1>

      <div className={s.wrapper}>
        {servicesList.map((service) => (
          <div className={s.card} key={service.id}>
            <div className={s.icon}>
              <service.icon />
            </div>
            <h1 className={s.title}>{service.title}</h1>
            <p className={s.desc}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services