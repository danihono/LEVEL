
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface StatItemProps {
  endValue: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ endValue, label, suffix = "", prefix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const nextCount = Math.floor(easeProgress * endValue);
      setCount(nextCount);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(endValue);
    };
    const timer = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(timer);
  }, [isVisible, endValue, delay]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-8 reveal">
      <div className="text-5xl md:text-7xl font-black text-brand-gold tracking-tighter mb-2 drop-shadow-[0_2px_10px_rgba(197,160,40,0.15)]">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[10px] md:text-xs font-black tracking-[0.5em] text-zinc-500 uppercase">
        {label}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <section className="relative w-full py-20 bg-[#080808] border-y border-[#C5A028]/10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <StatItem 
            endValue={500} 
            prefix="+" 
            label={t('stats_students')} 
            delay={100}
          />
          <StatItem 
            endValue={15} 
            suffix={language === 'PT' ? " ANOS" : language === 'ES' ? " AÑOS" : " YEARS"} 
            label={t('stats_years')} 
            delay={300}
          />
          <StatItem 
            endValue={120} 
            label={t('stats_champs')} 
            delay={500}
          />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#C5A028]/10 to-transparent"></div>
    </section>
  );
};

export default StatsSection;
