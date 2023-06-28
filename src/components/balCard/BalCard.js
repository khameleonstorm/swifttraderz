import styles from './BalCard.module.css';

// importing icons
import { MdOutlineShowChart, MdSavings } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import { GiCash, GiReceiveMoney } from 'react-icons/gi';
import { TiChartBar } from 'react-icons/ti';

// importing components
import DashboardNav from '../../components/dashboardNav/DashboardNav';

//import useCollection hook
import useCollection from '../../hooks/useCollection';
import { useState, useEffect } from 'react';

//user and update
import useAuth from '../../hooks/useAuth';

export default function BalCard() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { document } = useCollection('profile', false, true);




  useEffect(() => {

    if(document){
      const doc = {...document[0]}
      const { bal } = doc
      const bals = [
        {title: "Balance", bal: bal?.balance},
        {title: "Investment", bal: bal?.investment},
        {title: "Profit", bal: bal?.profit},
        {title: "Savings", bal: bal?.savings},
        {title: "Withdrawal", bal: bal?.withdrawal},
      ]
      setBalance(bals)
      console.log(bals)

      if(bal?.balance > 0){
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

  }, [document, user])



  return ((balance && balance !== undefined) &&
    <div className={styles.container}>
      <DashboardNav />
      <div className={styles.balCard}>
        {balance.map((bal, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardheader}>
              <div className={styles.cardtitle}>
                <h3>{bal.title}</h3>
              </div>
  
              <div className={styles.isactive}>
                {bal.title === "Balance" && <FaCoins className={styles.circle}/>}
                {bal.title === "Profit" && <GiCash className={styles.circle}/>}
                {bal.title === "Savings" && <MdSavings className={styles.circle}/>}
                {bal.title === "Withdrawal" && <GiReceiveMoney className={styles.circle}/>}
                {bal.title === "Investment" && <TiChartBar className={styles.circle}/>}
              </div>
            </div>
  
            <div className={styles.cardbody}>
              <h1>${bal.bal}</h1>
              <MdOutlineShowChart className={styles.chart} style={isActive ?{color: "#00ffaa"} : {color: "#e90000"}}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}