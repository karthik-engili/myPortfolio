import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSend, FiMapPin, FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const [sRes, soRes] = await Promise.all([
          fetch(`${apiUrl}/api/settings`).then(r => r.json()),
          fetch(`${apiUrl}/api/social`).then(r => r.json()),
        ]);
        if (sRes.success) setSettings(sRes.data);
        if (soRes.success) setSocialLinks(soRes.data);
      } catch {
        setSettings({ location: 'Hyderabad, India', email: 'email@example.com', phone: '+91 0000000000' });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Message sent! I\'ll get back to you soon. 🕷️', { theme: 'dark' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send. Please try again.', { theme: 'dark' });
      }
    } catch {
      toast.error('Server error. Please try again later.', { theme: 'dark' });
    }
    setSending(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const getSocialIcon = (link) => {
    const p = link.platform?.toLowerCase() || '';
    if (p.includes('github')) return FiGithub;
    if (p.includes('linkedin')) return FiLinkedin;
    if (p.includes('twitter') || p.includes('x')) return FiTwitter;
    return FiGithub;
  };

  const contactInfo = settings ? [
    { icon: FiMapPin, label: 'Location', value: settings.location },
    { icon: FiMail, label: 'Email', value: settings.email },
    { icon: FiPhone, label: 'Phone', value: settings.phone },
  ] : [];

  const inputStyle = {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  };

  const inputFocusClass = 'focus:outline-none focus:border-spidey-red focus:ring-1 focus:ring-spidey-red/30';

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <div className="contact-reveal text-center mb-16">
          <span className="font-body text-sm font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--accent-red)' }}>
            Let's connect
          </span>
          <h2 className="section-title mt-2">GET IN <span className="gradient-text">TOUCH</span></h2>
          <p className="section-subtitle mx-auto mt-3">Have a project in mind? Let's work together!</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-reveal">
              <h3 className="font-heading text-2xl tracking-wider mb-6" style={{ color: 'var(--text-primary)' }}>
                CONTACT INFO
              </h3>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(226,54,54,0.1)', border: '1px solid rgba(226,54,54,0.2)' }}>
                      <Icon size={20} style={{ color: 'var(--accent-red)' }} />
                    </div>
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                      <p className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-reveal">
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
                Follow me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link);
                  return (
                    <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-red)'; e.currentTarget.style.color = 'var(--accent-red)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-reveal lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${inputFocusClass}`}
                    style={inputStyle} placeholder="Your name" />
                  {errors.name && <p className="text-spidey-red text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${inputFocusClass}`}
                    style={inputStyle} placeholder="your@email.com" />
                  {errors.email && <p className="text-spidey-red text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${inputFocusClass}`}
                  style={inputStyle} placeholder="What's this about?" />
                {errors.subject && <p className="text-spidey-red text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5}
                  className={`w-full px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 resize-none ${inputFocusClass}`}
                  style={inputStyle} placeholder="Tell me about your project..." />
                {errors.message && <p className="text-spidey-red text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button type="submit" disabled={sending}
                className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiSend size={18} /> Send Message</>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
