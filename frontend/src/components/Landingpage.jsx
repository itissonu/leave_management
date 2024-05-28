import React from 'react'
import Header from './Header'
import Navbar from '../landingpage/Navbar'
import Footer from '../landingpage/Footer'
import Hero from '../landingpage/Hero'
import Features from '../landingpage/Features'
import Blank from '../landingpage/Blank'
import Pricing from '../landingpage/Pricing'

const Landingpage = () => {
  return (
    <div className="flex flex-col overflow-hidden">


      <section  >
        <Navbar  />
        <Footer className='overflow-visible' />

      </section>
      <main className="flex flex-col items-center justify-center overflow-visible  relative z-10  ">
        <section id="Hero" className='w-full'>
          <Hero />
        </section>
        <section id="Features" className='w-full'>
          <Features />
        </section>

        <section id="Pricing" className='w-full'>
          <Pricing />
        </section>

      </main>
      <section className='w-full'>
        <Blank />
      </section>

    </div>
  )
}

export default Landingpage