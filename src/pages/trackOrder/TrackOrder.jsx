import React from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { useState, useEffect } from 'react';
import s from './TrackOrder.module.css';
import { collection, query, onSnapshot } from 'firebase/firestore';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';


const TrackOrder = () => {
  const params = useParams();
  const { id } = params;
  const [trackingData, setTrackingData] = useState('');

  useEffect(() => {
    try {
      const q = query(collection(db, 'tracking'));

      onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('empty');
        } else {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const tracking = data.find((item) => item.id === id);
          setTrackingData(tracking);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [id]);


  return (
    <>
    <Nav />
    <div className={s.ctn}>
      <div className={s.wrapper}>
      <div className={s.heading}>Track Order: {id}</div>
        <div className={s.tracking_div}>
          <p className={s.track_heading}>
            Delivery Info: <span> {trackingData?.clientDetails}</span>
          </p>

          {(trackingData?.extra?.map((item, i) => (
                <div key={i} className={s.tracking_info_extra}>
                  <p>Name: <span>{item.name}</span> </p>
                  <p>Email: <span>{item.email}</span> </p>
                  <p>Phone: <span>{item.phone}</span> </p>
                  <p>Date: <span>{item.date}</span> </p>
                  <p>Country: <span>{item.country}</span> </p>
                  <p>Address: <span>{item.address}</span> </p>
                  <p>Comment:  <span>{item.comment}</span></p>
                </div>
              ))
            )
          }
        </div>

        <div className={s.tracking_div}>
          <p className={s.track_heading}>
            Shipment History
          </p>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(trackingData?.shipping?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.time}</td>
                      <td>{item.location}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))

                )
              }
            </tbody>
          </table>
        </div>

        <div className={s.tracking_div}>
          <p className={s.track_heading}>
            Packages
          </p>

          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Weight</th>
                <th>Description</th>
                <th>Length</th>
                <th>Width</th>
              </tr>
            </thead>
            <tbody>
              {(trackingData?.packaging?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.PQuantity}</td>
                      <td>{item.PWeight}</td>
                      <td>{item.PDesc}</td>
                      <td>{item.PLength}</td>
                      <td>{item.PWidth}</td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default TrackOrder