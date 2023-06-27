import s from './Filter.module.css';
import { VscListFilter } from 'react-icons/vsc';
import { RiSearch2Line } from 'react-icons/ri';

export default function Filter({setCity, setStateCode, states, handleChange}) {

  const handleCity = (e) => {
    const city = e.target.value
    const { state } = states.find(state => state.city === city)
    setCity(city)
    setStateCode(state)
    console.log(state, city)
  }

  return (
    <div className={s.ctn}>
      <div className={s.wrapper}>
        <div className={s.filter}>
          <select onChange={handleCity}>
            {states?.map((state, i) => <option key={i} value={state.city}>{state.city}</option>)}
          </select>
        </div>
        <div className={s.search}>
          <input onChange={(e) => handleChange(e)}/>
          <div>
            <RiSearch2Line />
          </div>
        </div>
      </div>
    </div>
  )
}
