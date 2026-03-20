/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Server, 
  Code2, 
  Cpu, 
  Download, 
  Menu, 
  X,
  Terminal,
  Database,
  Network,
  Monitor,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const MagneticButton = ({ children, className, ...props }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Why Hire Me', href: '#why-hire-me' },
    { name: 'Skills', href: '#skills' },
    { name: 'Project', href: '#project' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black tracking-tighter group flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl">S</div>
          <span className="hidden sm:block">SK<span className="text-blue-500 group-hover:text-purple-500 transition-colors duration-500">.</span></span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
            <MagneticButton>
              <a
                href="/Sinenhlanhla_Khumalo_CV.pdf"
                download
                className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-500 flex items-center gap-2 shadow-xl"
              >
                <Download size={14} />
                CV
              </a>
            </MagneticButton>
          </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[73px] bg-[#030712] z-40"
          >
            <div className="flex flex-col p-8 gap-6">
              {navItems.map((item, i) => (
                <motion.a 
                  key={item.name} 
                  href={item.href} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-black tracking-tighter text-slate-300 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a 
                href="/Sinenhlanhla_Khumalo_CV.pdf" 
                download
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-4"
              >
                <Download size={20} />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) => (
  <div className="mb-24 relative">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/50">
          {number ? `0${number}` : 'Portfolio'}
        </span>
        <div className="h-[1px] w-12 bg-blue-500/30" />
      </div>
      <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-[0.85]">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === title.split(' ').length - 1 ? 'gradient-text' : 'text-white'}>
            {word}<br className="hidden md:block" />
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-xl text-lg md:text-xl font-light leading-relaxed border-l-2 border-blue-500/20 pl-8">
          {subtitle}
        </p>
      )}
    </motion.div>
  </div>
);

const SkillCard = ({ icon: Icon, title, skills, logos, color }: { icon: any, title: string, skills: string[], logos?: string[], color?: 'blue' | 'purple' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bento-card group"
  >
    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] transition-all duration-700 group-hover:scale-150 ${color === 'purple' ? 'bg-purple-500/10' : 'bg-blue-500/10'}`} />
    
    <div className={`w-14 h-14 rounded-2xl ${color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
      <Icon size={28} />
    </div>
    
    <h3 className="text-2xl font-black text-white mb-6 tracking-tight uppercase">{title}</h3>
    
    <div className="flex flex-wrap gap-2 mb-8">
      {skills.map((skill, i) => (
        <span key={i} className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 border border-white/5 group-hover:border-blue-500/20 transition-colors">
          {skill}
        </span>
      ))}
    </div>
    
    {logos && (
      <div className="flex gap-5 pt-6 border-t border-white/5">
        {logos.map((logo, i) => (
          <img key={i} src={logo} alt="skill logo" className="w-6 h-6 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500" referrerPolicy="no-referrer" />
        ))}
      </div>
    )}
  </motion.div>
);

export default function App() {
  const GITHUB_PROFILE = "https://github.com/Sne1623";
  const DEVCONNECT_REPO = "https://github.com/Sne1623/DevConnect";
  const LINKEDIN_PROFILE = "http://www.linkedin.com/in/sinenhlanhla-khumalo-337923395";

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30 relative">
      <div className="noise-overlay" />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full mesh-gradient opacity-40" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
          <div className="absolute inset-0 grid-pattern opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black tracking-[0.3em] mb-12 backdrop-blur-md shadow-2xl uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for New Opportunities
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="opacity-90 uppercase text-white"
              >
                SINENHLANHLA
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="gradient-text text-glow relative uppercase italic"
              >
                KHUMALO
              </motion.span>
            </h1>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-2xl text-blue-400 font-black tracking-[0.4em] uppercase mb-12"
            >
              Junior Full-Stack Developer
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-lg md:text-xl text-slate-400 mb-16 font-light max-w-2xl mx-auto leading-relaxed"
            >
              "I build real-world web applications using <span className="text-white font-medium">React and Firebase</span>. 
              Passionate about solving problems and growing in the tech industry."
              <br />
              <span className="text-[10px] font-black tracking-[0.5em] text-slate-500 mt-8 block uppercase">📍 Johannesburg, South Africa</span>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <MagneticButton className="relative group">
                <a 
                  href="#contact"
                  className="px-12 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest transition-all flex items-center gap-4 shadow-2xl hover:bg-blue-600 hover:text-white overflow-hidden"
                >
                  Contact Me <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </a>
              </MagneticButton>
              
              <div className="flex gap-4">
                <MagneticButton>
                  <a 
                    href={GITHUB_PROFILE} 
                    target="_blank"
                    rel="noreferrer"
                    className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all backdrop-blur-xl shadow-xl group"
                  >
                    <Github size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a 
                    href={LINKEDIN_PROFILE} 
                    target="_blank"
                    rel="noreferrer"
                    className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all backdrop-blur-xl shadow-xl group"
                  >
                    <Linkedin size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-black">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-1 hidden md:flex flex-col items-center gap-8 pt-4">
              <div className="w-[1px] h-32 bg-gradient-to-b from-blue-500 to-transparent" />
              <span className="writing-vertical text-[10px] uppercase tracking-[0.8em] text-blue-500/50 font-black">Discovery</span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6"
            >
              <div className="mb-16">
                <h2 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter leading-none">
                  ABOUT <br /><span className="gradient-text">ME</span>
                </h2>
                <p className="text-2xl text-slate-300 font-medium leading-relaxed max-w-xl">
                  A blend of technical support expertise and a passion for building intelligent systems.
                </p>
              </div>

              <div className="space-y-10 text-slate-400 text-lg leading-relaxed max-w-xl">
                <p>
                  I am an IT Support Technician with NQF Level 4 & 5 qualifications, bringing a strong background in troubleshooting, system support, and networking.
                </p>
                <p>
                  Currently, I am transitioning into development and AI/ML. I am passionate about solving real-world problems using technology, which led me to build <span className="text-white font-medium">DevConnect</span>, a real-time collaboration platform.
                </p>
              </div>

              <div className="mt-16 grid grid-cols-2 gap-6">
                {[
                  { label: "NQF 5", sub: "IT System Support", href: "https://capeitinitiative-my.sharepoint.com/:b:/g/personal/esther_khumalo_capaciti_org_za/IQC36YoycV4sQ6XRJ8vwYUJwAeCkliha5-M4KoBJM2BMieU?e=WtlhkB" },
                  { label: "NQF 4", sub: "IT Support", href: "https://coursera.org/share/14ead30dbfb8be7d5e5572a09793b434" }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bento-card group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-4xl font-black text-white">{item.label}</h4>
                      <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.sub}</p>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-5 relative h-full"
            >
              <div className="bento-card h-full flex flex-col justify-center p-12">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Terminal className="text-blue-500 mb-10" size={56} />
                <h3 className="text-4xl font-black text-white mb-8 tracking-tight uppercase">Technical Philosophy</h3>
                <div className="space-y-6">
                  {[
                    "User-centric problem solving",
                    "Scalable system architecture",
                    "Real-time data synchronization",
                    "Continuous learning & adaptation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-slate-300 text-lg font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section id="why-hire-me" className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="02"
            title="Why Hire Me" 
            subtitle="Bridging the gap between technical support and full-stack development."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {[
              {
                title: "NQF Level 5",
                desc: "Qualified in IT, providing a solid theoretical and practical foundation.",
                icon: CheckCircle2,
                color: "blue"
              },
              {
                title: "Hybrid Expertise",
                desc: "Strong background in both development and IT support environments.",
                icon: Cpu,
                color: "purple"
              },
              {
                title: "Real-World Focus",
                desc: "Built functional applications with modern stacks like React and Firebase.",
                icon: Code2,
                color: "blue"
              },
              {
                title: "Team Player",
                desc: "Fast learner with a collaborative mindset and strong problem-solving skills.",
                icon: Network,
                color: "purple"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="03"
            title="Technical Arsenal" 
            subtitle="My diverse skill set spanning from infrastructure support to modern web development and AI fundamentals."
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <SkillCard 
              icon={Network}
              title="Infrastructure"
              skills={["Active Directory", "Troubleshooting", "Networking", "System Admin"]}
              color="blue"
            />
            <SkillCard 
              icon={Code2}
              title="Development"
              skills={["React", "Firebase", "JavaScript", "SQL", "Tailwind CSS"]}
              color="purple"
              logos={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              ]}
            />
            <SkillCard 
              icon={Cpu}
              title="AI & Data"
              skills={["Python", "Data Analysis", "Machine Learning", "Neural Networks"]}
              color="blue"
              logos={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section id="project" className="py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-purple-600/5 blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="04"
            title="Featured Project" 
            subtitle="DevConnect: A real-time SaaS collaboration platform."
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-card !p-0 overflow-hidden group border-white/5"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden aspect-video lg:aspect-auto bg-slate-950">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                  alt="DevConnect Dashboard Mockup" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20" />
                
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="p-10 rounded-[2rem] bg-black/60 backdrop-blur-2xl border border-white/10 text-center shadow-2xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                    </div>
                    <p className="text-blue-400 font-black text-xs tracking-[0.4em] uppercase mb-4">System Status</p>
                    <p className="text-white text-3xl font-black tracking-tighter uppercase">LIVE DEPLOYMENT</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="p-12 md:p-20 flex flex-col justify-center relative">
                <div className="flex items-center gap-3 text-blue-500 text-xs font-black uppercase tracking-[0.3em] mb-8">
                  <div className="w-8 h-[1px] bg-blue-500" />
                  SaaS Solution
                </div>
                <h3 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-none">DEVCONNECT</h3>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-light">
                  A real-time collaboration platform built with React and Firebase to help teams manage tasks and communicate efficiently.
                </p>

                <div className="grid grid-cols-2 gap-12 mb-16">
                  <div>
                    <h4 className="text-white font-black mb-4 flex items-center gap-3 uppercase text-[10px] tracking-[0.3em]">
                      <Database size={14} className="text-blue-500" /> Stack
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">React, Firebase, Tailwind CSS, Framer Motion</p>
                  </div>
                  <div>
                    <h4 className="text-white font-black mb-4 flex items-center gap-3 uppercase text-[10px] tracking-[0.3em]">
                      <Monitor size={14} className="text-blue-500" /> Core
                    </h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">Real-time sync, Multi-user collaboration</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <MagneticButton>
                    <a 
                      href={DEVCONNECT_REPO}
                      target="_blank"
                      rel="noreferrer"
                      className="px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/20 group"
                    >
                      Explore <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a 
                      href={GITHUB_PROFILE} 
                      target="_blank"
                      rel="noreferrer"
                      className="px-10 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black transition-all flex items-center gap-3 backdrop-blur-xl"
                    >
                      <Github size={18} /> Source
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-24 relative overflow-hidden grid-pattern">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1920" 
            alt="GitHub Background" 
            className="w-full h-full object-cover opacity-[0.05]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-slate-300 relative z-10">
              <Github size={32} />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 relative z-10">More on GitHub</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 relative z-10">
              Explore more of my projects, technical work, and open-source contributions.
            </p>
            
            <a 
              href={GITHUB_PROFILE} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-all relative z-10"
            >
              View GitHub <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="05"
            title="Experience" 
            subtitle="My professional background and learning journey."
          />

          <div className="space-y-6 mt-16 max-w-5xl">
            {[
              {
                date: "2025 - Present",
                title: "Bootcamp AI/ML",
                sub: "Advanced Training",
                points: [
                  "Intensive training in AI and Machine Learning fundamentals, focusing on real-world problem solving.",
                  "Hands-on experience with Python, Data Analysis, and Neural Networks for predictive modeling.",
                  "Developing AI-driven solutions and real-time applications using modern frameworks."
                ]
              },
              {
                date: "Present",
                title: "IT Support Technician",
                sub: "Technical Operations",
                points: [
                  "Troubleshooting complex network and system issues to ensure maximum operational efficiency.",
                  "Supporting users with hardware and software problems, providing high-quality technical assistance.",
                  "Maintaining system performance and uptime through proactive monitoring and maintenance."
                ]
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card group"
              >
                <div className="grid md:grid-cols-12 gap-10">
                  <div className="md:col-span-4">
                    <div className="inline-block px-4 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      {item.date}
                    </div>
                    <h4 className="text-3xl font-black tracking-tight group-hover:text-blue-400 transition-colors uppercase">{item.title}</h4>
                    <p className="text-slate-500 mt-4 font-black text-[10px] uppercase tracking-[0.3em]">{item.sub}</p>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-6">
                      {item.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-5">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <p className="text-slate-400 text-lg leading-relaxed font-light">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="06"
            title="Certifications" 
            subtitle="My formal qualifications in IT Support and systems."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { label: "NQF Level 5", sub: "IT System Support", href: "https://capeitinitiative-my.sharepoint.com/:b:/g/personal/esther_khumalo_capaciti_org_za/IQC36YoycV4sQ6XRJ8vwYUJwAeCkliha5-M4KoBJM2BMieU?e=WtlhkB" },
              { label: "NQF Level 4", sub: "IT Support", href: "https://coursera.org/share/14ead30dbfb8be7d5e5572a09793b434" },
              { label: "AI BADGE", sub: "Coursera Certification", href: "https://coursera.org/share/ea24281896afc4b73a728ce846475b78" }
            ].map((cert, i) => (
              <motion.a 
                key={i}
                href={cert.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card group flex flex-col justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-8">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight uppercase mb-2">{cert.label}</h4>
                  <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">{cert.sub}</p>
                </div>
                <div className="mt-8 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                    <ExternalLink size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="07"
            title="Get In Touch" 
            subtitle="Let's build something amazing together."
          />

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bento-card p-12 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                  HAVE A <br /><span className="gradient-text">PROJECT?</span>
                </h3>
                <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>
              </div>

              <div className="space-y-6">
                <a href="mailto:khumalosinenhlanhla82@gmail.com" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Me</p>
                    <p className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">khumalosinenhlanhla82@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400">
                    <Monitor size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</p>
                    <p className="text-lg font-medium text-white">Johannesburg, South Africa</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bento-card p-12"
            >
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <MagneticButton>
                  <button className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/20">
                    Send Message
                  </button>
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 Sinenhlanhla Khumalo. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 z-50 hover:bg-blue-500 transition-colors group"
          >
            <ArrowRight size={24} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
