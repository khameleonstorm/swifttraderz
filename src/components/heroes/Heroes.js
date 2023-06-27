import s from './Heroes.module.css'

export default function Heroes({text}) {
  return (
    <div className={s.ctn} style={{backgroundImage: `linear-gradient(180deg, #000000e7, #0000006a), url(${text.bg})`}}>
      <div className={s.wrapper}>
        <h1 className={s.title}>{text.title1} <span> {text.title2} </span> {text.title3}</h1>
        <p className={s.subtitle}>{text.description}</p>
      </div>
    </div>
  )
}
