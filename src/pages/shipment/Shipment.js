import { useState } from 'react'
import Heroes from '../../components/heroes/Heroes'
import Nav from '../../components/nav/Nav'
import Sec from '../../components/sec/Sec'
import Services from '../../components/services/Services'
import Track from '../../components/track/Track'
import Counter from '../../components/counter/Counter'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
import Modal from '../../components/modal/Modal'
import { ship } from '../../utils/heroText'


export default function Shipment() {
  const [data, setData] = useState("beans and the nemesis")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const handleModal = () => {
    console.log("working")
    openModal ? setOpenModal(false) : setOpenModal(true)
  }



  return (
    <div>
      {
        openModal && <Modal handleModal={handleModal} data={data} loading={loading} error={error} />
      }
      <Nav />
      <Heroes text={ship}/>
      <Track handleModal={handleModal} setData={setData} setError={setError} setLoading={setLoading}/>
      <Sec />
      <Services />
      <Counter />
      <Contact />
      <Footer />
    </div>
  )
}
