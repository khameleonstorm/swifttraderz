// Import css modules stylesheet as styles
import styles from './Home.module.css';
import useAuth from '../../hooks/useAuth';

// Import components
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import HomeSec1 from '../../components/homeSec1/HomeSec1';
import HomeSec2 from '../../components/homeSec2/HomeSec2';
import HomeSec3 from '../../components/homeSec3/HomeSec3';
import AppleChart from '../../components/appleChart/AppleChart';
import Learning from '../../components/learning/Learning';
import Testimonials from '../../components/testimonials/Testimonials';
import Footer from '../../components/footer/Footer';

// import texts from utils 
import { homeSec1Text, homeSec2Text, homeSec3Text, homeSec5Text, homeSec6Text, services, heroText, testimonials, withdrawals } from '../../utils/homeText';
import { MoonLoader } from 'react-spinners';
import GeneralWithdraws from '../../components/generalWithdraws/GeneralWithdraws';



export default function Home() {
  const { authIsReady } = useAuth();


  if(!authIsReady){
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <MoonLoader color="#1649ff" />
        </div>
      </div>
    )
  }


  if(authIsReady){
    return (
      <div className={styles.container}>
        <Nav />
        <Hero title={heroText.title} subtitle={heroText.subtitle} image={heroText.image} link={heroText.link}/>
        <HomeSec1 title={homeSec1Text.title} subtitle={homeSec1Text.subtitle} card={homeSec1Text.card} />
        <HomeSec2 title={homeSec6Text.title} subtitle={homeSec6Text.subtitle} image={homeSec6Text.image} accordions={homeSec6Text.accordions} />
        <HomeSec3 title={homeSec3Text.title} subtitle={homeSec3Text.subtitle} withdrawals={withdrawals} bars={homeSec3Text.bars} />
        <AppleChart />
        <HomeSec1 title={services.title} subtitle={services.subtitle} card={services.card} />
        <Learning />
        <Testimonials title={testimonials.title} subtitle={testimonials.subtitle} testimonials={testimonials.card} />
        <HomeSec2 title={homeSec5Text.title} subtitle={homeSec5Text.subtitle} image={homeSec2Text.image} accordions={homeSec5Text.accordions} reverse={true}/>
        <Footer />
        <GeneralWithdraws withdrawals={withdrawals}/>
      </div>
    )

  }
}
