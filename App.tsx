
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MainCards from './components/MainCards';
import ActionCards from './components/ActionCards';
import UnitsSection from './components/UnitsSection';
import StoreSection from './components/StoreSection';
import MapSection from './components/MapSection';
import FullMatImage from './components/FullMatImage';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BeltSeparator from './components/BeltSeparator';

const App: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden selection:bg-[#F7B500] selection:text-black bg-[#050505]">
      <Navbar />
      <Hero />
      <BeltSeparator />
      <div className="py-8">
        <MainCards />
      </div>
      <BeltSeparator />
      <div className="py-8">
        <ActionCards />
      </div>
      <BeltSeparator />
      <UnitsSection />
      <BeltSeparator />
      <MapSection />
      <BeltSeparator />
      <StoreSection />
      <FullMatImage />
      <BeltSeparator />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default App;
