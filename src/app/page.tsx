"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown,
  Server,
  Cpu,
  Zap,
  Brain,
  Shield,
  Activity,
  Lock,
  Send,
  Terminal,
  Network,
  Code,
  TrendingUp,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { CyberCanvas } from "@/components/panai/cyber-canvas";

/* ─────────────────────────────────────────────────────
   UTILITIES
   ───────────────────────────────────────────────────── */

function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`glitch-text ${className}`} data-text={children}>
      {children}
    </span>
  );
}

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-neon-blue text-[11px] tracking-[0.35em] font-mono uppercase mb-4">
      {`// ${children}`}
    </p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent my-0" />
  );
}

/* ─────────────────────────────────────────────────────
   NAVBAR
   ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  "About",
  "Edge",
  "Technology",
  "Philosophy",
  "Careers",
  "Contact",
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-neon-blue/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-lg tracking-[0.35em] text-white hover:text-neon-blue transition-colors duration-300"
        >
          PANAI<span className="text-neon-blue">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[11px] tracking-[0.2em] text-gray-500 hover:text-neon-blue transition-colors duration-300 uppercase"
            >
              {l}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-neon-blue transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-xl border-t border-neon-blue/[0.06] px-6 pb-6"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="block py-3 text-sm tracking-[0.2em] text-gray-400 hover:text-neon-blue transition-colors uppercase"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CyberCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[1]" />
      <div className="absolute inset-0 scanline-overlay z-[2]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neon-blue/80 text-[11px] tracking-[0.5em] mb-8 font-mono uppercase"
        >
          Proprietary Trading Systems
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tight leading-[0.95] mb-8"
        >
          <GlitchText>EXECUTION IS</GlitchText>
          <br />
          <span className="text-neon-blue text-glow-blue">
            <GlitchText>EVERYTHING.</GlitchText>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-14 font-light tracking-wide"
        >
          AI-driven systems. Millisecond execution. Relentless edge.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#about"
            className="btn-neon-blue px-8 py-4 text-xs tracking-[0.25em] uppercase"
          >
            Enter the Desk
          </a>
          <a
            href="#careers"
            className="btn-neon-magenta px-8 py-4 text-xs tracking-[0.25em] uppercase"
          >
            Join the Elite
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-neon-blue/40" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   WHO WE ARE
   ───────────────────────────────────────────────────── */

const ABOUT_STATEMENTS = [
  { text: "We trade our own capital.", accent: "No clients. No compromises." },
  {
    text: "We build our own machines.",
    accent: "Every system, engineered in-house.",
  },
  {
    text: "We answer to performance.",
    accent: "Results measured in microseconds.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="relative py-32 sm:py-40">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Who We Are</SectionLabel>
          <SectionHeading>
            Built Different<span className="text-neon-blue">.</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-16 space-y-0">
          {ABOUT_STATEMENTS.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="group flex items-start gap-6 py-8 border-b border-white/[0.04] last:border-0 hover:border-neon-blue/10 transition-colors duration-500">
                <span className="text-neon-blue/30 font-mono text-xs mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight text-white group-hover:text-neon-blue transition-colors duration-500">
                    {s.text}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 tracking-wide">
                    {s.accent}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   OUR EDGE
   ───────────────────────────────────────────────────── */

const METRICS = [
  {
    icon: Server,
    label: "Co-located Servers",
    value: 40,
    suffix: "+",
    desc: "Exchange co-location points worldwide",
  },
  {
    icon: Zap,
    label: "Execution Latency",
    prefix: "<",
    value: 1,
    suffix: "ms",
    desc: "Sub-millisecond order execution",
  },
  {
    icon: Brain,
    label: "AI Strategies",
    value: 200,
    suffix: "+",
    desc: "AI-generated trading strategies live",
  },
  {
    icon: Shield,
    label: "Risk Engine Uptime",
    value: 99.99,
    suffix: "%",
    decimals: 2,
    desc: "Real-time risk monitoring always on",
  },
  {
    icon: Activity,
    label: "Model Iterations",
    value: 10000,
    suffix: "+",
    desc: "Continuous model evolution per quarter",
  },
  {
    icon: BarChart3,
    label: "Trades / Day",
    value: 2,
    suffix: "M+",
    desc: "Daily trade volume across all desks",
  },
];

function EdgeSection() {
  return (
    <section id="edge" className="relative py-32 sm:py-40 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Our Edge</SectionLabel>
          <SectionHeading>
            Engineered to Win<span className="text-neon-blue">.</span>
          </SectionHeading>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {METRICS.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="hud-corners group relative bg-cyber-dark/60 backdrop-blur-sm p-7 hover:bg-cyber-dark transition-all duration-500">
                <m.icon className="w-5 h-5 text-neon-blue/50 mb-5 group-hover:text-neon-blue transition-colors duration-500" />
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
                  <AnimatedCounter
                    target={m.value}
                    suffix={m.suffix}
                    prefix={m.prefix || ""}
                    decimals={m.decimals || 0}
                  />
                </p>
                <p className="text-neon-blue/80 text-xs tracking-[0.15em] uppercase font-mono mb-2">
                  {m.label}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   TECHNOLOGY
   ───────────────────────────────────────────────────── */

const TECH_PANELS = [
  {
    icon: Terminal,
    title: "Custom Trading Infrastructure",
    desc: "Purpose-built execution engines designed for zero-compromise performance. Every nanosecond is accounted for.",
    iconColor: "text-neon-blue/70 group-hover:text-neon-blue",
    borderColor: "border-neon-blue/20",
    hoverBorder: "hover:border-neon-blue/20",
  },
  {
    icon: Brain,
    title: "Machine Learning Pipelines",
    desc: "End-to-end ML systems that ingest, process, and deploy models in real-time. Alpha generation at scale.",
    iconColor: "text-neon-magenta/70 group-hover:text-neon-magenta",
    borderColor: "border-neon-magenta/20",
    hoverBorder: "hover:border-neon-magenta/20",
  },
  {
    icon: Network,
    title: "Ultra-Low Latency Networking",
    desc: "Kernel-bypass networking, FPGA acceleration, and microwave links. We compress physics.",
    iconColor: "text-neon-green/70 group-hover:text-neon-green",
    borderColor: "border-neon-green/20",
    hoverBorder: "hover:border-neon-green/20",
  },
  {
    icon: Cpu,
    title: "High-Performance Computing",
    desc: "Bare-metal clusters with custom schedulers. Thousands of cores dedicated to finding edge.",
    iconColor: "text-neon-blue/70 group-hover:text-neon-blue",
    borderColor: "border-neon-blue/20",
    hoverBorder: "hover:border-neon-blue/20",
  },
];

function TechnologySection() {
  return (
    <section id="technology" className="relative py-32 sm:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Technology</SectionLabel>
          <SectionHeading>
            Our Machines<span className="text-neon-magenta">.</span>
          </SectionHeading>
          <p className="text-gray-500 max-w-2xl text-sm tracking-wide leading-relaxed">
            We don&apos;t buy off-the-shelf. Every component of our stack is
            engineered from the ground up for one purpose: absolute speed.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {TECH_PANELS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`group relative p-8 bg-cyber-dark/40 border border-white/[0.03] backdrop-blur-sm 
                  ${t.hoverBorder} hover:bg-cyber-dark/70 transition-all duration-500 animate-float`}
                style={{ animationDelay: `${i * 1.5}s` }}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center border ${t.borderColor} mb-6`}
                >
                  <t.icon
                    className={`w-5 h-5 ${t.iconColor} transition-colors duration-500`}
                  />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-white mb-3">
                  {t.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   PERFORMANCE PHILOSOPHY
   ───────────────────────────────────────────────────── */

const PHILOSOPHIES = [
  { bold: "Discipline", rest: "over emotion." },
  { bold: "Data", rest: "over opinion." },
  { bold: "Speed", rest: "over hesitation." },
];

function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-32 sm:py-40 grid-bg">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Performance Philosophy</SectionLabel>
        </Reveal>

        <div className="mt-8 space-y-12 sm:space-y-16">
          {PHILOSOPHIES.map((p, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="flex items-start gap-6">
                <div className="w-px h-14 sm:h-[4.5rem] bg-gradient-to-b from-neon-blue/40 to-transparent shrink-0 mt-2" />
                <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span className="text-white">{p.bold}</span>{" "}
                  <span className="text-gray-600">{p.rest}</span>
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   CAREERS
   ───────────────────────────────────────────────────── */

const POSITIONS = [
  {
    title: "Quant Engineers",
    icon: TrendingUp,
    desc: "Design and implement quantitative models that drive our trading strategies across global markets.",
  },
  {
    title: "ML Researchers",
    icon: Brain,
    desc: "Push the frontier of applied machine learning in finance. Build models that find alpha where others see noise.",
  },
  {
    title: "Systems Developers",
    icon: Code,
    desc: "Build ultra-low latency infrastructure. C++, FPGA, kernel-bypass networking. Performance is the product.",
  },
  {
    title: "Traders",
    icon: BarChart3,
    desc: "Execute with conviction. Manage risk with discipline. Operate in the fastest markets on the planet.",
  },
];

function CareersSection() {
  return (
    <section id="careers" className="relative py-32 sm:py-40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Careers</SectionLabel>
          <SectionHeading>
            Not For Everyone<span className="text-neon-magenta">.</span>
          </SectionHeading>
          <p className="text-gray-500 max-w-2xl text-sm tracking-wide leading-relaxed">
            We recruit operators, not employees. If you thrive under pressure and
            measure yourself against the best, we want to talk.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {POSITIONS.map((pos, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="hud-corners group relative bg-cyber-dark/40 p-8 hover:bg-cyber-dark/70 transition-all duration-500">
                <div className="flex items-center gap-4 mb-5">
                  <pos.icon className="w-5 h-5 text-neon-magenta/60 group-hover:text-neon-magenta transition-colors duration-500" />
                  <h3 className="font-display text-base font-semibold tracking-tight text-white">
                    {pos.title}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {pos.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-neon-magenta/70 hover:text-neon-magenta text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                >
                  Apply
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   CONTACT
   ───────────────────────────────────────────────────── */

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Transmission failed.");
      }

      setStatus("sent");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Transmission failed."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 sm:py-40 grid-bg">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading>
            Secure Channel<span className="text-neon-green">.</span>
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 relative">
            <div className="flex items-center gap-2 mb-8">
              <Lock className="w-3.5 h-3.5 text-neon-green/60" />
              <span className="text-neon-green/60 text-[10px] tracking-[0.3em] font-mono uppercase">
                Encrypted Transmission
              </span>
            </div>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-12 h-12 mx-auto mb-6 border border-neon-green/30 flex items-center justify-center">
                  <Send className="w-5 h-5 text-neon-green" />
                </div>
                <p className="font-display text-xl text-white mb-2">
                  Transmission Received
                </p>
                <p className="text-gray-500 text-sm">
                  We will respond through a secure channel.
                </p>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-600 font-mono uppercase mb-2">
                      Identifier
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name"
                      className="cyber-input w-full px-4 py-3.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-gray-600 font-mono uppercase mb-2">
                      Comm Channel
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="email@domain.com"
                      className="cyber-input w-full px-4 py-3.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-gray-600 font-mono uppercase mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    className="cyber-input w-full px-4 py-3.5 text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select purpose...</option>
                    <option value="careers">Career Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-gray-600 font-mono uppercase mb-2">
                    Message Payload
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Enter your message..."
                    className="cyber-input w-full px-4 py-3.5 text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs font-mono tracking-wide">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-neon-green w-full sm:w-auto px-10 py-4 text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  {status === "sending" ? "Transmitting..." : "Transmit"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.03] py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <a
          href="#"
          className="font-display text-sm tracking-[0.35em] text-gray-600 hover:text-neon-blue transition-colors duration-300"
        >
          PANAI<span className="text-neon-blue/50">.</span>
        </a>

        <p className="text-gray-700 text-[10px] tracking-[0.15em] font-mono">
          &copy; {new Date().getFullYear()} PANAI CAPITAL. ALL SYSTEMS
          OPERATIONAL.
        </p>

        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Security"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-gray-700 hover:text-gray-400 text-[10px] tracking-[0.15em] font-mono uppercase transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <EdgeSection />
      <Divider />
      <TechnologySection />
      <Divider />
      <PhilosophySection />
      <Divider />
      <CareersSection />
      <Divider />
      <ContactSection />
      <Footer />
    </div>
  );
}
