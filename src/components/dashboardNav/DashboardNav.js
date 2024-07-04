import styles from './DashboardNav.module.css';
import { MdKeyboardArrowDown, MdOutlinePendingActions, MdPending, MdCheckCircle, MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import useCollection from '../../hooks/useCollection';
import { TextField } from '@mui/material';
import { updateDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MoonLoader } from 'react-spinners';
import emailjs from '@emailjs/browser';
import dateFormat from "dateformat";

export default function DashboardNav({admin}) {
  const { authIsReady, user } = useAuth()
  const { logout } = useLogout()
  const [menu, setMenu] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const { document } = useCollection('profile', false, true);
  const { document: Doc2 } = useCollection('transactions', true, false);
  const [modalError, setModalError] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const ref = doc(db, "profile", user.email);
  const date = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss");
  

  const message1 = (amount, title, name) => {
    return (`
    Your details and account has been checked and verified. You have also made a successful ${title} of $${amount} which is in process and and has been approved on the ${date}. If any Questions, please do not hesitate to contact us via our live chat available on our website, Thank you ${name}.
  `);
  }

  const message2 = (amount, title, name) => {
    return (`A  ${title} of $${amount} awaits your comfirmation, on the ${date}, By this user: ${name}.`);
  }
  
  
  const sendMessage = (amount, name, email, title, message) => {

    const emailBody = message(amount, title, name);

    var templateParams = {
      name, email, emailBody,
      title: "Withdrawal"
    };
 
    emailjs.send('service_z9km1rt', 'template_a8mucwh', templateParams, '7NdHLu_8_FcyorjXl')
    .then((result) => {
        console.log("result", result.text);
    }, (error) => {
        console.log("error", error.text);
    });
  }

  const openTransaction = () => {
    setShowTransactions(true)
  }

  const handleTransaction = (docm) => {
    const { id, fullName, email, amount } = docm;
    const title = docm.type ? docm.type : "withdrawal"
    const newRef = doc(db, "transactions", id);
    const response = prompt("Input 'yes' if you want to approve this transaction?")
    if(response === 'yes'){
      updateDoc(newRef, {
        status: 'approved'
      })
      sendMessage(amount, fullName, email, title, message1)
    }
  }


  const handleClick = () => {
    if (menu) {
      setMenu(false)
    }
    if (!menu) {
      setMenu(true)
    }
  }


  const handleWithdraw = () => {
    setShowModal(true)
  }


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(document){
      if(amount && address){
        // parse amount to number
        const amountNumber = Number(amount);
        const { bal, fullName } = document[0];
        const availableWithdraw = bal.balance + bal.investment + bal.profit
        if (availableWithdraw >= amountNumber) {
          const newBal = availableWithdraw - amountNumber
          const newBalances = {
            balance: newBal,
            investment: 0,
            profit: 0,
            savings: bal.savings,
            withdrawal: bal.withdrawal,
          }

          await updateDoc(ref, {
            "bal": newBalances
          });

          await addDoc(collection(db, "transactions"), {
            amount: amountNumber,
            address,
            date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
            status: "pending",
            email: user.email,
            fullName: fullName
          });

          sendMessage(amount, fullName, 'help@swifttraderz.com', 'Withdrawal', message2)

          
          
          setModalSuccess(true)
          setTimeout(() => {
            setIsPending(false)
          }, 3000)
        } else {
          setModalError('Insufficient funds')
          setTimeout(() => {
            setModalError(null)
          }, 3000)
        }
      } else {
        setModalError('Please fill all fields')
        setTimeout(() => {
          setModalError(null)
        }, 3000)
      }
    }
  }

  const backToDashboard = () => {
    setModalSuccess(false)
    setShowModal(false)
    setAmount(null)
    setAddress(null)
    setModalError(null)
  }


  return ((authIsReady && user) &&
  <>
  {showTransactions && 
  <div className={styles.transaction}>
    <MdArrowBack className={styles.exit} onClick={() => setShowTransactions(false)}/>
    {Doc2?.map((doc, i) => (
      <div key={i} className={styles.transaction_item} onClick={() => handleTransaction(doc)}>
        <div className={styles.transaction_item_left}>
          <p>{doc.email}</p>
          <p>Address: {doc.address}</p>
          <p>{doc.date}</p>
        </div>
        <div className={styles.transaction_item_right}>
          <h3>${doc.amount}</h3>
          {doc.status === "pending" && <p>{doc.status}<MdPending color='#ffa200'/></p>}
          {doc.status === "approved" && <p>{doc.status}<MdCheckCircle color='#62ff00'/></p>}
        </div>
      </div>
    ))}

  </div>  
  }
      {(modalSuccess && isPending) && 
      <div className={styles.modalSuccess}>
        <div className={styles.modalSuccessContainer}>
          <MoonLoader color="#ffd016"/>
          <h1>Processing Your Withdrawal</h1>
        </div>
      </div>
      }
      {(modalSuccess && !isPending) && 
      <div className={styles.modalSuccess}>
        <div className={styles.modalSuccessContainer}>
          <MdOutlinePendingActions size="4rem" color="#ffd016"/>
          <h1>Withdrawal Is Pending</h1>
          <p>Contact Us For More Info!</p>
          <button className={styles.back} onClick={backToDashboard}>Back To Dashboard</button>
        </div>
      </div>
      }
      {showModal &&
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <form onSubmit={handleSubmit}>
            <h1>Enter Amount & Address</h1>
            <TextField 
              id="Amount" 
              label="Amount" 
              variant="outlined" 
              fullWidth
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField 
              id="Address" 
              label="USDT Wallet Address" 
              variant="outlined" 
              fullWidth
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className={styles.btns}>
              <Button 
              variant="contained"
              type="submit"
              className={styles.submit}
              >Withdraw</Button>
              <p className={styles.cancel} onClick={() => setShowModal(false)}>Cancel</p>
            </div>
            {modalError && <p className={styles.error}>{modalError}</p>}
          </form>
        </div>
      </div>
    }


    <div className={styles.container}>
      <div className={styles.hello} style={admin && {paddingLeft: "80px"}}>
        <p>Hello! </p>
        <p>{user.displayName}</p>
      </div>
      <div className={styles.logo}>
        <div className={styles.image}>
          <img src={user.photoURL ? user.photoURL : `https://robohash.org/${user.uid}`} alt="Avatar!" />
        </div>
        <MdKeyboardArrowDown size="1.8em" style={{cursor: 'pointer'}} onClick={handleClick}/>
        {menu && 
          <div className={styles.menu} onClick={handleClick}>
            {(user?.email !== "help@swifttraderz.com") && 
            <>
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/plans">Plans</Link>
              <Link to="#" onClick={handleWithdraw}>Withdraw</Link>
            </>
            }
            {(user?.email === "help@swifttraderz.com") && <Link to="#" onClick={openTransaction}>Transactions</Link>}
            <Button variant="outlined" color="error" size="small" style={{fontSize: "0.7rem"}} onClick={logout}> Logout <HiOutlineLogout size="1.3em"
            style={{marginLeft: "1rem"}}
            /></Button>
          </div>
        }
      </div>
    </div>
  </>
  )
}
