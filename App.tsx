
import React, { useEffect, useState, Suspense } from 'react';
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
import WhatsAppButton from './components/WhatsAppButton';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
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

// Painel de admin carregado sob demanda (só quando a URL tem #admin), pra não pesar
// o site para os visitantes normais.
const AdminApp = React.lazy(() => import('./components/admin/AdminApp'));

const isAdminHash = () => window.location.hash.startsWith('#admin');

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(isAdminHash);

  useEffect(() => {
    const onHash = () => setIsAdmin(isAdminHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <LanguageProvider>
      {isAdmin ? (
        <Suspense
          fallback={<div className="min-h-screen grid place-items-center bg-[#0b0b0b] text-white/55">Carregando…</div>}
        >
          <AdminApp />
        </Suspense>
      ) : (
        <AppContent />
      )}
    </LanguageProvider>
  );
};

export default App;
