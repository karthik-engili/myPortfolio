import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Full-Stack', 'Frontend', 'Backend'];

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden group cursor-pointer relative"
      onClick={() => onClick(project)}
      whileHover={{ y: -8 }}
    >
      <div className="h-48 relative overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-web-pattern opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(226,54,54,0.15), rgba(33,70,199,0.15))` }}>
              <span className="font-heading text-4xl tracking-widest opacity-30" style={{ color: 'var(--text-primary)' }}>{project.title.substring(0, 2).toUpperCase()}</span>
            </div>
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'rgba(10,10,10,0.8)' }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-3 rounded-full transition-all duration-300 hover:scale-110" style={{ background: 'var(--accent-red)', color: '#ffffff' }}><FiExternalLink size={18} /></a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-3 rounded-full transition-all duration-300 hover:scale-110" style={{ border: '2px solid var(--accent-red)', color: 'var(--accent-red)' }}><FiGithub size={18} /></a>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-body font-semibold" style={{ background: 'var(--accent-red)', color: '#ffffff' }}>Featured</div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl tracking-wider mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
        <p className="font-body text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack?.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }} />
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative max-w-2xl w-full glass-card overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full z-10 transition-colors duration-300" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}><FiX size={20} /></button>
        <div className="h-56 md:h-64 relative" style={{ background: 'var(--bg-tertiary)' }}>
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 bg-web-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, rgba(226,54,54,0.2), rgba(33,70,199,0.2))` }}>
                <span className="font-heading text-6xl tracking-widest opacity-20" style={{ color: 'var(--text-primary)' }}>{project.title.substring(0, 2).toUpperCase()}</span>
              </div>
            </>
          )}
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="tag">{project.category}</span>
            {project.featured && (<span className="text-xs font-body font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--accent-red)', color: '#fff' }}>Featured</span>)}
          </div>
          <h3 className="font-heading text-4xl tracking-wider mb-4" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
          <p className="font-body text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
          <div className="mb-6">
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2">{project.techStack?.map((tech) => (<span key={tech} className="tag">{tech}</span>))}</div>
          </div>
          <div className="flex gap-4">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm"><FiExternalLink size={16} /> Live Demo</a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2 text-sm"><FiGithub size={16} /> Source Code</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/projects`).then(r => r.json());
        if (res.success) setProjectsData(res.data.filter(p => p.status !== 'draft' && p.status !== 'archived'));
      } catch {}
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' ? projectsData : projectsData.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedProject) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <div className="projects-header text-center mb-12">
          <span className="font-body text-sm font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent-red)' }}>What I've built</span>
          <h2 className="section-title mt-2">MY <span className="gradient-text">PROJECTS</span></h2>
          <p className="section-subtitle mx-auto mt-3">A showcase of my recent work and side projects</p>
        </div>
        <div className="projects-header flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className="px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
              style={{ background: activeFilter === cat ? 'linear-gradient(135deg, var(--accent-red), #b71c1c)' : 'var(--bg-card)', color: activeFilter === cat ? '#ffffff' : 'var(--text-secondary)', border: `1px solid ${activeFilter === cat ? 'var(--accent-red)' : 'var(--border-color)'}`, boxShadow: activeFilter === cat ? '0 4px 15px var(--accent-red-glow)' : 'none' }}>
              {cat}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (<ProjectCard key={project._id || project.id} project={project} onClick={setSelectedProject} />))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedProject && (<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />)}
      </AnimatePresence>
    </section>
  );
}
