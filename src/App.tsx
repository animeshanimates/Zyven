/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { 
  ChevronRight, 
  Code, 
  Palette, 
  Lightbulb, 
  Star, 
  CheckCircle2, 
  X,
  Menu,
  ArrowUpRight,
  Send,
  Mail,
  User,
  MessageSquare
} from "lucide-react";
import React, { useState, type FC, useEffect, FormEvent, useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Animation Variants ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isOpen]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" }
    );

    const sections = ["about", "services", "portfolio", "process", "pricing", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const menuItems = ["About", "Services", "Portfolio", "Process", "Pricing", "Contact"];

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const targetId = id.toLowerCase();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md border-b border-oat-border/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter text-black select-none cursor-default"
          >
            Zyven
          </motion.div>
          
          <nav className="hidden md:flex gap-8 items-center">
            {menuItems.map((item, i) => (
              <motion.a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "text-warm-charcoal hover:text-black transition-all font-medium text-[15px] hover:-translate-y-0.5 hover:rotate-[-2deg] relative group",
                )}
              >
                <span className={cn(activeSection === item.toLowerCase() && "text-black")}>{item}</span>
                {activeSection === item.toLowerCase() && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, "contact")}
              className="hidden md:flex btn-clay bg-black text-white btn-clay-hover text-[15px] py-2 px-6"
            >
              Start a Project
            </a>
            <motion.button 
              className="md:hidden w-12 h-12 rounded-full bg-white border border-oat-border flex items-center justify-center text-black shadow-clay active:scale-90"
              onClick={() => setIsOpen(true)}
            >
               <Menu size={24} />
            </motion.button>
          </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[100] flex overflow-hidden"
          >
            {/* Solid Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 shadow-2xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Content Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative ml-auto w-[85%] h-full bg-warm-cream flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.2)] overflow-y-auto"
            >
              {/* Internal Header for Overlay */}
              <div className="h-20 flex justify-between items-center px-8 border-b border-oat-border/20">
                <span className="text-2xl font-black">Zyven</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full bg-white border border-black flex items-center justify-center shadow-hard active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              <motion.div 
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="flex flex-col gap-8 p-8 mt-4"
              >
                {menuItems.map((item) => (
                  <motion.a 
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, item)}
                    variants={{
                      open: { opacity: 1, x: 0, rotate: 0 },
                      closed: { opacity: 0, x: 40, rotate: 5 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "text-4xl font-black flex items-center justify-between group relative",
                      activeSection === item.toLowerCase() ? "text-matcha-600" : "text-black"
                    )}
                  >
                    <span className="relative z-10">{item}</span>
                    <motion.div 
                      className="absolute -left-4 bottom-1 h-3 bg-lemon-400/60 -z-10"
                      initial={{ width: 0 }}
                      whileHover={{ width: "110%" }}
                    />
                    <ArrowUpRight className={cn(activeSection === item.toLowerCase() ? "opacity-100" : "opacity-20", "group-hover:opacity-100 transition-opacity")} size={32} />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5 }}
                className="mt-auto p-8 pb-12"
              >
                <div className="p-6 bg-slushie-500 rounded-hero border-2 border-black shadow-hard">
                   <h4 className="font-bold text-white mb-2">Ready to start?</h4>
                   <p className="text-white/85 text-xs mb-4 leading-relaxed font-medium">Let's turn your vision into a digital masterpiece.</p>
                   <motion.button 
                     onClick={(e) => scrollToSection(e as any, "contact")}
                     whileTap={{ scale: 0.95 }}
                     className="w-full btn-clay bg-white text-black py-3 font-bold flex items-center justify-center gap-2 group"
                   >
                     Start the Conversation <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                   </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const About = () => {
  return (
    <section id="about" className="w-full py-24 px-6 bg-white overflow-hidden relative">
      {/* Subtle Background Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-32 h-32 bg-lemon-400/10 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[15%] w-48 h-48 bg-slushie-500/10 rounded-full blur-3xl -z-10"
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <motion.div variants={itemVariants} className="inline-block px-4 py-1 bg-warm-cream rounded-full border border-oat-border mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-warm-charcoal">The Studio</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-black to-warm-charcoal"
          >
            Crafting digital soul in a world of code.
          </motion.h2>
          
          <div className="space-y-6 text-xl text-warm-charcoal leading-relaxed max-w-3xl mx-auto mb-16">
            <motion.p variants={itemVariants}>
              At Zyven, we don't just "deliver projects." We forge digital artifacts. Founded on the belief that software should feel as personal and meticulously crafted as a hand-bound book or a fine-tuned instrument.
            </motion.p>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-24 pt-12 border-t border-oat-border border-dashed w-full"
          >
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-center group cursor-default"
             >
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, type: "spring" }}
                 className="text-5xl md:text-7xl font-bold mb-2 group-hover:text-matcha-600 transition-colors"
               >
                 <AnimatedCounter value={12} suffix="+" />
               </motion.div>
               <div className="text-xs font-black uppercase tracking-widest text-warm-silver group-hover:text-black transition-colors">Artisans on Team</div>
             </motion.div>
             
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="text-center group cursor-default"
             >
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                 className="text-5xl md:text-7xl font-bold mb-2 group-hover:text-slushie-600 transition-colors"
               >
                 <AnimatedCounter value={84} />
               </motion.div>
               <div className="text-xs font-black uppercase tracking-widest text-warm-silver group-hover:text-black transition-colors">Crafted Masterpieces</div>
             </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ rotate: 1, scale: 1.02, y: -5 }}
            className="mt-20 p-8 md:p-12 bg-warm-cream border-2 border-black shadow-hard rounded-card max-w-xl mx-auto transform -rotate-1 cursor-pointer transition-shadow hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group"
          >
            <p className="text-xs font-black uppercase tracking-widest text-warm-silver mb-4 group-hover:text-pomegranate-400 transition-colors">Our Philosophy</p>
            <p className="text-2xl md:text-3xl text-black font-bold italic leading-tight">
              "Efficiency is expected. <span className="text-matcha-600">Craft is felt.</span>"
            </p>
            <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 rounded-full bg-black mx-1" />
              <div className="w-2 h-2 rounded-full bg-black mx-1" />
              <div className="w-2 h-2 rounded-full bg-black mx-1" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = [
    { color: "bg-lemon-400", size: "w-24 h-24 md:w-32 md:h-32", initialPos: { top: "15%", left: "10%" }, speed: 0.02, rotate: 12 },
    { color: "bg-slushie-500", size: "w-16 h-16 md:w-24 md:h-24", initialPos: { bottom: "25%", right: "8%" }, speed: -0.03, rotate: -8 },
    { color: "bg-matcha-300", size: "w-12 h-12 md:w-20 md:h-20", initialPos: { top: "60%", left: "5%" }, speed: 0.04, rotate: 45 },
    { color: "bg-pomegranate-400", size: "w-20 h-20 md:w-28 md:h-28", initialPos: { top: "10%", right: "12%" }, speed: -0.015, rotate: -20 },
  ];

  return (
    <section className="w-full pt-16 md:pt-32 pb-24 md:pb-48 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Interactive Floating Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          animate={{
            x: (mousePos.x - window.innerWidth / 2) * el.speed,
            y: (mousePos.y - window.innerHeight / 2) * el.speed,
            rotate: el.rotate + (mousePos.x * 0.01)
          }}
          className={cn(
            "absolute rounded-2xl shadow-hard border-2 border-black z-0 pointer-events-none hidden md:block",
            el.color,
            el.size
          )}
          style={{ ...el.initialPos }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: [-2, 2, -2],
            y: [0, -5, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="inline-block px-6 py-2 bg-white border-2 border-black shadow-clay rounded-full mb-8 relative z-20 group cursor-default"
        >
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-pomegranate-400 rounded-full"
            />
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-black inline-flex">
              {"Artisanal Digital Studio".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.03, duration: 0.4 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <motion.span 
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 bg-matcha-400 rounded-full"
            />
          </div>
        </motion.div>

        <motion.h1 
          {...fadeInUp}
          className="text-[14vw] sm:text-7xl md:text-[140px] font-black tracking-[-0.06em] leading-[0.85] md:leading-[0.82] mb-10 md:mb-14 overflow-visible py-4"
        >
          FEEL THE<br />
          <span className="text-pomegranate-400">CRAFT</span>
          <span className="text-black italic font-serif font-light text-[0.8em] tracking-tighter"> not </span>
          CODE.
        </motion.h1>

        <motion.p 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="text-xl md:text-3xl text-warm-charcoal max-w-3xl mb-12 md:mb-16 leading-tight tracking-tight font-medium"
        >
          We partner with visionary brands to forge digital artifacts that bridge the gap between human intuition and software logic.
        </motion.p>
        
        <motion.div 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center"
        >
          <motion.a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact');
              if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }} 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="btn-clay bg-black text-white px-8 py-3.5 text-lg w-full sm:w-auto hover:bg-matcha-600 transition-all group flex items-center justify-center gap-2 shadow-clay shadow-black/40 ring-0 hover:ring-2 hover:ring-black/20"
          >
            Start the Conversation 
            <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
          </motion.a>
        </motion.div>

      </div>

      {/* Atmospheric backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[radial-gradient(circle_at_center,rgba(248,204,101,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />
    </section>
  );
};

const Expertise = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const services = [
    {
      title: "UI/UX Design",
      desc: "Interfaces that invite touch. We design user journeys that are logical, beautiful, and deeply human.",
      icon: <Palette size={32} />,
      color: "bg-slushie-500",
      tags: ["Wireframing", "Prototyping"]
    },
    {
      title: "Custom Web Development",
      desc: "Robust architecture built with artisanal care. Performant, scalable, and responsive digital environments.",
      icon: <Code size={32} />,
      color: "bg-lemon-500",
      tags: ["Frontend", "CMS"]
    },
    {
      title: "Brand Strategy",
      desc: "Positioning your identity with intention. We help you find your unique voice in a crowded digital landscape.",
      icon: <Lightbulb size={32} />,
      color: "bg-matcha-300",
      tags: ["Identity", "Positioning"]
    }
  ];

  return (
    <section id="services" className="w-full py-24 md:py-32 px-6 bg-white border-y border-oat-border border-dashed overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-lemon-400/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pomegranate-400/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          {...fadeInUp}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <div className="inline-block px-4 py-1 bg-warm-cream rounded-full border border-oat-border mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-warm-charcoal">Our Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Our Expertise</h2>
          <p className="text-lg md:text-2xl text-warm-charcoal max-w-2xl leading-relaxed mx-auto md:mx-0">Tools of the trade to bring your vision to life, crafted with care and precision in our digital workshop.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {services.map((s, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setHovered(hovered === i ? null : i)}
              className="relative group h-full cursor-pointer"
            >
              <motion.div 
                animate={{ 
                  y: hovered === i ? -12 : 0,
                  rotate: hovered === i ? (i % 2 === 0 ? 1 : -1) : 0,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
                className={cn(
                  "card-clay h-full flex flex-col p-8 md:p-10 border-dashed transition-shadow duration-500",
                  hovered === i ? "shadow-hard border-black bg-warm-cream" : "bg-white"
                )}
              >
                {/* Icon Container with multi-layered animation */}
                <div className="relative mb-8 w-fit">
                  <motion.div 
                    animate={{ 
                      scale: hovered === i ? 1.15 : 1,
                      rotate: hovered === i ? 12 : 0,
                      transition: { duration: 0.5, type: "spring", stiffness: 300 }
                    }}
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-black relative z-10 shadow-clay-sm transition-colors duration-300",
                      s.color
                    )}
                  >
                    <motion.div
                      animate={{ 
                        scale: hovered === i ? [1, 1.2, 1] : 1,
                        transition: { repeat: hovered === i ? Infinity : 0, duration: 2 }
                      }}
                    >
                      {s.icon}
                    </motion.div>
                  </motion.div>
                  {/* Decorative background shape that pops out on hover */}
                  <motion.div 
                    animate={{ 
                      scale: hovered === i ? 1.4 : 0,
                      opacity: hovered === i ? 0.3 : 0,
                      rotate: hovered === i ? -45 : 0
                    }}
                    className={cn("absolute inset-0 rounded-full blur-xl z-0", s.color)}
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-5 tracking-tight group-hover:text-black transition-colors">{s.title}</h3>
                
                <p className="text-warm-charcoal text-base md:text-lg mb-8 flex-grow leading-relaxed">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-oat-border border-dashed">
                  {s.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="px-3 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-warm-charcoal border border-oat-border shadow-clay-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
      num: 1, 
      title: "Discovery", 
      desc: "Mapping out your goals, audience, and technical needs.", 
      detail: "We conduct deep-dive interviews, competitive research, and structural auditing to define the master blueprint of your project.", 
      color: "bg-lemon-400",
      items: ["Brand Audit", "User Stories", "Site Architecture"]
    },
    { 
      num: 2, 
      title: "Crafting", 
      desc: "Our artisans shape the UI and lay code foundations.", 
      detail: "Translating wireframes into high-fidelity tactile interfaces while building a robust, performant foundation in TypeScript.", 
      color: "bg-slushie-500",
      items: ["High-Fidelity UI", "Motion Design", "Frontend Dev"]
    },
    { 
      num: 3, 
      title: "Polish & Launch", 
      desc: "Applying the final coat of micro-interaction varnish.", 
      detail: "Every interaction is tuned, speed is optimized, and we deploy your masterwork across the global edge network.", 
      color: "bg-ube-300",
      items: ["QA Testing", "Performance Tuning", "Go-Live"]
    }
  ];

  return (
    <section id="process" className="w-full py-24 px-6 bg-matcha-600 border-y border-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">The Workshop Process</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">How we turn abstract ideas into tangible, delightful experiences through meticulous craft.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative items-start">
          {/* Animated Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-white/20 border-t-2 border-white/40 border-dashed" />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: activeStep / (steps.length - 1) }}
            className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-lemon-400 shadow-[0_0_15px_rgba(248,204,101,0.5)] origin-left z-20 transition-transform duration-700 ease-out"
          />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              onClick={() => setActiveStep(i)}
              className="relative z-30 flex flex-col items-center text-center group cursor-pointer"
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 20 },
                whileInView: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {/* The Step Circle */}
              <motion.div 
                animate={{ 
                  scale: activeStep === i ? 1.1 : 1,
                  rotate: activeStep === i ? 0 : (i % 2 === 0 ? -5 : 5)
                }}
                className={cn(
                  "w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-6 shadow-hard transition-all duration-500 relative",
                  step.color,
                  activeStep === i ? "ring-8 ring-white/20" : "group-hover:translate-y-[-4px]"
                )}
              >
                <span className="text-4xl font-black">{step.num}</span>
                {activeStep === i && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 rounded-full blur-xl bg-white/30"
                  />
                )}
              </motion.div>

              <div className="space-y-4 max-w-[280px]">
                <h3 className={cn(
                   "text-2xl font-bold transition-all duration-300",
                   activeStep === i ? "text-lemon-400 scale-110" : "text-white"
                )}>{step.title}</h3>
                
                <p className={cn(
                  "text-white/90 leading-relaxed transition-opacity duration-300",
                  activeStep === i ? "opacity-100" : "opacity-60"
                )}>{step.desc}</p>

                {/* Detailed content for active step */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: activeStep === i ? "auto" : 0,
                    opacity: activeStep === i ? 1 : 0
                  }}
                  className="overflow-hidden bg-black/20 rounded-card p-0 border border-transparent"
                >
                  <div className="p-6 text-left space-y-4">
                    <p className="text-white/80 text-sm leading-relaxed border-b border-white/10 pb-4">
                      {step.detail}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-tighter text-black">
                      {step.items.map(item => (
                        <span key={item} className={cn("px-2 py-1 rounded-full", step.color)}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background depth elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-[-5%] w-64 h-64 rounded-full bg-lemon-400/10 blur-[100px] pointer-events-none" />
    </section>
  );
};

const Benefits = () => {
  const [active, setActive] = useState<number | null>(null);

  const benefits = [
    { 
      title: "Artisanal Strategy", 
      desc: "We don't just follow templates. Every strategy is crafted specifically for your unique market position and audience, ensuring a truly bespoke digital experience.",
      detail: "Our strategy sessions involve deep audience mapping and emotional journey planning to ensure your product resonates at a human level.",
      color: "bg-lemon-500/10"
    },
    { 
      title: "Transparent Process", 
      desc: "No black boxes here. We keep you intimately involved at every stage of the workshop, so you can see exactly how the craft comes together block by block.",
      detail: "You get a dedicated project portal with real-time updates, Loom walkthroughs, and collaborative Figma boards for zero-friction feedback loops.",
      color: "bg-slushie-500/10"
    },
    { 
      title: "Scalable Craft", 
      desc: "Artisanal doesn't mean fragile. We build robust, scalable architectures that look beautiful on the surface while handling complex enterprise needs seamlessly.",
      detail: "We use modern, type-safe stacks (React, TypeScript, Next.js) that are optimized for high performance and engineered for long-term maintainability.",
      color: "bg-matcha-300/10"
    },
    { 
      title: "Dedicated Support", 
      desc: "Our relationship extends well beyond launch. We provide ongoing, dedicated care to ensure your digital artifact remains polished, performant, and perfectly tuned.",
      detail: "Post-launch, we offer a 'Craft Care' subscription that includes performance auditing, security updates, and quarterly strategy check-ins.",
      color: "bg-ube-300/10"
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-warm-cream border-y border-oat-border border-dashed overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        <motion.div 
          {...fadeInUp}
          className="lg:sticky lg:top-32 h-fit"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Why choose our craft</h2>
          <p className="text-xl text-warm-charcoal max-w-sm">The advantages of a meticulous, artisanal approach to software.</p>
          <div className="mt-12 hidden lg:flex flex-col gap-4">
            {benefits.map((b, i) => (
              <div 
                key={i}
                className={cn(
                  "h-1 w-full rounded-full bg-oat-border transition-all duration-500",
                  active === i ? "bg-black scale-x-110 origin-left" : "opacity-30"
                )}
              />
            ))}
          </div>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="lg:col-span-2 space-y-8"
        >
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              layout
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
              variants={itemVariants}
              className={cn(
                "card-clay cursor-pointer transition-all duration-500 relative overflow-hidden group",
                active === i ? "shadow-hard -translate-y-2 border-black" : "border-dashed opacity-80"
              )}
            >
              <motion.div 
                layout
                className="pb-6 border-b border-dashed border-oat-border mb-6"
              >
                <h3 className="text-2xl font-bold group-hover:text-matcha-600 transition-colors">{b.title}</h3>
              </motion.div>
              <motion.div layout className="space-y-4">
                <p className="text-lg text-warm-charcoal leading-relaxed">{b.desc}</p>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: active === i ? "auto" : 0,
                    opacity: active === i ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className={cn("p-6 rounded-card border border-dashed border-black mt-4 transition-colors", b.color)}>
                     <p className="text-black font-medium leading-relaxed italic">
                        {b.detail}
                     </p>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative background shape */}
              <motion.div 
                animate={{ 
                  scale: active === i ? 1.5 : 1,
                  opacity: active === i ? 0.05 : 0
                }}
                className={cn("absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-colors", b.color.replace('/10', ''))}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Works = () => (
  <section id="portfolio" className="w-full py-24 px-6 bg-warm-cream overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
          <p className="text-xl text-warm-charcoal">A gallery of digital artifacts crafted for visionary brands.</p>
        </div>
        <button className="btn-clay bg-transparent text-black border-black btn-clay-hover px-6 py-3">
          View All Projects
        </button>
      </motion.div>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={staggerContainer.viewport}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {[
          { 
            title: "Aura Banking", 
            tag: "FinTech", 
            category: "Reimagining personal finance with warmth and tactility.",
            img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
            color: "bg-pomegranate-400" 
          },
          { 
            title: "Lumina Goods", 
            tag: "E-Commerce", 
            category: "A boutique storefront that feels like flipping through a catalog.",
            img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
            color: "bg-ube-300",
            offset: true
          }
        ].map((p, i) => (
          <motion.div 
            key={i}
            variants={{
              initial: { opacity: 0, scale: 0.95, y: 30 },
              whileInView: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className={cn("group cursor-pointer", p.offset && "md:mt-24")}
          >
            <div className="w-full aspect-[4/3] rounded-hero overflow-hidden border border-oat-border shadow-clay mb-6 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-hard group-hover:rotate-[-1deg]">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-[11px] border border-oat-border font-bold text-xs uppercase tracking-widest shadow-sm">
                {p.tag}
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">{p.title}</h3>
            <p className="text-lg text-warm-charcoal">{p.category}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <motion.span 
        {...fadeInUp}
        className="inline-block px-4 py-2 rounded-[11px] bg-ube-300 text-black text-xs font-bold uppercase tracking-widest mb-6 border border-black shadow-clay"
      >
        CLIENT LOVE
      </motion.span>
      <motion.h2 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.1 }}
        className="text-4xl md:text-[44px] font-bold tracking-tight text-center mb-6"
      >
        Kind words from our clients
      </motion.h2>
      <motion.p 
        {...fadeInUp}
        transition={{ ...fadeInUp.transition, delay: 0.2 }}
        className="text-xl text-warm-charcoal text-center max-w-2xl mb-16"
      >
        We believe in craft over code. See how our artisanal approach has transformed B2C software for industry leaders.
      </motion.p>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={staggerContainer.viewport}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          {
            name: "Sarah Jenkins",
            role: "CPO, DataFlow Inc.",
            text: "Zyven completely reimagined our clunky enterprise dashboard. They didn't just redesign it; they brought a tactile, human warmth that our users immediately connected with. Craft over code isn't just a tagline for them.",
            avatar: "https://i.pravatar.cc/150?u=sarah"
          },
          {
            name: "Marcus Chen",
            role: "Founder, Loomis B2B",
            text: "Working with this studio felt like collaborating with a boutique agency rather than a typical dev shop. Their attention to micro-interactions and quirky details made our product a joy to use.",
            avatar: "https://i.pravatar.cc/150?u=marcus",
            featured: true
          },
          {
            name: "Elena Rodriguez",
            role: "VP Engineering, Synthetix",
            text: "The visual identity they crafted for us is unparalleled. It’s expressive, playful, yet completely functional for our enterprise clients. They proved that serious software doesn't have to look boring.",
            avatar: "https://i.pravatar.cc/150?u=elena"
          }
        ].map((t, i) => (
          <motion.div 
            key={i}
            variants={itemVariants}
            className={cn(
              "card-clay flex flex-col justify-between group h-full transition-all",
              t.featured ? "bg-lemon-400 border-black shadow-hard scale-105" : "border-dashed hover:shadow-hard hover:-translate-y-2"
            )}
          >
            <div>
              <div className="flex gap-1 mb-6 text-black">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className={cn("text-lg mb-8", t.featured ? "font-medium" : "text-black")}>
                "{t.text}"
              </p>
            </div>
            <div className={cn("flex items-center gap-4 pt-6 border-t border-dashed", t.featured ? "border-black/20" : "border-oat-border")}>
              <img src={t.avatar} className="w-12 h-12 rounded-full border border-oat-border object-cover" alt={t.name} />
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-sm font-mono opacity-70">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const Pricing = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  const pricingData = [
    {
      title: "The Starter",
      subtitle: "Perfect for establishing a strong digital foundation.",
      price: currency === 'USD' ? "$3,500" : "₹2,90,000",
      features: ["Custom Design (Up to 5 pages)", "Responsive Development", "Basic SEO Setup", "Priority Support"],
      cta: "Get Started",
      variant: "light"
    },
    {
      title: "The Workshop",
      subtitle: "Comprehensive digital experience for growing brands.",
      price: currency === 'USD' ? "$8,000" : "₹6,50,000",
      features: ["Custom Design (Up to 15 pages)", "Complex Interactions", "Advanced SEO & Analytics", "1 Month Priority Support"],
      cta: "Start Workshop",
      featured: true,
      variant: "dark"
    },
    {
      title: "The Masterpiece",
      subtitle: "Full-scale digital platform with limitless potential.",
      price: "Custom",
      features: ["Unlimited Pages", "Custom Web App / CMS", "Brand Strategy Session", "Ongoing Dedicated Support"],
      cta: "Let's Talk",
      variant: "blue"
    }
  ];

  return (
    <section id="pricing" className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Pricing for every craft</h2>
          <p className="text-xl text-warm-charcoal max-w-xl mx-auto mb-10">Straightforward packages tailored to your project's scope.</p>
          
          {/* Currency Toggle */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-oat-light border border-oat-border rounded-full p-1.5 flex items-center shadow-clay-sm">
              <button 
                onClick={() => setCurrency('USD')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                  currency === 'USD' ? "bg-white text-black shadow-clay border border-black/10" : "text-warm-charcoal hover:text-black"
                )}
              >
                USD
              </button>
              <button 
                onClick={() => setCurrency('INR')}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all",
                  currency === 'INR' ? "bg-white text-black shadow-clay border border-black/10" : "text-warm-charcoal hover:text-black"
                )}
              >
                INR
              </button>
            </div>
            <p className="text-[10px] font-bold text-warm-silver uppercase tracking-widest">Select Currency</p>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={staggerContainer.viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {pricingData.map((p, i) => (
            <motion.div 
              key={i}
              variants={{
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={cn(
                "card-clay flex flex-col h-full transition-all relative",
                p.featured ? "border-2 border-black shadow-hard md:-translate-y-4" : "border-dashed border-oat-border hover:shadow-hard hover:-translate-y-2",
                p.variant === "light" && "bg-lemon-400/5",
                p.variant === "blue" && "bg-slushie-500/5"
              )}
            >
              {p.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pomegranate-400 text-white text-xs font-black uppercase px-4 py-1.5 rounded-full border border-black shadow-clay">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-warm-charcoal mb-6">{p.subtitle}</p>
              <div className="h-16 mb-8 relative overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div 
                    key={currency}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-baseline flex-wrap gap-x-2 gap-y-0"
                  >
                    <span className="text-3xl md:text-4xl font-bold whitespace-nowrap">{p.price}</span>
                    {p.price !== "Custom" && <span className="text-warm-charcoal text-sm font-medium">/project</span>}
                  </motion.div>
                </AnimatePresence>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {i === 0 && j === 3 ? <X size={20} className="text-red-400 shrink-0 mt-0.5" /> : <CheckCircle2 size={20} className="text-matcha-600 shrink-0 mt-0.5" />}
                    <span className={cn("text-sm", i === 0 && j === 3 && "opacity-40 text-warm-charcoal")}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={cn(
                "w-full btn-clay btn-clay-hover py-4 text-center block font-bold",
                p.featured ? "bg-black text-white" : "bg-white text-black border-oat-border hover:bg-lemon-400"
              )}>
                {p.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  i: number;
}

const FAQItem: FC<FAQItemProps> = ({ question, answer, i }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ["bg-slushie-500/10", "bg-white/50", "bg-matcha-300/10", "bg-white/50", "bg-lemon-400/10"];
  
  return (
    <motion.div 
      variants={itemVariants}
      className={cn(
        "card-clay p-8 cursor-pointer group hover:-translate-y-1",
        !isOpen && "border-dashed",
        colors[i % colors.length]
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-xl font-bold">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 135 : 0 }} className="text-warm-charcoal">
          <ChevronRight size={24} />
        </motion.div>
      </div>
      <motion.div 
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden mt-4 text-lg text-warm-charcoal leading-relaxed"
      >
        {answer}
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => (
  <section className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed overflow-hidden">
    <div className="max-w-3xl mx-auto">
      <motion.h2 
        {...fadeInUp}
        className="text-4xl md:text-[44px] font-bold tracking-tight text-center mb-16"
      >
        Common questions about our craft
      </motion.h2>
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={staggerContainer.viewport}
        className="space-y-6"
      >
        {[
          { q: "What makes Zyven different from other agencies?", a: "We believe in 'craft, not code.' Our artisanal approach ensures that every digital experience we forge is meticulously designed and thoughtfully constructed, bringing a human touch to the digital world." },
          { q: "How long does a typical project take?", a: "Our workshop process usually takes between 4 to 8 weeks, depending on the complexity of the project. This allows us ample time for discovery, crafting, and polishing." },
          { q: "Do you handle the development as well?", a: "Yes, custom web development is a core part of our craft. We build robust, scalable architectures that bring our designs to life with precision and care." },
          { q: "What industries do you specialize in?", a: "We specialize in partnering with B2B software companies and visionary brands who want to elevate their digital presence and stand out in crowded markets." },
          { q: "How do we get started?", a: "Ready to begin? Just click on 'Start the Conversation' or any of the CTA buttons to schedule a discovery session. We'll explore your vision and map out the craft, block by block." }
        ].map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} i={i} />)}
      </motion.div>
    </div>
  </section>
);

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  if (formState === 'success') {
    return (
      <section id="contact" className="w-full py-24 px-6 bg-warm-cream overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-clay bg-white p-12 flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 bg-lemon-400 rounded-full flex items-center justify-center shadow-clay">
              <CheckCircle2 size={40} className="text-black" />
            </div>
            <h2 className="text-4xl font-bold">Message Sent!</h2>
            <p className="text-xl text-warm-charcoal">
              Thank you for reaching out. Our workshop team will get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setFormState('idle')}
              className="btn-clay bg-black text-white px-8 py-3"
            >
              Send another message
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-md">
              Ready to start your next masterpiece?
            </h2>
            <p className="text-xl text-warm-charcoal mb-12 max-w-sm">
              We're currently accepting new projects. Tell us about your vision, and let's craft something remarkable together.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-lemon-400 rounded-xl flex items-center justify-center shadow-clay">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-warm-silver">Email Us</div>
                  <div className="text-lg font-bold">hello@zyven.studio</div>
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-pomegranate-400/20 rounded-xl flex items-center justify-center shadow-clay">
                  <MessageSquare size={24} className="text-pomegranate-400" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-warm-silver">Office</div>
                  <div className="text-lg font-bold">Berlin, Germany</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="card-clay bg-[#FDFCF0] p-8 md:p-12 relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-warm-charcoal ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-silver" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-white border border-oat-border rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-lemon-400 outline-none transition-all shadow-clay-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-warm-charcoal ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-silver" size={18} />
                  <input 
                    required
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full bg-white border border-oat-border rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-lemon-400 outline-none transition-all shadow-clay-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-warm-charcoal ml-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white border border-oat-border rounded-xl p-4 focus:ring-2 focus:ring-lemon-400 outline-none transition-all shadow-clay-sm resize-none" 
                />
              </div>

              <button 
                type="submit"
                disabled={formState === 'submitting'}
                className={cn(
                  "w-full btn-clay py-5 text-xl font-bold flex items-center justify-center gap-3 transition-all",
                  formState === 'submitting' ? "bg-warm-charcoal cursor-not-allowed" : "bg-black text-white hover:bg-slate-900"
                )}
              >
                {formState === 'submitting' ? "Sending..." : "Forge Message"}
                <Send size={20} className={cn(formState === 'submitting' && "animate-pulse")} />
              </button>
            </form>

            <div className="absolute -top-4 -right-4 w-16 h-16 bg-lemon-400 rounded-full border-2 border-black flex items-center justify-center shadow-hard rotate-12 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-ube-300 rounded-full border-2 border-black flex items-center justify-center shadow-hard -rotate-12 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="w-full py-16 md:py-24 px-6 mb-12 overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto bg-slushie-500 rounded-hero p-1.5 md:p-2 border-2 border-black shadow-hard overflow-hidden"
    >
      <div className="bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-24 flex flex-col items-center text-center">
        <motion.h2 
          {...fadeInUp}
          className="text-3xl md:text-7xl font-bold tracking-tighter mb-8 max-w-3xl"
        >
          Let's craft something remarkable together.
        </motion.h2>
        <motion.div 
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto"
        >
          <a href="#contact" className="btn-clay bg-black text-white px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl flex items-center justify-center gap-2 group">
            Start a Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="w-full bg-white border-t border-oat-border pt-16 md:pt-24 pb-8 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={staggerContainer.viewport}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16"
      >
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-3xl md:text-4xl font-black mb-6 tracking-tighter">Zyven</div>
          <p className="text-warm-charcoal text-lg md:text-xl max-w-sm mb-8 leading-relaxed">
            An artisanal digital studio building high-end interfaces and software with a focus on craft, personality, and human connection.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
            {["Instagram", "X", "LinkedIn"].map(link => (
              <a key={link} href="#" className="text-warm-charcoal hover:text-black font-bold text-sm uppercase tracking-widest underline underline-offset-8 decoration-oat-border hover:decoration-black transition-all">
                {link}
              </a>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-8 opacity-30">Legal</h4>
          <ul className="space-y-4 md:space-y-6">
            {["Privacy Policy", "Terms of Service", "Cookies", "Contact"].map(item => (
              <li key={item}>
                <a 
                  href={item === "Contact" ? "#contact" : "#"} 
                  className="text-warm-charcoal hover:text-black font-semibold text-base md:text-lg transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-10 border-t border-oat-light flex flex-col md:flex-row justify-between items-center gap-6 text-warm-silver text-xs md:text-sm font-medium tracking-wide"
      >
        <p className="order-2 md:order-1">&copy; {new Date().getFullYear()} Zyven Digital Studio. All rights reserved.</p>
        <p className="order-1 md:order-2 px-4 py-1.5 bg-warm-cream rounded-full border border-oat-border/40 text-[10px] md:text-xs uppercase tracking-widest text-warm-charcoal">
          Handcrafted in the workshop
        </p>
      </motion.div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-warm-cream selection:bg-lemon-400 selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Process />
      <Benefits />
      <Works />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
