import s from './Sec.module.css';
import { logistic1 } from '../../utils/secText';

export default function Sec() {
  return (
    <div className={s.ctn}>
      <div className={s.wrapper}>
        <div className={s.left}>
          <h1 className={s.title}>{logistic1.title1} <span> {logistic1.title2}</span> {logistic1.title3}</h1>
          <p className={s.subtitle}>{logistic1.desc}</p>
        </div>
        <div className={s.right}>
          <img src={logistic1.image} alt="logistic" width={400}/>
        </div>
      </div>
    </div>
  )
}
