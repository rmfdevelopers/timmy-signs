'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Palette, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Users, 
  Map, 
  Smile, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  ImageOff,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-GRID (Customized as Signature Stripe)
// Typography Personality: oversized

const brand = {
  name: "Timmy Signs",
  tagline: "We Create Awesome Signage",
  description: "Leading signage and branding experts delivering high-impact visual identity solutions across Nigeria. From 3D signage to aluboard cladding, we transform physical spaces into brand landmarks.",
  industry: "services",
  region: "nigeria",
  currency: "₦",
  vibe: "energetic"
};

const IMAGES = {
  hero: "https://picsum.photos/seed/timmysignshero/1920/1080",
  products: [
    "https://picsum.photos/seed/services2/800/600",
    "https://picsum.photos/seed/services3/800/600",
    "https://picsum.photos/seed/services4/800/600",
    "https://picsum.photos/seed/services5/800/600"
  ]
};

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/50 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

function SignatureStripe() {
  return <div className="signature-stripe" />;
}

// --- Sections ---

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#features" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Get a Quote", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-secondary/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-xl italic group-hover:rotate-12 transition-transform">
              TS
            </div>
            <span className="font-heading font-black text-2xl tracking-tighter text-white">
              TIMMY<span className="text-primary">SIGNS</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <a key={l.name} href={l.href} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
                {l.name}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-2.5 font-black text-sm uppercase tracking-wider hover:brightness-110 transition-all rounded-sm">
              Get Quote
            </a>
          </div>

          <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[200] transition-transform duration-500 md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-secondary p-8 flex flex-col">
          <button onClick={() => setMobileOpen(false)} className="self-end text-white mb-12">
            <X size={32} />
          </button>
          <div className="space-y-8">
            {links.map(l => (
              <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="block text-3xl font-heading font-black text-white hover:text-primary">
                {l.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Contact us</p>
            <p className="text-white font-bold mb-1">234 906 954 7177</p>
            <p className="text-white/60 text-sm">Akobo, Ibadan | Lagos</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" ref={ref} className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SafeImage src={IMAGES.hero} alt="Timmy Signs Hero" fill className="object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-primary/20" />
      </div>
      
      {/* Signature Diagonal Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 diagonal-split -z-10" />

      <div className={`relative z-10 text-center max-w-6xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1 bg-primary/20 border border-primary/40 rounded-full text-primary font-mono text-[10px] uppercase tracking-[0.4em]">
            RC: 7058695
          </div>
        </div>
        <h1 className="font-heading text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
          Awesome<br /><span className="text-primary">Signage</span>
        </h1>
        <p className="text-white/60 mt-10 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          {brand.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <a href="#contact" className="bg-primary text-white px-12 py-5 font-black text-xl uppercase tracking-wider
            hover:scale-105 hover:shadow-[0_0_40px_rgba(215,38,56,0.4)] transition-all duration-300">
            Get a Quote
          </a>
          <a href="#features" className="border-2 border-white/20 text-white px-12 py-5 font-black text-xl uppercase tracking-wider
            hover:bg-white/10 transition-all duration-300">
            Our Services
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

function Features() {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { title: "Signage & Cladding", desc: "Expert 3D signs and aluboard cladding solutions.", icon: <Box size={32} /> },
    { title: "Creative Branding", desc: "Complete brand identity from design to execution.", icon: <Palette size={32} /> },
    { title: "Nationwide Delivery", desc: "Installing excellence from Ibadan to Lagos.", icon: <Truck size={32} /> },
    { title: "RC Registered", desc: "Fully licensed business operations (RC: 7058695).", icon: <ShieldCheck size={32} /> }
  ];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-secondary relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-primary font-black uppercase tracking-[0.3em] mb-4 text-xs">Our Expertise</p>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">
              WE BRING YOUR BRAND TO <span className="text-primary">LIFE</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-right hidden md:block text-sm">
            Comprehensive branding and signage solutions tailored for maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`p-10 bg-white/5 border border-white/10 hover:border-primary/50 group transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="font-heading text-2xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="gallery" ref={ref} className="py-28 px-6 bg-[#111122]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter">
            Our <span className="text-tertiary">Portfolio</span>
          </h2>
        </div>
        
        <div className={`columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 transition-all duration-1000 ease-out overflow-hidden
          ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
          {IMAGES.products.map((src, i) => (
            <div key={i} className="break-inside-avoid group relative overflow-hidden bg-secondary">
              <SafeImage src={src} alt={`Portfolio ${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-black px-6 py-2 font-black text-xs uppercase tracking-widest">View Project</span>
              </div>
            </div>
          ))}
          {/* Repeat images for density */}
          {IMAGES.products.map((src, i) => (
            <div key={i + 10} className="break-inside-avoid group relative overflow-hidden bg-secondary">
              <SafeImage src={src} alt={`Portfolio extra ${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { number: "500+", label: "Instagram Posts", icon: <Instagram size={24} /> },
    { number: "10k+", label: "Followers", icon: <Users size={24} /> },
    { number: "36", label: "Cities Covered", icon: <Map size={24} /> },
    { number: "2000+", label: "Happy Clients", icon: <Smile size={24} /> }
  ];

  return (
    <section id="about" ref={ref} className="py-28 bg-secondary border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <p className="text-tertiary font-black uppercase tracking-[0.4em] mb-4 text-xs">Who We Are</p>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.9] mb-8">
            CREATIVE <span className="text-accent">EDGE</span><br />PROFESSIONAL EXECUTION
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
            As an RC registered business, Timmy Signs combines deep industry knowledge with a commitment to excellence. We deliver and install nationwide, ensuring your brand stands out in any city from Ibadan to Lagos and beyond.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {stats.map((s, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-accent mb-2">{s.icon}</div>
                <p className="font-heading text-4xl font-black text-white">{s.number}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="aspect-square relative rounded-full overflow-hidden border-8 border-white/5 shadow-2xl">
            <SafeImage src={IMAGES.products[0]} alt="About Timmy Signs" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-2xl flex items-center justify-center p-8 text-center animate-float">
            <p className="font-heading font-black text-white text-xl leading-tight uppercase">Nationwide Delivery & Installation</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { num: "01", title: "Nationwide Delivery", desc: "Seamless logistics and expert installation wherever you are in Nigeria." },
    { num: "02", title: "RC Registered", desc: "A credible, registered entity you can trust with your major brand projects." },
    { num: "03", title: "Signage Experts", desc: "We don't just build signs; we create visual experiences that convert customers." }
  ];

  return (
    <section ref={ref} className="py-28 bg-primary px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#00000010_25%,transparent_25%,transparent_50%,#00000010_50%,#00000010_75%,transparent_75%,transparent)] bg-[size:64px_64px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="font-heading text-5xl md:text-8xl font-black text-black leading-none mb-20 text-center uppercase">
          Why Choose <span className="text-white">Us</span>
        </h2>
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 items-start group
              transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-heading text-8xl font-black text-black/20 group-hover:text-white/40 transition-colors shrink-0 leading-none">
                {step.num}
              </span>
              <div className="pt-6">
                <h3 className="font-heading text-3xl font-black text-white uppercase tracking-tighter mb-4">{step.title}</h3>
                <p className="text-black/70 text-xl font-medium max-w-2xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-accent">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-[10vw] md:text-[7vw] font-black text-black leading-none mb-12 uppercase italic">
            Start Your<br /><span className="text-white">Project</span>
          </h2>
          <div className="space-y-8 border-l-8 border-black/10 pl-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-accent shrink-0 transition-transform group-hover:scale-110">
                <Phone size={24} />
              </div>
              <p className="text-black text-2xl font-black tracking-tight">{brand.region === 'nigeria' ? '+234 906 954 7177' : brand.region}</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} />
              </div>
              <p className="text-black text-lg font-bold leading-tight">Beside General Gas Bridge, Akobo, Ibadan | Lagos, Nigeria</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-accent shrink-0">
                <Instagram size={24} />
              </div>
              <p className="text-black text-lg font-black uppercase">@signage_by_timmysigns</p>
            </div>
          </div>
        </div>

        <div className="w-full relative z-10">
          {sent ? (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-sm shadow-2xl border-4 border-black">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border-2 border-accent relative z-10">
                <CheckCheck size={32} className="text-accent" />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-3 uppercase italic">Message Sent</h3>
              <p className="text-white/60 max-w-sm text-lg">Sharp! We've received your inquiry and our team will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-secondary p-10 rounded-sm border-4 border-black shadow-[20px_20px_0px_rgba(0,0,0,1)]">
              <h3 className="font-heading text-3xl font-black text-white mb-8 uppercase tracking-tighter">Get a Quick Quote</h3>
              <div className="space-y-4">
                {(['name', 'phone'] as const).map(field => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    required
                    className="w-full bg-white/5 border-2 border-white/10 p-4 text-white placeholder-white/30 text-base outline-none focus:border-accent transition-all font-bold"
                  />
                ))}
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your project (3D Sign, Cladding, etc.)"
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border-2 border-white/10 p-4 text-white placeholder-white/30 text-base outline-none resize-none focus:border-accent transition-all font-bold"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full mt-8 bg-accent text-black py-5 font-black text-xl uppercase tracking-widest hover:bg-white transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3">
                {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2">
          <a href="#home" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-2xl italic">TS</div>
            <span className="font-heading font-black text-3xl tracking-tighter text-white">TIMMY<span className="text-primary">SIGNS</span></span>
          </a>
          <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
            {brand.description}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center text-white hover:bg-primary transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-heading font-black text-white text-xl uppercase tracking-tighter mb-8 italic">Quick Links</h4>
          <ul className="space-y-4">
            {["Home", "Services", "Portfolio", "Get a Quote"].map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/50 hover:text-primary transition-colors font-bold uppercase text-sm tracking-widest">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-black text-white text-xl uppercase tracking-tighter mb-8 italic">Locations</h4>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Beside General Gas Bridge,<br />Akobo, Ibadan, Oyo State.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Lagos State,<br />Nigeria.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-bold">
          © {new Date().getFullYear()} {brand.name} — Sharp delivery, nationwide.
        </p>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
          RC Registered Business: 7058695
        </p>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <SignatureStripe />
      <Features />
      <Gallery />
      <SignatureStripe />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}