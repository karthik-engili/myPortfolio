import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/portfolioData';
import {
  SiReact, SiJavascript, SiHtml5, SiCss, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiPostman, SiFirebase,
  SiGit, SiDocker, SiFigma, SiLinux, SiVercel
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  SiReact, SiJavascript, SiHtml5, 'SiCss3': SiCss, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPython, SiPostman, SiFirebase,
  SiGit, 'SiVisualstudiocode': VscCode, SiDocker, SiFigma, SiLinux, SiVercel,
};

function SkillBar({ name, level, icon, delay }) {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const IconComponent = iconMap[icon];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={barRef}
      className="glass-card p-5 relative web-corner group cursor-default"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {IconComponent && (
            <IconComponent
              size={22}
              className="transition-colors duration-300"
              style={{ color: 'var(--accent-red)' }}
            />
          )}
          <span
            className="font-body text-sm font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {name}
          </span>
        </div>
        <span
          className="font-code text-xs font-medium"
          style={{ color: 'var(--accent-red)' }}
        >
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--border-color)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-[1500ms] ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, var(--accent-red), var(--accent-blue))`,
            boxShadow: visible ? '0 0 8px var(--accent-red-glow)' : 'none',
            transitionDelay: `${delay * 100}ms`,
          }}
        />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, var(--accent-red-glow), transparent 70%)',
          opacity: 0,
        }}
      />
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="section-container">
        {/* Section header */}
        <div className="skills-header text-center mb-12">
          <span
            className="font-body text-sm font-medium tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent-red)' }}
          >
            What I work with
          </span>
          <h2 className="section-title mt-2">
            MY <span className="gradient-text">SKILLS</span>
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Category tabs */}
        <div className="skills-header flex justify-center gap-2 mb-12 flex-wrap">
          {skillsData.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className="px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === i
                  ? 'linear-gradient(135deg, var(--accent-red), #b71c1c)'
                  : 'var(--bg-card)',
                color: activeCategory === i ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === i ? 'var(--accent-red)' : 'var(--border-color)'}`,
                boxShadow: activeCategory === i ? '0 4px 15px var(--accent-red-glow)' : 'none',
              }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillsData[activeCategory].skills.map((skill, i) => (
            <SkillBar key={skill.name} {...skill} delay={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
