import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowRight, Zap, Shield, Bot, Code, Terminal, CheckCircle2, Cpu, Quote, Star, Github, Twitter, Linkedin } from 'lucide-react';

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-main selection:text-main-foreground">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b-4 border-border flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-main p-1.5 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)]">
            <Zap size={24} className="text-main-foreground fill-main-foreground" />
          </div>
          <span className="font-heading font-black text-2xl uppercase tracking-tight">AutoExec</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/auth">
            <Button variant="ghost" className="font-bold border-2 border-transparent hidden sm:inline-flex bg-transparent text-foreground hover:bg-main/20 hover:border-border hover:shadow-[2px_2px_0_0_var(--border)]">Log In</Button>
          </Link>
          <Link to="/auth">
            <Button className="font-bold uppercase tracking-wide px-6">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 sm:px-12 lg:px-24 border-b-4 border-border overflow-hidden bg-[radial-gradient(var(--border)_2px,transparent_2px)] [background-size:32px_32px]">
        <div className="w-full max-w-5xl z-10 space-y-8 bg-background p-8 md:p-16 border-4 border-border shadow-[12px_12px_0_0_var(--border)] rounded-base text-center flex flex-col items-center rotate-1 hover:rotate-0 transition-all duration-300">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-[100px] leading-[0.95] uppercase tracking-tighter text-foreground">
              Automate <br/>
              <span className="text-main drop-shadow-[4px_4px_0_var(--border)]">Everything.</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-xl sm:text-2xl max-w-2xl font-bold text-foreground"
          >
            Deploy intelligent agents. Approve workflows. Ship faster with the ultimate Neobrutalist command center.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link to="/auth">
              <Button size="lg" className="h-16 px-8 text-xl font-black uppercase tracking-widest gap-2 bg-main text-main-foreground hover:bg-main/90 border-4 border-border shadow-[6px_6px_0_0_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_var(--border)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all">
                Start Deploying <ArrowRight strokeWidth={3} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-[#00D696] border-b-4 border-border overflow-hidden py-4 flex whitespace-nowrap z-10 relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap font-heading font-black text-3xl uppercase tracking-widest text-[#000]"
        >
          <span className="mx-4">SYSTEM ACTIVE • AGENTS ONLINE • WAITING FOR TASKS • </span>
          <span className="mx-4">SYSTEM ACTIVE • AGENTS ONLINE • WAITING FOR TASKS • </span>
          <span className="mx-4">SYSTEM ACTIVE • AGENTS ONLINE • WAITING FOR TASKS • </span>
          <span className="mx-4">SYSTEM ACTIVE • AGENTS ONLINE • WAITING FOR TASKS • </span>
        </motion.div>
      </div>

      {/* Features */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-secondary-background border-b-4 border-border">
        <h2 className="font-heading font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-20 text-center">
          Why Choose <br className="sm:hidden"/><span className="bg-main px-4 py-2 border-4 border-border shadow-[6px_6px_0_0_var(--border)] inline-block -rotate-2 mt-4 text-main-foreground">AutoExec?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Bot size={48} className="text-black" />}
            title="Intelligent Agents"
            description="Deploy autonomous AI agents to parse your files, run tasks, and automate reviews 24/7."
            color="bg-[#0099FF]"
          />
          <FeatureCard 
            icon={<Shield size={48} className="text-black" />}
            title="Human in the Loop"
            description="Nothing ships without your say-so. Approve or reject AI generated output with a single click."
            color="bg-[#00D696]"
          />
          <FeatureCard 
            icon={<Code size={48} className="text-black" />}
            title="Brutal Performance"
            description="A bold, heavy-hitting UI designed for speed. No spinning loaders—just cold, hard results."
            color="bg-[#FFBF00]"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-[#FFBF00] border-b-4 border-border">
        <h2 className="font-heading font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-20 text-center text-black">
          Automate In <span className="bg-background text-foreground px-4 py-2 border-4 border-border shadow-[6px_6px_0_0_var(--border)] inline-block rotate-2 mt-4 text-center">3 Steps</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <StepCard 
            step="01"
            title="Initialize"
            description="Connect your data sources, upload documents, or tie into external APIs using our unified Neo-Brutal interface."
            icon={<Zap size={32} />}
          />
          <StepCard 
            step="02"
            title="Deploy Agents"
            description="Spin up autonomous workers. They handle parsing, data extraction, and repetitive tasks at machine speed."
            icon={<Cpu size={32} />}
          />
          <StepCard 
            step="03"
            title="Review & Ship"
            description="Agents suggest. You decide. With Human-in-the-Loop, approve or reject with a single click."
            icon={<CheckCircle2 size={32} />}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-border text-background border-b-4 border-border">
        <h2 className="font-heading font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-20 text-center text-background">
          Wall of <span className="bg-[#00D696] text-black px-4 py-2 border-4 border-background shadow-[6px_6px_0_0_var(--background)] inline-block -rotate-1 mt-4">Love</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <TestimonialCard 
            quote="AutoExec completely changed how we handle data processing. What took our team 3 days now takes exactly 14 seconds."
            name="Sarah Jenkins"
            role="CTO, TechFlow"
            avatar="SJ"
            color="bg-main text-main-foreground"
          />
          <TestimonialCard 
            quote="The brutalist UI isn't just for show. It's incredibly fast, zero-fluff, and gets the job done. Simply the best command center out there."
            name="David Chen"
            role="Lead Engineer, StartupX"
            avatar="DC"
            color="bg-[#0099FF] text-black"
          />
          <TestimonialCard 
            quote="I fired half my automated scripts and replaced them with agents here. The human-in-the-loop approval step lets me sleep at night."
            name="Elena Rodriguez"
            role="Operations Manager, DataSync"
            avatar="ER"
            color="bg-[#FFBF00] text-black"
          />
        </div>
      </section>

      {/* Team */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-background border-b-4 border-border">
        <h2 className="font-heading font-black text-5xl sm:text-7xl uppercase tracking-tighter mb-20 text-center text-foreground">
          The <span className="bg-[#0099FF] text-black px-4 py-2 border-4 border-border shadow-[6px_6px_0_0_var(--border)] inline-block rotate-1 mt-4">Builders</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
          <TeamCard 
            name="Alex Johnson"
            role="Founder & CEO"
            image="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
          <TeamCard 
            name="Mia Takahashi"
            role="Head of Agents"
            image="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
          <TeamCard 
            name="Marcus West"
            role="Lead Designer"
            image="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="w-full bg-border text-background py-32 px-6 text-center border-t-4 border-border">
        <h2 className="font-heading font-black text-6xl sm:text-8xl uppercase tracking-tighter text-background mb-12">
          Ready to deploy?
        </h2>
        <Link to="/auth">
          <Button size="lg" className="bg-main text-border hover:bg-main/90 opacity-100 shadow-[8px_8px_0_0_var(--background)] text-2xl py-10 px-16 font-black uppercase tracking-widest hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--background)] border-4 border-background transition-all">
            Initialize System
          </Button>
        </Link>
      </footer>
      
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -12, x: -12, boxShadow: '16px 16px 0px 0px var(--border)' }}
      className={`p-10 border-4 border-border ${color} shadow-[8px_8px_0px_0px_var(--border)] rounded-base flex flex-col gap-6 transition-all duration-300`}
    >
      <div className="p-4 bg-background border-4 border-border shadow-[4px_4px_0_var(--border)] w-fit rounded-base text-foreground">
        {icon}
      </div>
      <h3 className="font-heading font-black text-4xl uppercase tracking-tight text-black">
        {title}
      </h3>
      <p className="font-bold text-xl text-black/80">
        {description}
      </p>
    </motion.div>
  )
}

function StepCard({ step, title, description, icon }: { step: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="relative p-8 pb-12 bg-background border-4 border-border shadow-[8px_8px_0_0_var(--border)] rounded-base hover:-translate-y-2 hover:shadow-[12px_12px_0_0_var(--border)] transition-all">
      <div className="absolute -top-6 -right-6 font-heading font-black text-8xl text-border/10 select-none z-0">
        {step}
      </div>
      <div className="relative z-10 flex flex-col gap-4">
        <div className="w-16 h-16 bg-[#00D696] text-black border-4 border-border shadow-[4px_4px_0_0_var(--border)] flex items-center justify-center rounded-base">
          {icon}
        </div>
        <h3 className="font-heading font-black text-3xl uppercase tracking-tight mt-4 text-foreground">
          {title}
        </h3>
        <p className="font-bold text-lg text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, name, role, avatar, color }: { quote: string, name: string, role: string, avatar: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ rotate: 0, scale: 1.02 }}
      className={`p-8 border-4 border-background ${color} shadow-[8px_8px_0_0_var(--background)] rounded-base flex flex-col justify-between gap-8 odd:-rotate-1 even:rotate-1 transition-all origin-center`}
    >
      <div className="mb-4">
        <Quote fill="currentColor" size={48} className="opacity-20 mb-4" />
        <p className="font-bold text-xl leading-relaxed">
          "{quote}"
        </p>
        <div className="flex gap-1 mt-6">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
        </div>
      </div>
      <div className="flex items-center gap-4 border-t-4 border-currentColor/20 pt-6">
        <div className="w-14 h-14 bg-background border-4 border-background flex items-center justify-center rounded-base font-heading font-black text-xl text-border overflow-hidden">
          {avatar}
        </div>
        <div>
          <h4 className="font-heading font-black text-xl uppercase tracking-tight">{name}</h4>
          <p className="font-bold text-sm opacity-80 uppercase tracking-widest">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

function TeamCard({ name, role, image }: { name: string, role: string, image: string }) {
  return (
    <div className="w-72 bg-secondary-background border-4 border-border shadow-[8px_8px_0_0_var(--border)] rounded-base overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-[12px_12px_0_0_var(--border)] transition-all">
      <div className="h-64 bg-main border-b-4 border-border relative overflow-hidden">
        {/* Grayscale initially, full color on hover */}
        <img src={image} alt={name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300" />
      </div>
      <div className="p-6 bg-background flex flex-col items-center text-center">
        <h4 className="font-heading font-black text-2xl uppercase tracking-tight text-foreground">{name}</h4>
        <p className="font-bold text-main mt-1 uppercase tracking-widest text-sm">{role}</p>
        <div className="flex gap-3 mt-6">
          <button className="w-10 h-10 bg-secondary-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center rounded-base hover:bg-main hover:text-main-foreground hover:-translate-y-1 transition-all"><Twitter size={18} /></button>
          <button className="w-10 h-10 bg-secondary-background border-2 border-border shadow-[2px_2px_0_0_var(--border)] flex items-center justify-center rounded-base hover:bg-main hover:text-main-foreground hover:-translate-y-1 transition-all"><Linkedin size={18} /></button>
        </div>
      </div>
    </div>
  )
}
