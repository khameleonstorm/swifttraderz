import React from 'react'
import s from "./Counter.module.css"
import { counterList } from '../../utils/secText'



const Counter = () => {
  return (
    <div className={s.ctn}>
      <div className={s.wrapper}>
        {counterList.map((counter) => (
          <div className={s.card} key={counter.id}>
            <div className={s.count}>
              {counter.count}
            </div>
            <div className={s.title}>
              {counter.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Counter