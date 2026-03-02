import React from 'react';
import Header from '../components/public/Header';
import Hero from '../components/public/Hero';
import Services from '../components/public/Services';
import About from '../components/public/About';
import WhyChooseUs from '../components/public/WhyChooseUs';
import BookingForm from '../components/public/BookingForm';
import Footer from '../components/public/Footer';

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <BookingForm />
      <Footer />
    </>
  );
};

export default HomePage;
