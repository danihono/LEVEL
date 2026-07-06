import React, { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import MainCards from './components/MainCards';
import ActionCards from './components/ActionCards';
import UnitsSection from './components/UnitsSection';
import StoreSection from './components/StoreSection';
import AppSection from './components/AppSection';
import MapSection from './components/MapSection';
import StatsSection from './components/StatsSection';
import FullMatImage from './components/FullMatImage';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BeltSeparator from './components/BeltSeparator';
import BlackBeltsShowcase from './components/BlackBeltsShowcase';
import BlackBeltsPage from './components/BlackBeltsPage';
import WhatsAppButton from './components/WhatsAppButton';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash.startsWith('#admin') || hash.startsWith('#faixas-pretas')) return;

    window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden selection:bg-[#C5A028] selection:text-black bg-[#0b0b0b]">
      <Navbar />
      <Hero />
      <AboutSection />
      <BeltSeparator />
      <div className="py-8">
        <MainCards />
      </div>
      <BeltSeparator />
      <BlackBeltsShowcase />
      <BeltSeparator />
      <div className="py-8">
        <ActionCards />
      </div>
      <BeltSeparator />
      <UnitsSection />
      <BeltSeparator />
      <MapSection />
      <StatsSection />
      <BeltSeparator />
      <StoreSection />
      <BeltSeparator />
      <AppSection />
      <FullMatImage />
      <BeltSeparator />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const AdminApp = React.lazy(() => import('./components/admin/AdminApp'));

type AppRoute = 'site' | 'admin' | 'black-belts';

const getAppRoute = (): AppRoute => {
  if (window.location.hash.startsWith('#admin')) return 'admin';
  if (window.location.hash.startsWith('#faixas-pretas')) return 'black-belts';
  return 'site';
};

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(getAppRoute);

  useEffect(() => {
    const onHash = () => setRoute(getAppRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <LanguageProvider>
      {route === 'admin' ? (
        <Suspense
          fallback={<div className="min-h-screen grid place-items-center bg-[#0b0b0b] text-white/55">Carregando...</div>}
        >
          <AdminApp />
        </Suspense>
      ) : route === 'black-belts' ? (
        <BlackBeltsPage />
      ) : (
        <AppContent />
      )}
    </LanguageProvider>
  );
};

export default App;
