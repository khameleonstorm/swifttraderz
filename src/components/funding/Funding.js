import { useState, useRef, Fragment } from "react";
import { VscCopy } from "react-icons/vsc";
import s from "./Funding.module.css";
import qr1 from "../../assets/qr1.jpeg";
import qr2 from "../../assets/qr2.jpeg";
import ImageUploading from 'react-images-uploading';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MdCircle } from "react-icons/md";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import dateFormat from "dateformat";
import { collection, addDoc } from "firebase/firestore";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';



let coin = {
  bitcoin: {
    id: 1,
    title: "Bitcoin",
    image: qr1,
    network: "BTC",
    address: "bc1q3d0h3s2zspaw32ex75av6w9n20vxkn36z23mzn",
    link: "https://link.trustwallet.com/send?coin=0&address=bc1q3d0h3s2zspaw32ex75av6w9n20vxkn36z23mzn",
  },
  ethereum: {
    id: 2,
    title: "Ethereum",
    image: qr2,
    network: "Erc 20",
    address: "0xA2035847428DD26Cc312c98Fb105930395e7f0cc",
    link: "https://link.trustwallet.com/send?coin=60&address=0xA2035847428DD26Cc312c98Fb105930395e7f0cc",
  }};


export default function Funding() {
  const [showBtc, setShowBtc] = useState(true);
  const [copy, setCopy] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [amount, setAmount] = useState(20);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const textAreaRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth()

  const handleImage = (imageList) => {
    setImages(imageList);
  };



  const handleClick =  (e) => {
    if (e === "copy") setCopy(true)
  }

  const btnClick =  (e) => {
    if (e === "back") navigate.push("/dashboard")
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
        setCopy(false)
      }, 3000);
    } catch(err) {
      setCopySuccess(err.message)
    }
  }

    
  const sendMessage = (amount, name) => {
    var templateParams = {
      amount,
      name,
      email: "help@genesis-experts.com",
      date: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss"),
      title: `Deposit from ${user.email} `
    };
 
    emailjs.send('service_z98ilg7', 'template_px73xkk', templateParams, '4XJeofv3Cw2pDpuHH')
    .then((result) => {
        console.log("result", result.text);
    }, (error) => {
        console.log("error", error.text);
    });

    console.log(amount, name, user.email)
  }

  const submitImage = async() => {
    setError(null)
    setPending(true)
    const image = images[0].file
    const imageRef = ref(storage, `transactions/${user.uid}/${image.name}`)


    try {
      // Upload proof of payment
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is  ${progress} % done`);
          }, (error) => {
            console.log(error.message)
          }, () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then(downloadURL =>
                addDoc(collection(db, "transactions"), {
                  amount: Number(amount),
                  user: user.email,
                  date: dateFormat(new Date(), "dd/mm/yyyy, h:MM:ss"),
                  proof: downloadURL,
                  type: "deposit",
                }))
              .then(() => {
                setPending("done")
                sendMessage(amount, user.displayName)
                setTimeout(() => setPending(false), 5000);
              })
              .catch((error) => setError(error.message))
        })
    } catch (err) {
      if(err) setError(err.message)
    }
  }

  const pageNavigation = (e) => {
    if (e === "deposit") setPage(1)
    if (e === "qr") setPage(2)
    if (e === "upload") setPage(3)
  }

  const handleCoin = (e) => {
    if (e.target.value === "bitcoin") {
      setShowBtc(true)
    }
    
    if (e.target.value === "ethereum") {
      setShowBtc(false)
    }
    console.log(e.target.value, coin)
  }

  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <div className={s.current}>
          <MdCircle onClick={() => pageNavigation("deposit")} size="1.2rem" style={page === 1 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("qr")} size="1.2rem" style={page === 2 ? {color: "#05C169"} : {}}/>
          <MdCircle onClick={() => pageNavigation("upload")} size="1.2rem" style={page === 3 ? {color: "#05C169"} : {}}/>
        </div>
      </div>
      {page === 1 &&
      <div className={s.amount}>
        <h2>Deposit</h2>
        <TextField label="Amount" InputLabelProps={{ shrink: true }} onChange={(e) => setAmount(e.target.value)} value={amount} type="number"/>
        <button className='bigBtn full' style={{...overwrite}} onClick={() => btnClick("qr")}>Deposit  <span style={{...span}}>&rarr;</span></button>
        <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
          <span style={{...span2}}>&larr;</span> Back To Dashboard
        </button>
      </div>
      }
      {page === 2 &&
        <div className={s.CryptoFund}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="coin">Coin</InputLabel>
            <Select id="coin" value={showBtc ? "bitcoin" : "ethereum"} label="Coin" onChange={handleCoin}>
              <MenuItem value={"bitcoin"}>Bitcoin</MenuItem>
              <MenuItem value={"ethereum"}>Ethereum</MenuItem>
            </Select>
          </FormControl>
          <div className={s.qr}>
              <div id="qr" className={s.imgCtn}>
                {showBtc && <img src={qr1} alt="QR CODE" loading="eager" width="400" height="400"/>}
                {!showBtc && <img src={qr2} alt="QR CODE" loading="eager" width="400" height="400"/>}
              </div>
              <div className={s.address}>
                  <input
                  type="text"
                  ref={textAreaRef}
                  value={showBtc ? coin.bitcoin.address : coin.ethereum.address}
                  disabled
                  />
                <div className={s.icon}>
                  <a href="#icon" onClick={() => handleClick("copy")}>
                    {showBtc && <VscCopy onClick={() => copyToClipBoard(coin.bitcoin.address)} size="4em" style={copy ? {color: "#00e99b"} : {}}/>}
                    {!showBtc && <VscCopy onClick={() => copyToClipBoard(coin.ethereum.address)} size="4em" style={copy ? {color: "#00e99b"} : {}}/>}
                  </a>
                  {!copySuccess && <p>Copy</p>}
                  {copySuccess && <p>Copied!</p>}
                </div>
              </div>
          </div>

          <div className={s.text}>
            {showBtc && <p>Send only <span>{coin.bitcoin.title}({coin.bitcoin.network}) </span>to this address, sending any other coin may result to permanent loss</p>}
            {!showBtc && <p>Send only <span>{coin.ethereum.title}({coin.ethereum.network}) </span>to this address, sending any other coin may result to permanent loss</p>}
          </div>

          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("back")}>
            <span style={{...span2}}>&larr;</span> Back To Dashboard
          </button>
          <button className="bigBtn full" style={{...overwrite}} onClick={() => btnClick("upload")}>
            Upload Payment Proof <span style={{...span}}>&rarr;</span>
          </button>
        </div>
      }

      {page === 3 &&
        <ImageUploading multiple value={images} onChange={handleImage} maxNumber={1} dataURLKey="data_url" >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div className={s.uploadCtn} style={imageList.length > 0 ? {...someCtns} : undefined}  {...dragProps}>
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload}> Click or Drop here </button>
            {imageList.map((image, i) => (
              <Fragment key={i}>
                <div className={s.imgCtn2}>
                  <img src={image['data_url']} alt="proof"/>
                <div className={s.btns2}>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageUpdate(i)}>Update</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={() => onImageRemove(i)}>Remove</button>
                  <button className="bigBtn full" style={{...overwrite}} onClick={submitImage}>{(pending && pending !== "done") ? "Uploading..." : pending === "done" ? "Done" : "Upload"}</button>
                  {error && <p className="formError">{error}</p>}
                </div>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </ImageUploading>
      }

    </div>
  )
  }



  const overwrite = {
    background: "none",
    border: "1px solid #000000",
  }

  const span = {
    fontSize: "1.5em",
    paddingLeft: "1em",
  }

  const span2 = {
    fontSize: "1.5em",
    paddingRight: "1em",
  }

  const someCtns = {
    minHeight: "auto",
    border: "none",
  }