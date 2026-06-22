import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const [achievementsData, setAchievementsData] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/achievements`).then(r => r.json());
        if (res.success) setAchievementsData(res.data);
      } catch {}
    };
    fetchAchievements();
  }, []);

  useEffect(() => {
    if (achievementsData.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from('.achieve-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });
      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.timeline-container', start: 'top 80%' },
        x: (i) => (i % 2 === 0 ? -60 : 60),
        opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [achievementsData]);

  if (achievementsData.length === 0) return null;

  return (
    <section id="achievements" ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="section-container">
        <div className="achieve-header text-center mb-16">
          <span className="font-body text-sm font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent-red)' }}>Milestones</span>
          <h2 className="section-title mt-2">MY <span className="gradient-text">ACHIEVEMENTS</span></h2>
          <p className="section-subtitle mx-auto mt-3">Key milestones and recognitions in my journey</p>
        </div>

        <div className="timeline-container relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]"
            style={{ background: 'linear-gradient(to bottom, var(--accent-red), var(--accent-blue), var(--accent-red))', opacity: 0.3 }} />

          {achievementsData.map((a, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={a._id || a.id} className={`timeline-item relative flex items-start mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-[7px] z-10 mt-6"
                  style={{ background: 'var(--accent-red)', boxShadow: '0 0 12px var(--accent-red-glow)' }} />
                <div className="hidden md:block md:w-1/2" />
                <motion.div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <div className="glass-card p-6 relative web-corner">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold mb-3"
                      style={{ background: 'rgba(226,54,54,0.1)', border: '1px solid rgba(226,54,54,0.3)', color: 'var(--accent-red)' }}>
                      {a.date}
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{a.icon}</span>
                      <div>
                        <h3 className="font-heading text-xl tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>{a.title}</h3>
                        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{a.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
