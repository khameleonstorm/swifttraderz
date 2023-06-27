import { useState } from 'react'
import s from './Track.module.css'
import { db } from "../../firebase/config";
import { collection, query, getDocs } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Track = ({ handleModal, setData, setError, setLoading }) => {
  const [trackingID, setTrackingID] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (trackingID === "") {
      alert("Please enter a tracking ID")
      return
    }


    const fetchData = async () => {
      try {
        const q = query(collection(db, "tracking"));

        const res = await getDocs(q);

        if (res.empty) {
          setError('Sorry, we couldn\'t find that tracking number. Please try again.')
          setLoading(false)
        } else {
          const data = res.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))

          const tracking = data.find(item => item.id === trackingID)
          console.log(tracking)
          if (tracking) {
            setData(tracking)
            navigate(`/track-order/${tracking.id}`)
            setLoading(false)
          } else {
            setData({ id: "", shipping: [] })
            handleModal()
          }
          setData(tracking)
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchData()
    // handleModal()
  }

  return (
    <div className={s.ctn}>
      <p className={s.head}>Track your Shipment</p>
      <div className={s.order}>
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
          />
          <button className='bigBtn full' onClick={() => handleSearch()}>Track Order</button>
      </div>
    </div>
  )
}

export default Track