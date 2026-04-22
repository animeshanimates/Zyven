/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ChevronRight, 
  Code, 
  Palette, 
  Lightbulb, 
  Star, 
  CheckCircle2, 
  X,
  Menu,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => (
  <header className="sticky top-0 w-full z-50 bg-[#FDFCF0]/80 backdrop-blur-md border-b border-oat-border/60">
    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
      <div className="text-2xl font-black tracking-tighter text-black select-none cursor-default">Zyven</div>
      <nav className="hidden md:flex gap-8 items-center">
        {["Services", "Work", "Process", "About"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-warm-charcoal hover:text-black transition-all font-medium text-[15px] hover:-translate-y-0.5 hover:rotate-[-2deg]"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button className="hidden md:flex btn-clay bg-black text-white btn-clay-hover text-[15px] py-2 px-6">
          Start a Project
        </button>
        <button className="md:hidden p-2 text-black">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="w-full pt-24 pb-32 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-[clamp(48px,8vw,80px)] font-bold tracking-[-0.04em] leading-[1.05] max-w-4xl mb-8"
    >
      We build websites that feel like craft, not code.
    </motion.h1>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-xl md:text-2xl text-warm-charcoal max-w-2xl mb-12"
    >
      Digital experiences forged with human hands. We blend meticulous strategy with joyful, artisanal design to elevate B2C software into tactile masterpieces.
    </motion.p>
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <button className="btn-clay bg-pomegranate-400 text-white btn-clay-hover px-8 py-4 text-lg">
        Explore Our Craft
      </button>
      <button className="btn-clay bg-white text-black border-oat-border btn-clay-hover px-8 py-4 text-lg">
        View Pricing
      </button>
    </motion.div>
  </section>
);

const Expertise = () => {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Interfaces that invite touch. We design user journeys that are logical, beautiful, and deeply human.",
      icon: <Palette className="text-black" size={32} />,
      color: "bg-slushie-500",
      tags: ["Wireframing", "Prototyping"]
    },
    {
      title: "Custom Web Development",
      desc: "Robust architecture built with artisanal care. Performant, scalable, and responsive digital environments.",
      icon: <Code className="text-black" size={32} />,
      color: "bg-lemon-500",
      tags: ["Frontend", "CMS"]
    },
    {
      title: "Brand Strategy",
      desc: "Positioning your identity with intention. We help you find your unique voice in a crowded digital landscape.",
      icon: <Lightbulb className="text-black" size={32} />,
      color: "bg-matcha-300",
      tags: ["Identity", "Positioning"]
    }
  ];

  return (
    <section id="services" className="w-full py-24 px-6 bg-white border-y border-oat-border border-dashed">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Expertise</h2>
          <p className="text-xl text-warm-charcoal max-w-xl">Tools of the trade to bring your vision to life, crafted with care and precision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-clay card-clay-hover border-dashed flex flex-col"
            >
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-black", s.color)}>
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-warm-charcoal mb-6 flex-grow">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-oat-light rounded-[11px] text-xs font-semibold uppercase tracking-wider text-warm-charcoal border border-oat-border border-dashed">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: 1, title: "Discovery", desc: "We sit down, unroll the parchment, and map out your goals, audience, and technical requirements.", color: "bg-lemon-400" },
    { num: 2, title: "Crafting", desc: "Our artisans shape the UI, refine the interactions, and lay the robust code foundations.", color: "bg-slushie-500" },
    { num: 3, title: "Polish & Launch", desc: "Applying the final coat of varnish—testing, refining micro-interactions, and deploying securely.", color: "bg-ube-300" }
  ];

  return (
    <section id="process" className="w-full py-24 px-6 bg-matcha-600 border-y border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">The Workshop Process</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">How we turn abstract ideas into tangible, delightful experiences.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-white/30 border-dashed" />
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={cn("w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-6 shadow-hard transition-transform hover:rotate-12", step.color)}>
                <span className="text-4xl font-bold">{step.num}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-white/90 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    { title: "Artisanal Strategy", desc: "We don't just follow templates. Every strategy is crafted specifically for your unique market position and audience, ensuring a truly bespoke digital experience." },
    { title: "Transparent Process", desc: "No black boxes here. We keep you intimately involved at every stage of the workshop, so you can see exactly how the craft comes together block by block." },
    { title: "Scalable Craft", desc: "Artisanal doesn't mean fragile. We build robust, scalable architectures that look beautiful on the surface while handling complex enterprise needs seamlessly." },
    { title: "Dedicated Support", desc: "Our relationship extends well beyond launch. We provide ongoing, dedicated care to ensure your digital artifact remains polished, performant, and perfectly tuned." }
  ];

  return (
    <section className="w-full py-24 px-6 bg-warm-cream border-y border-oat-border border-dashed">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:sticky lg:top-32 h-fit">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Why choose our craft</h2>
          <p className="text-xl text-warm-charcoal max-w-sm">The advantages of a meticulous, artisanal approach to software.</p>
        </div>
        <div className="lg:col-span-2 space-y-12">
          {benefits.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-clay card-clay-hover sticky top-40 lg:top-auto group cursor-pointer"
            >
              <div className="pb-6 border-b border-dashed border-oat-border mb-6">
                <h3 className="text-2xl font-bold group-hover:text-matcha-600 transition-colors">{b.title}</h3>
              </div>
              <p className="text-lg text-warm-charcoal">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Works = () => (
  <section id="work" className="w-full py-24 px-6 bg-warm-cream">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
          <p className="text-xl text-warm-charcoal">A gallery of digital artifacts crafted for visionary brands.</p>
        </div>
        <button className="btn-clay bg-transparent text-black border-black btn-clay-hover px-6 py-3">
          View Archive
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
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
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <span className="inline-block px-4 py-2 rounded-[11px] bg-ube-300 text-black text-xs font-bold uppercase tracking-widest mb-6 border border-black shadow-clay">CLIENT LOVE</span>
      <h2 className="text-4xl md:text-[44px] font-bold tracking-tight text-center mb-6">Kind words from our clients</h2>
      <p className="text-xl text-warm-charcoal text-center max-w-2xl mb-16">
        We believe in craft over code. See how our artisanal approach has transformed B2C software for industry leaders.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={cn(
              "card-clay flex flex-col justify-between group h-full",
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
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Pricing for every craft</h2>
        <p className="text-xl text-warm-charcoal max-w-xl mx-auto">Straightforward packages tailored to your project's scope.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {[
          {
            title: "The Starter",
            subtitle: "Perfect for establishing a strong digital foundation.",
            price: "$3,500",
            features: ["Custom Design (Up to 5 pages)", "Responsive Development", "Basic SEO Setup", "Priority Support"],
            cta: "Get Started",
            variant: "light"
          },
          {
            title: "The Workshop",
            subtitle: "Comprehensive digital experience for growing brands.",
            price: "$8,000",
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
        ].map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            <div className="mb-8">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className="text-warm-charcoal text-sm"> /project</span>
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
              "w-full btn-clay btn-clay-hover py-4 text-center block",
              p.featured ? "bg-black text-white" : "bg-white text-black border-oat-border hover:bg-lemon-400"
            )}>
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer, i }: { question: string, answer: string, i: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ["bg-slushie-500/10", "bg-white/50", "bg-matcha-300/10", "bg-white/50", "bg-lemon-400/10"];
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
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
  <section className="w-full py-24 px-6 bg-warm-cream border-t border-oat-border border-dashed">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-[44px] font-bold tracking-tight text-center mb-16">Common questions about our craft</h2>
      <div className="space-y-6">
        {[
          { q: "What makes Zyven different from other agencies?", a: "We believe in 'craft, not code.' Our artisanal approach ensures that every digital experience we forge is meticulously designed and thoughtfully constructed, bringing a human touch to the digital world." },
          { q: "How long does a typical project take?", a: "Our workshop process usually takes between 4 to 8 weeks, depending on the complexity of the project. This allows us ample time for discovery, crafting, and polishing." },
          { q: "Do you handle the development as well?", a: "Yes, custom web development is a core part of our craft. We build robust, scalable architectures that bring our designs to life with precision and care." },
          { q: "What industries do you specialize in?", a: "We specialize in partnering with B2B software companies and visionary brands who want to elevate their digital presence and stand out in crowded markets." },
          { q: "How do we get started?", a: "Ready to begin? Just click on 'Start a Project' or the 'Start the Conversation' button below, and we'll schedule a discovery call to discuss your vision." }
        ].map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} i={i} />)}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="w-full py-24 px-6 mb-12">
    <div className="max-w-6xl mx-auto bg-slushie-500 rounded-hero p-2 border-2 border-black shadow-hard overflow-hidden">
      <div className="bg-white rounded-[32px] p-12 md:p-24 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 max-w-3xl">Let's craft something remarkable together.</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <button className="btn-clay bg-black text-white px-10 py-5 text-xl flex items-center gap-2 group">
            Start a Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <button className="btn-clay bg-white text-black border-oat-border px-10 py-5 text-xl hover:bg-lemon-400">
            View Case Studies
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full bg-white border-t border-oat-border pt-16 pb-8 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl font-black mb-6">Zyven</div>
          <p className="text-warm-charcoal text-lg max-w-sm mb-6">
            An artisanal digital studio building high-end interfaces and software with a focus on craft, personality, and human connection.
          </p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "Dribbble", "Instagram"].map(link => (
              <a key={link} href="#" className="text-warm-charcoal hover:text-black font-semibold text-sm underline underline-offset-4 decoration-oat-border hover:decoration-black transition-all">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs mb-6 opacity-30">Links</h4>
          <ul className="space-y-4">
            {["Work", "Services", "Process", "Pricing", "Careers"].map(item => (
              <li key={item}><a href="#" className="text-warm-charcoal hover:text-black font-medium">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs mb-6 opacity-30">Legal</h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookies", "Contact"].map(item => (
              <li key={item}><a href="#" className="text-warm-charcoal hover:text-black font-medium">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-oat-light flex flex-col md:flex-row justify-between items-center gap-4 text-warm-silver text-sm">
        <p>&copy; 2024 Zyven Digital Studio. All rights reserved.</p>
        <p>Handcrafted in the workshop.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-warm-cream selection:bg-lemon-400 selection:text-black">
      <Navbar />
      <Hero />
      <Expertise />
      <Process />
      <Benefits />
      <Works />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
