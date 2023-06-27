import s from './Modal.module.css'
import { GrFormLocation } from 'react-icons/gr'

const Modal = ({ handleModal, data, error }) => {
  console.log(data)
  return (
      <div className={s.modal} onClick={() => handleModal()}>
        <div className={s.content}>
          <span onClick={() => handleModal()} className={s.close}>&times;</span>

          {data ? (
            <>
              <h2>Standard Shipping</h2>
              <p className={s.heading}>Tracking ID: {data.id}</p>
              <p className={s.details}>Delivery Details: {data.trackingInfo}</p>

              {data.shipping.map(item =>
                <div className={s.item}>
                  <GrFormLocation className={s.icon} />
                  <div>
                    <p className={s.loc}>{item.location}</p>
                    <p className={s.time}>{item.time}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Sorry, we couldn't find that tracking number. Please try again.</p>
          )}
        </div>

        <p></p>
      </div>
  )
}

export default Modal