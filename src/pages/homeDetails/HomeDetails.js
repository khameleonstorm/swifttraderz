import { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import Footer from '../../components/footer/Footer'
import PropertyDetails from '../../components/propertyDetails/PropertyDetails'
import { useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners';
import useAuth from '../../hooks/useAuth'

export default function HomeDetails() {
  const [pending, setPending] = useState(true)
  const [property, setProperty] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams();
  const { authIsReady, user } = useAuth();

  useEffect(() => {
    setPending(true)
  async function fetchData() {
  try {
    const res = await fetch(`https://us-real-estate.p.rapidapi.com/property-detail?property_id=${id}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': "8d94690c5emshf27b0999e032819p1fc340jsn6688a6a23f2d",
        'X-RapidAPI-Host': 'us-real-estate.p.rapidapi.com'
      }
    })

    const { data, status } = await res.json();
    if(status === 200){
      setProperty(data)
      setPending(false)
    }


  } catch (err) {
    setError(err.message)
    setPending(false)
  }}

  fetchData()
  setPending(false)
  }, [id])

    
  if(pending && !authIsReady){
    return (
      <div className="spinnerContainer">
        <div className="spinner">
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }




  if(authIsReady && property){
  return (
    <>
    <Nav />
    <PropertyDetails details={property} error={error} user={user}/>
    <Footer />
    </>
  )
}}
