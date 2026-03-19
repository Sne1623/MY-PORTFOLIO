/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    { name: 'Skills', href: '#skills' },
    { name: 'Project', href: '#project' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          SK<span className="text-blue-500">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="nav-link"
            >
              {item.name}
            </motion.a>
          ))}
            <motion.a
              href="#"
              download="Sinenhlanhla_Khumalo_CV.pdf"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all flex items-center gap-2"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030712] border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-lg text-slate-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#" 
                download="Sinenhlanhla_Khumalo_CV.pdf"
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) => (
  <div className="mb-16 relative">
    {number && (
      <span className="absolute -top-8 -left-4 text-8xl font-black text-white/[0.03] select-none pointer-events-none">
        {number}
      </span>
    )}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i === title.split(' ').length - 1 ? 'text-blue-500' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      <div className="h-1.5 w-20 bg-blue-600 rounded-full mb-8" />
      {subtitle && (
        <p className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  </div>
);

const SkillCard = ({ icon: Icon, title, skills, logos }: { icon: any, title: string, skills: string[], logos?: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="glass-card p-8 group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{title}</h3>
    <div className="flex flex-wrap gap-2 mb-8">
      {skills.map((skill, i) => (
        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5 font-medium">
          {skill}
        </span>
      ))}
    </div>
    {logos && (
      <div className="flex gap-4 pt-6 border-t border-white/5">
        {logos.map((logo, i) => (
          <img key={i} src={logo} alt="skill logo" className="w-6 h-6 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
        ))}
      </div>
    )}
  </motion.div>
);

export default function App() {
  const GITHUB_PROFILE = "https://github.com/Sne1623";
  const DEVCONNECT_REPO = "https://github.com/Sne1623/DevConnect";
  const LINKEDIN_PROFILE = "http://www.linkedin.com/in/sinenhlanhla-khumalo-337923395";

  return (
    <div className="min-h-screen selection:bg-blue-500/30 relative">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden mesh-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          
          {/* Floating Tech Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-[20%] left-[15%] text-blue-500/20"
            >
              <Cpu size={120} />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[20%] right-[15%] text-purple-500/20"
            >
              <Database size={100} />
            </motion.div>
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-[40%] right-[20%] text-blue-400/10"
            >
              <Terminal size={80} />
            </motion.div>
          </div>

          {/* Abstract Tech Visual */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" 
              alt="Tech Network" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold mb-8 backdrop-blur-md shadow-2xl tracking-widest uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Empowering Innovation through AI & IT
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85] flex flex-col items-center">
              <span className="opacity-90">SINENHLANHLA</span>
              <span className="gradient-text text-glow relative">
                KHUMALO
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              IT Support Technician & <span className="text-white font-medium">Aspiring AI/ML Developer</span>. 
              <br className="hidden md:block" />
              Bridging the gap between robust infrastructure and intelligent systems.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href={DEVCONNECT_REPO}
                target="_blank"
                rel="noreferrer"
                className="px-12 py-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(37,99,235,0.4)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore DevConnect <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={GITHUB_PROFILE} 
                target="_blank"
                rel="noreferrer"
                className="px-12 py-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black transition-all flex items-center gap-3 backdrop-blur-xl shadow-xl"
              >
                <Github size={20} /> GitHub Profile
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/50 to-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-scroll" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Number Accent */}
          <div className="absolute -top-12 -left-4 text-[12rem] font-black text-white/[0.03] leading-none pointer-events-none select-none">
            01
          </div>

          <div className="grid md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-1 hidden md:flex flex-col items-center gap-8 pt-4">
              <div className="w-[1px] h-24 bg-gradient-to-b from-blue-500 to-transparent" />
              <span className="writing-vertical text-[10px] uppercase tracking-[0.5em] text-blue-500 font-black">Discovery</span>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6"
            >
              <div className="mb-12">
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                  ABOUT <span className="text-blue-500">ME</span>
                </h2>
                <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-8" />
                <p className="text-xl text-slate-300 font-medium leading-relaxed">
                  A blend of technical support expertise and a passion for building intelligent systems.
                </p>
              </div>

              <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
                <p>
                  I am an IT Support Technician with NQF Level 4 & 5 qualifications, bringing a strong background in troubleshooting, system support, and networking.
                </p>
                <p>
                  Currently, I am transitioning into development and AI/ML. I am passionate about solving real-world problems using technology, which led me to build <span className="text-white font-medium">DevConnect</span>, a real-time collaboration platform.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                <a 
                  href="https://capeitinitiative-my.sharepoint.com/:b:/g/personal/esther_khumalo_capaciti_org_za/IQC36YoycV4sQ6XRJ8vwYUJwAeCkliha5-M4KoBJM2BMieU?e=WtlhkB"
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-3xl font-black text-white">NQF 5</h4>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">IT Qualification</p>
                </a>
                <a 
                  href="https://coursera.org/share/14ead30dbfb8be7d5e5572a09793b434"
                  target="_blank"
                  rel="noreferrer"
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-3xl font-black text-white">NQF 4</h4>
                    <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">IT Support</p>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-5 relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-center relative group">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Terminal className="text-blue-500 mb-6" size={48} />
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Technical Philosophy</h3>
                <div className="space-y-4">
                  {[
                    "User-centric problem solving",
                    "Scalable system architecture",
                    "Real-time data synchronization",
                    "Continuous learning & adaptation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-blue-500" />
                      <span className="text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600/20 blur-2xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="02"
            title="Technical Arsenal" 
            subtitle="My diverse skill set spanning from infrastructure support to modern web development and AI fundamentals."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <SkillCard 
              icon={Network}
              title="Infrastructure & Support"
              skills={["Active Directory", "Troubleshooting", "Networking"]}
            />
            <SkillCard 
              icon={Code2}
              title="Development"
              skills={["React", "Firebase", "JavaScript", "HTML, CSS", "SQL"]}
              logos={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              ]}
            />
            <SkillCard 
              icon={Cpu}
              title="AI/ML (Learning)"
              skills={["Python", "Data Analysis", "Machine Learning Fundamentals"]}
              logos={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section id="project" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-purple-600/5 blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="03"
            title="Featured Project" 
            subtitle="DevConnect: A real-time SaaS collaboration platform."
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden group border-white/5"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden aspect-video lg:aspect-auto bg-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
                  alt="DevConnect Dashboard Mockup" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 mix-blend-overlay" />
                
                {/* Mockup Overlay Elements */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-center"
                  >
                    <p className="text-blue-400 font-black text-sm tracking-widest uppercase mb-2">Live Status</p>
                    <p className="text-white text-2xl font-black">ACTIVE SESSION</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="p-10 md:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Network size={120} />
                </div>
                
                <div className="flex items-center gap-2 text-blue-400 text-sm font-black uppercase tracking-widest mb-6">
                  <span className="w-12 h-[2px] bg-blue-500" />
                  SaaS Platform
                </div>
                <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">DEVCONNECT</h3>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  A real-time project management and collaboration platform that allows multiple users to create, update, and manage tasks simultaneously.
                </p>

                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div>
                    <h4 className="text-white font-black mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                      <Database size={16} className="text-blue-500" /> Tech Stack
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">React, Firebase (Firestore + Auth)</p>
                  </div>
                  <div>
                    <h4 className="text-white font-black mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                      <Monitor size={16} className="text-blue-500" /> Key Features
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">Real-time sync, Multi-user collab</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={DEVCONNECT_REPO}
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20 group"
                  >
                    View Project <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href={GITHUB_PROFILE} 
                    target="_blank"
                    rel="noreferrer"
                    className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black transition-all flex items-center gap-3 backdrop-blur-xl"
                  >
                    <Github size={20} /> Source Code
                  </a>
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
      <section id="experience" className="py-24 relative overflow-hidden grid-pattern">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920" 
            alt="Experience Background" 
            className="w-full h-full object-cover opacity-[0.05]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="04"
            title="Work Experience" 
            subtitle="My professional background and learning journey."
          />

          <div className="space-y-12 mt-16 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 flex flex-col md:flex-row gap-12 group hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="md:w-1/3">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-4">
                  2025 - Present
                </div>
                <h4 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">Bootcamp AI/ML</h4>
                <p className="text-slate-500 mt-2 font-mono text-sm uppercase tracking-widest">Advanced Training</p>
              </div>
              <div className="md:w-2/3">
                <ul className="space-y-6 text-slate-400">
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Intensive training in AI and Machine Learning fundamentals, focusing on real-world problem solving.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Hands-on experience with Python, Data Analysis, and Neural Networks for predictive modeling.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Developing AI-driven solutions and real-time applications using modern frameworks.</p>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 flex flex-col md:flex-row gap-12 group hover:bg-white/[0.03] transition-all duration-500"
            >
              <div className="md:w-1/3">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-4">
                  Present
                </div>
                <h4 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">IT Support Technician</h4>
                <p className="text-slate-500 mt-2 font-mono text-sm uppercase tracking-widest">Technical Operations</p>
              </div>
              <div className="md:w-2/3">
                <ul className="space-y-6 text-slate-400">
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Troubleshooting complex network and system issues to ensure maximum operational efficiency.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Supporting users with hardware and software problems, providing high-quality technical assistance.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <p className="leading-relaxed">Maintaining system performance and uptime through proactive monitoring and maintenance.</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            number="05"
            title="Certifications" 
            subtitle="My formal qualifications in IT Support and systems."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <motion.a 
              href="https://capeitinitiative-my.sharepoint.com/:b:/g/personal/esther_khumalo_capaciti_org_za/IQC36YoycV4sQ6XRJ8vwYUJwAeCkliha5-M4KoBJM2BMieU?e=WtlhkB"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold tracking-tight">NQF Level 5</h4>
                  <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mt-1">IT System Support</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <ExternalLink size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </motion.a>
            <motion.a 
              href="https://coursera.org/share/14ead30dbfb8be7d5e5572a09793b434"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold tracking-tight">NQF Level 4</h4>
                  <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mt-1">IT Support</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <ExternalLink size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </motion.a>
            <motion.a 
              href="https://coursera.org/share/ea24281896afc4b73a728ce846475b78"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 flex items-center justify-between group hover:bg-white/[0.05] transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold tracking-tight">AI BADGE</h4>
                  <p className="text-slate-500 font-mono text-sm uppercase tracking-widest mt-1">Coursera Certification</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                <ExternalLink size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                number="06"
                title="Connect" 
                subtitle="Let’s build something impactful together."
              />
              
              <p className="text-slate-400 text-lg leading-relaxed mt-8 max-w-md">
                I'm currently looking for new opportunities to collaborate on innovative projects. 
                Whether you have a question or just want to say hi, my inbox is always open.
              </p>

              <div className="flex flex-wrap gap-6 mt-12">
                <a 
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all duration-500 group"
                >
                  <Github size={28} className="group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={LINKEDIN_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-500 group"
                >
                  <Linkedin size={28} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full" />
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-700 resize-none"
                  />
                </div>
                <button className="w-full py-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold tracking-tighter">
              SK<span className="text-blue-500">.</span>
            </p>
            <p className="text-slate-500 text-sm mt-4 font-mono uppercase tracking-widest">© 2026 Sinenhlanhla Khumalo</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-8">
              <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-slate-600 text-xs italic">Built with React, Tailwind & Framer Motion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
