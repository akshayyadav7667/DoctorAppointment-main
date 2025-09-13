import React from 'react'
import Header from '../components/Header'
import Specialities from '../components/Specialities'
import Banner from '../components/Banner'
import WhyHostpital from '../components/WhyHostpital'
import Benefits from '../components/Benefits'
// import Faq from './Faq'
import Features from './Features'
import TopDoctors from './TopDoctors'
import StartBooking from './user/StartBooking'
import ApplyForDoctor from './ApplyForDoctor'

export default function HomePage() {
  return (
    <div>
      <Header/>
      <Specialities/>
      <Banner/>
      <TopDoctors/>

      <WhyHostpital/>
      <StartBooking/>
      <ApplyForDoctor/>

      {/* <Features/> */}
      {/* <Faq/> */}
      
    </div>
  )
}
