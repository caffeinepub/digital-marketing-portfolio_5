import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  LineChart,
  Link,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  PenTool,
  Phone,
  Rocket,
  Shirt,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  type Variants,
  motion,
  useInView,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";
import AdminPage from "./AdminPage";
import { useActor } from "./hooks/useActor";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Experience", href: "#experience" },
  { label: "Results", href: "#case-studies" },
  { label: "2026 Trends", href: "#trends" },
  { label: "Contact", href: "#contact" },
];

// ──────────────────────────────────────────────
// Animation Variants
// ──────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ──────────────────────────────────────────────
// Counter component
// ──────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = duration / target;
    const timer = setInterval(
      () => {
        start += 1;
        setCount(start);
        if (start >= target) {
          clearInterval(timer);
          setCount(target);
        }
      },
      Math.max(step, 16),
    );
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ──────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-sm bg-violet flex items-center justify-center glow-violet-sm">
              <Zap size={16} className="text-background" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              Ankit <span className="text-violet">Sharma</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                onClick={() => handleNavClick(item.href)}
                data-ocid="nav.link"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-violet transition-colors rounded-md hover:bg-surface-2"
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="ml-2"
            >
              <Button
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="bg-violet text-background hover:bg-violet/90 font-semibold glow-violet-sm"
              >
                Hire Me
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  data-ocid="nav.link"
                  className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-violet transition-colors rounded-md hover:bg-surface-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                onClick={() => handleNavClick("#contact")}
                className="mt-2 bg-violet text-background hover:bg-violet/90 font-semibold"
              >
                Hire Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ──────────────────────────────────────────────
// Hero Section
// ──────────────────────────────────────────────
function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />

      {/* Decorative orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.25 290), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-15 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.2 230), transparent 70%)",
          animationDelay: "1s",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={fadeIn} className="mb-6">
            <Badge className="bg-violet/10 text-violet border-violet/30 px-4 py-1.5 text-sm font-medium">
              <Star size={12} className="mr-2 inline" />
              Digital Marketing Specialist · 4+ Years Experience
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeIn} className="mb-6">
            {/* Overline — metric anchor that commands attention first */}
            <div className="flex items-baseline gap-3 mb-3">
              <span className="stat-number text-7xl sm:text-8xl lg:text-9xl">
                4+
              </span>
              <span className="text-foreground/80 text-xl sm:text-2xl font-body font-medium leading-tight">
                years turning
                <br />
                ad budgets into
                <br />
                <span className="text-foreground font-semibold">
                  measurable growth
                </span>
              </span>
            </div>
            <h1 className="hero-display text-4xl sm:text-5xl lg:text-6xl text-foreground/90">
              Meta · Google · Social · Analytics
            </h1>
          </motion.div>

          {/* Subtitle — visible with foreground/85 */}
          <motion.p
            variants={fadeIn}
            className="text-base sm:text-lg text-foreground/85 mb-10 max-w-xl leading-relaxed"
          >
            Digital marketing specialist across Real Estate, Automobile,
            Education, Fashion & IT — building campaigns that convert, retain,
            and scale.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-16">
            <Button
              size="lg"
              onClick={() => handleScroll("#case-studies")}
              data-ocid="hero.primary_button"
              className="cta-primary bg-violet text-background hover:bg-violet/90 font-bold text-base px-8 rounded-full glow-violet"
              style={{ height: "52px" }}
            >
              View Campaign Results
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScroll("#contact")}
              data-ocid="hero.secondary_button"
              className="font-semibold text-base px-8 rounded-full border-2 border-foreground/20 text-foreground/80 hover:border-violet/50 hover:text-violet hover:bg-violet/5 transition-all"
              style={{ height: "52px" }}
            >
              Let's Talk
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border"
          >
            {[
              { value: 4, suffix: "+", label: "Years Experience" },
              { value: 50, suffix: "+", label: "Campaigns Managed" },
              { value: 5, suffix: "", label: "Industries" },
              { value: 10, suffix: "x", label: "Avg ROAS" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                className="text-center sm:text-left"
              >
                <div className="stat-number text-3xl sm:text-4xl mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Section Divider
// ──────────────────────────────────────────────
function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="section-divider max-w-7xl mx-auto px-8 py-0">
      {label && (
        <span className="text-[10px] uppercase tracking-[0.2em] text-violet/50 font-semibold px-4 py-1 rounded-full border border-violet/15 bg-violet/5 whitespace-nowrap select-none">
          {label}
        </span>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Section Wrapper
// ──────────────────────────────────────────────
function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`py-20 lg:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center mb-16">
      {eyebrow && (
        <div className="text-violet text-sm font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="section-heading text-4xl sm:text-5xl mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// About Section
// ──────────────────────────────────────────────
function AboutSection() {
  const highlights = [
    {
      icon: <Target size={16} />,
      text: "Meta & Google Ads Certified Specialist",
    },
    {
      icon: <BarChart3 size={16} />,
      text: "Analytics & Performance Reporting Expert",
    },
    {
      icon: <Users size={16} />,
      text: "Personal Branding & Client Account Manager",
    },
    {
      icon: <Globe size={16} />,
      text: "Website Optimization & SEO Practitioner",
    },
    {
      icon: <PenTool size={16} />,
      text: "Content Strategy & Creation Specialist",
    },
    {
      icon: <TrendingUp size={16} />,
      text: "Campaign ROAS Optimizer Across 5 Industries",
    },
  ];

  return (
    <Section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Avatar / Visual */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl glow-violet opacity-40 scale-105" />
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-2xl bg-surface-2 border border-violet/20 flex items-center justify-center overflow-hidden">
              {/* Abstract background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, oklch(0.68 0.25 290), transparent 50%), radial-gradient(circle at 70% 30%, oklch(0.72 0.2 230), transparent 50%)",
                }}
              />
              {/* Initials avatar */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-full bg-violet/20 border-2 border-violet/40 flex items-center justify-center glow-violet">
                  <span className="font-heading font-black text-4xl text-violet">
                    AS
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-xl">
                    Ankit Sharma
                  </div>
                  <div className="text-violet text-sm font-medium mt-1">
                    Digital Marketing Specialist
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    4+ Years · Multi-Industry Expert
                  </div>
                </div>
                {/* Mini skill pills */}
                <div className="flex flex-wrap justify-center gap-2 px-4">
                  {["Meta Ads", "Google Ads", "Analytics"].map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded-full bg-violet/10 text-violet border border-violet/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-4 -right-4 bg-surface-1 border border-neon/30 rounded-xl px-4 py-2 glow-amber"
            >
              <div className="text-amber-accent font-heading font-bold text-lg">
                200%
              </div>
              <div className="text-xs text-muted-foreground">
                Real Estate ROAS
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.div variants={fadeUp}>
            <div className="text-violet text-sm font-semibold uppercase tracking-widest mb-3">
              About Me
            </div>
            <h2 className="section-heading text-4xl sm:text-5xl mb-6">
              The Marketer Behind{" "}
              <span className="text-gradient-violet">Real Results</span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="space-y-4 text-foreground/75 leading-relaxed mb-8"
          >
            <p>
              I'm a results-driven digital marketing specialist with 4+ years of
              experience across Real Estate, IT, Automobile, Education, and
              Fashion — currently focused on high-ticket Real Estate lead
              generation using Meta & Google Ads.
            </p>
            <p>
              Previously, I led personal branding and managed multi-client ad
              accounts at an IT company. Before that, I ran lead generation
              campaigns for automobile showrooms and education institutes, and
              started my career managing paid & organic campaigns for a D2C
              fashion brand.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-3"
          >
            {highlights.map((h) => (
              <motion.div
                key={h.text}
                variants={fadeIn}
                className="flex items-center gap-3 p-3 rounded-lg card-surface group cursor-default"
              >
                <div className="w-7 h-7 rounded-md icon-container-violet flex items-center justify-center flex-shrink-0 text-sm">
                  {h.icon}
                </div>
                <span className="text-sm text-foreground/80 font-medium">
                  {h.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Services Section
// ──────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Megaphone size={24} />,
    title: "Meta Ads Management",
    desc: "Facebook & Instagram campaigns with precise audience targeting, creative A/B testing, and ROAS optimization.",
    tag: "Paid Social",
  },
  {
    icon: <Target size={24} />,
    title: "Google Ads",
    desc: "Search, Display, Shopping, and Performance Max campaigns engineered for maximum qualified traffic.",
    tag: "Paid Search",
  },
  {
    icon: <Users size={24} />,
    title: "Social Media Management",
    desc: "End-to-end community management, content calendars, engagement strategies, and growth hacking.",
    tag: "Organic",
  },
  {
    icon: <Globe size={24} />,
    title: "Website Optimization & SEO",
    desc: "Landing page CRO, technical SEO audits, keyword strategy, and site performance improvements.",
    tag: "SEO & CRO",
  },
  {
    icon: <PenTool size={24} />,
    title: "Content Creation & Strategy",
    desc: "Ad copy, video scripts, Reels hooks, carousels, blog content, and brand storytelling.",
    tag: "Content",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Analytics & Reporting",
    desc: "Custom dashboards, attribution modeling, campaign performance reports, and actionable insights.",
    tag: "Data",
  },
  {
    icon: <Award size={24} />,
    title: "Personal Branding",
    desc: "LinkedIn authority building, thought leadership content, brand voice development, and reputation management.",
    tag: "Branding",
  },
  {
    icon: <Briefcase size={24} />,
    title: "Client Account Management",
    desc: "Full-service account oversight, campaign strategy, client communication, and performance optimization.",
    tag: "Management",
  },
];

function ServicesSection() {
  return (
    <Section id="services" className="bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What I Do"
          title="Services & Skills"
          subtitle="A complete digital marketing toolkit to grow your brand, acquire customers, and scale revenue."
        />
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeIn}
              data-ocid={`services.item.${i + 1}`}
              className="card-surface rounded-xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl icon-container-violet flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-violet/60 mb-2">
                {service.tag}
              </div>
              <h3 className="font-heading font-bold text-base mb-2 text-foreground leading-snug">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Industries Section
// ──────────────────────────────────────────────
const INDUSTRIES = [
  {
    icon: <Building2 size={28} />,
    name: "Real Estate",
    desc: "Lead gen campaigns for residential & commercial properties",
    color: "violet",
    stat: "200% ROAS",
  },
  {
    icon: <Car size={28} />,
    name: "Automobile",
    desc: "Test drive bookings, showroom visits & model launches",
    color: "neon",
    stat: "18% CTR",
  },
  {
    icon: <GraduationCap size={28} />,
    name: "Education",
    desc: "Student enrollment funnels for institutes & edtech",
    color: "violet",
    stat: "5x Conversions",
  },
  {
    icon: <Shirt size={28} />,
    name: "Fashion",
    desc: "Brand awareness, D2C sales & Instagram Reels strategy",
    color: "neon",
    stat: "280K Reach",
  },
  {
    icon: <Cpu size={28} />,
    name: "IT & Technology",
    desc: "B2B lead gen, SaaS growth & personal branding for IT firms",
    color: "violet",
    stat: "Client Growth",
  },
];

function IndustriesSection() {
  return (
    <Section id="industries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Domain Expertise"
        title="Industries I've Worked In"
        subtitle="Deep domain knowledge across 5 industries — enabling precision targeting and authentic messaging."
      />
      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
      >
        {INDUSTRIES.map((industry, i) => (
          <motion.div
            key={industry.name}
            variants={fadeIn}
            data-ocid={`industries.item.${i + 1}`}
            className={`card-surface rounded-2xl p-6 text-center group ${
              industry.color === "neon" ? "card-surface-neon" : ""
            }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                industry.color === "violet"
                  ? "icon-container-violet"
                  : "icon-container-amber"
              }`}
            >
              {industry.icon}
            </div>
            <h3 className="font-heading font-bold text-base mb-2">
              {industry.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {industry.desc}
            </p>
            <div
              className={`text-xs font-bold px-3 py-1 rounded-full inline-block border ${
                industry.color === "violet"
                  ? "bg-violet/10 border-violet/20 text-violet"
                  : "bg-neon/10 border-neon/20 text-amber-accent"
              }`}
            >
              {industry.stat}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Experience Section
// ──────────────────────────────────────────────
const EXPERIENCE = [
  {
    role: "Digital Marketing Specialist",
    company: "Real Estate",
    period: "2024 – Present",
    current: true,
    bullets: [
      "Running Meta & Google Ads campaigns for high-ticket property leads",
      "Achieved 200% ROAS on paid campaigns",
      "Managing full-funnel strategy from awareness to conversion",
    ],
  },
  {
    role: "Digital Marketing Specialist",
    company: "IT Company",
    period: "2023 – 2024",
    current: false,
    bullets: [
      "Handled personal branding for company leadership and clients",
      "Managed multi-client ad accounts on Meta & Google",
      "Delivered performance reports and campaign optimizations",
    ],
  },
  {
    role: "Digital Marketer",
    company: "Automobile & Education",
    period: "2022 – 2023",
    current: false,
    bullets: [
      "Ran lead generation campaigns for automobile showrooms and education institutes",
      "Managed Google Search and Meta Lead Ads",
      "Optimized landing pages and reduced cost per lead",
    ],
  },
  {
    role: "Social Media & Ads Executive",
    company: "Fashion Brand",
    period: "2021 – 2022",
    current: false,
    bullets: [
      "Managed Instagram and Meta Ads for a D2C fashion brand",
      "Built Reels-first content strategy for organic growth",
      "Ran paid campaigns for brand awareness and sales",
    ],
  },
];

function ExperienceSection() {
  return (
    <Section id="experience" className="bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Career Journey"
          title="Experience"
          subtitle="4+ years of hands-on experience building brand visibility and driving measurable ROI."
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet/50 via-violet/20 to-transparent hidden sm:block" />

          <motion.div variants={staggerContainer} className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={fadeIn}
                data-ocid={`experience.item.${i + 1}`}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-3 top-6 w-6 h-6 rounded-full border-2 hidden sm:flex items-center justify-center ${
                    exp.current
                      ? "border-violet bg-violet/20 glow-violet-sm"
                      : "border-border bg-surface-2"
                  }`}
                >
                  {exp.current && (
                    <div className="w-2 h-2 rounded-full bg-violet animate-pulse" />
                  )}
                </div>

                <div className="card-surface rounded-xl p-6 hover:border-violet/30 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-bold text-lg">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <Badge className="bg-violet/10 text-violet border-violet/30 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-violet text-sm font-semibold bg-violet/10 px-3 py-1 rounded-full border border-violet/20">
                      {exp.period}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-foreground/75"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-violet mt-1.5 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Case Studies Section
// ──────────────────────────────────────────────
const CASE_STUDIES = [
  {
    industry: "Real Estate",
    icon: <Building2 size={20} />,
    headline: "200% ROAS",
    sub: "2,400 qualified leads in 90 days",
    desc: "Built a full-funnel Meta Ads campaign targeting high-intent property buyers using custom audiences, lookalikes, and dynamic retargeting — achieving a 200% return on ad spend.",
    tags: ["Meta Ads", "Lead Gen", "Retargeting"],
    color: "violet",
  },
  {
    industry: "Automobile",
    icon: <Car size={20} />,
    headline: "18% CTR",
    sub: "45% reduction in Cost Per Lead",
    desc: "Restructured Google Search campaigns with exact-match keywords, responsive ads, and a dedicated landing page strategy that cut CPL by nearly half.",
    tags: ["Google Ads", "Search", "CRO"],
    color: "neon",
  },
  {
    industry: "Education",
    icon: <GraduationCap size={20} />,
    headline: "5x Enrollments",
    sub: "via Meta Lead Ads campaign",
    desc: "Designed a targeted Lead Ads funnel for an education institute, combining compelling offer creative with form optimization to drive qualified student inquiries.",
    tags: ["Meta Lead Ads", "Education", "Funnel"],
    color: "violet",
  },
  {
    industry: "Fashion",
    icon: <Shirt size={20} />,
    headline: "280K Reach",
    sub: "4.2% engagement rate via Reels",
    desc: "Developed an Instagram Reels-first content strategy for a D2C fashion brand, combining organic content with paid amplification to build brand awareness at scale.",
    tags: ["Instagram", "Reels", "Content"],
    color: "neon",
  },
];

function CaseStudiesSection() {
  return (
    <Section
      id="case-studies"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <SectionHeader
        eyebrow="Proven Results"
        title="Campaign Highlights"
        subtitle="Real numbers from real campaigns. Here's what data-driven marketing looks like in practice."
      />
      <motion.div
        variants={staggerContainer}
        className="grid sm:grid-cols-2 gap-6"
      >
        {CASE_STUDIES.map((cs, i) => (
          <motion.div
            key={cs.industry}
            variants={fadeIn}
            data-ocid={`casestudies.item.${i + 1}`}
            className={`card-surface rounded-2xl p-8 group relative overflow-hidden ${
              cs.color === "neon" ? "card-surface-neon" : ""
            }`}
          >
            {/* Background gradient accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-8 translate-x-8"
              style={{
                background:
                  cs.color === "violet"
                    ? "oklch(0.68 0.25 290)"
                    : "oklch(0.72 0.2 230)",
              }}
            />

            <div className="flex items-center gap-3 mb-5">
              <div
                className={`p-2 rounded-lg ${cs.color === "violet" ? "icon-container-violet" : "icon-container-amber"}`}
              >
                {cs.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {cs.industry}
              </span>
            </div>

            <div
              className={`text-5xl font-heading font-black mb-1 ${cs.color === "violet" ? "text-gradient-violet" : "text-gradient-amber"}`}
            >
              {cs.headline}
            </div>
            <div className="text-foreground/70 font-semibold mb-4">
              {cs.sub}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {cs.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full border ${
                    cs.color === "violet"
                      ? "bg-violet/5 border-violet/20 text-violet/80"
                      : "bg-neon/5 border-neon/20 text-amber-accent/80"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Trends 2026 Section
// ──────────────────────────────────────────────
const TRENDS = [
  {
    icon: <Zap size={22} />,
    title: "AI-Powered Ad Optimization",
    desc: "Using machine learning for automated bidding, creative scoring, and audience prediction to maximize ROAS.",
  },
  {
    icon: <Database size={22} />,
    title: "First-Party Data & Cookie-Less Strategy",
    desc: "Building owned data assets through lead funnels, CRM integration, and privacy-safe targeting alternatives.",
  },
  {
    icon: <Video size={22} />,
    title: "Short-Form Video Ads",
    desc: "Reels, Shorts, and TikTok-style creative dominating feeds — designing hooks that stop scrolls in 3 seconds.",
  },
  {
    icon: <LineChart size={22} />,
    title: "Omnichannel Analytics & Attribution",
    desc: "Cross-platform measurement using GA4, Meta CAPI, and custom UTM frameworks for true ROI visibility.",
  },
  {
    icon: <Rocket size={22} />,
    title: "Performance Max & Demand Gen",
    desc: "Harnessing Google's AI-first campaign types to reach intent-rich audiences across the entire Google ecosystem.",
  },
];

function TrendsSection() {
  return (
    <Section id="trends" className="bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="2026 Trends"
          title="Staying Ahead of the Curve"
          subtitle="The marketing landscape evolves fast. Here are the 2026 trends I actively work with and study."
        />
        <motion.div
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TRENDS.map((trend, i) => (
            <motion.div
              key={trend.title}
              variants={fadeIn}
              data-ocid={`trends.item.${i + 1}`}
              className="card-surface rounded-xl p-6 group"
            >
              <div className="w-12 h-12 rounded-xl icon-container-violet flex items-center justify-center mb-5">
                {trend.icon}
              </div>
              <h3 className="font-heading font-bold text-base mb-2 leading-snug">
                {trend.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {trend.desc}
              </p>
            </motion.div>
          ))}
          {/* CTA card - 6th item to fill the grid */}
          <motion.div
            variants={fadeIn}
            className="card-surface rounded-xl p-6 border-dashed hover:border-violet/40 transition-all duration-300 flex flex-col items-center justify-center text-center gap-3"
          >
            <TrendingUp size={28} className="text-violet animate-float" />
            <h3 className="font-heading font-bold text-base">
              Always Learning
            </h3>
            <p className="text-sm text-muted-foreground">
              Staying current with the latest platform updates, algorithm
              changes, and emerging ad formats.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Contact Section
// ──────────────────────────────────────────────
function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!actor) {
      toast.error("Connection unavailable. Please try again.");
      return;
    }
    setStatus("loading");
    try {
      await actor.submitInquiry(name.trim(), email.trim(), message.trim());
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: CTA copy */}
        <div>
          <motion.div variants={fadeUp}>
            <div className="text-violet text-sm font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </div>
            <h2 className="section-heading text-4xl sm:text-5xl mb-6">
              Let's Work <span className="text-gradient-violet">Together</span>
            </h2>
            <p className="text-foreground/75 text-lg mb-8 leading-relaxed">
              Have a project in mind? Looking for a dedicated digital marketing
              specialist to grow your brand? I'd love to hear about your goals.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              {
                icon: <Phone size={18} />,
                label: "Phone",
                value: "+91 79886 86185",
              },
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "Ankitsharma951126@gmail.com",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "Available Worldwide · Remote & On-Site",
              },
              {
                icon: <Link size={18} />,
                label: "LinkedIn",
                value: "linkedin.com/in/ankitsharma",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeIn}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-2 border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center text-violet flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div variants={fadeUp}>
          <form
            onSubmit={handleSubmit}
            className="card-surface rounded-2xl p-8 space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="text-sm font-semibold text-foreground"
              >
                Your Name
              </label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                data-ocid="contact.input"
                className="bg-surface-2 border-border focus:border-violet/50 focus:ring-violet/20 h-12"
                disabled={status === "loading"}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address
              </label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                data-ocid="contact.input"
                className="bg-surface-2 border-border focus:border-violet/50 focus:ring-violet/20 h-12"
                disabled={status === "loading"}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold text-foreground"
              >
                Message
              </label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, goals, and timeline..."
                data-ocid="contact.textarea"
                rows={5}
                className="bg-surface-2 border-border focus:border-violet/50 focus:ring-violet/20 resize-none"
                disabled={status === "loading"}
              />
            </div>

            {/* States */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-4 rounded-lg bg-violet/10 border border-violet/30 text-violet"
                >
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-medium">
                    Message sent successfully! I'll be in touch soon.
                  </span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive"
                >
                  <X size={18} />
                  <span className="text-sm font-medium">
                    Failed to send. Please try again.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              data-ocid="contact.submit_button"
              className="w-full bg-violet text-background hover:bg-violet/90 font-bold text-base h-12 glow-violet"
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    size={18}
                    className="mr-2 animate-spin"
                    data-ocid="contact.loading_state"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-surface-1 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-violet flex items-center justify-center">
                <Zap size={14} className="text-background" />
              </div>
              <span className="font-heading font-bold text-base">
                Ankit <span className="text-violet">Sharma</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Digital Marketing Specialist crafting data-driven campaigns that
              deliver measurable ROI.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Quick Links
            </div>
            <div className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  data-ocid="nav.link"
                  className="text-sm text-muted-foreground hover:text-violet transition-colors text-left py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Connect
            </div>
            <div className="flex gap-3">
              {[
                {
                  icon: <SiLinkedin size={18} />,
                  label: "LinkedIn",
                  href: "#",
                },
                {
                  icon: <SiInstagram size={18} />,
                  label: "Instagram",
                  href: "#",
                },
                { icon: <SiX size={18} />, label: "X", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-muted-foreground hover:text-violet hover:border-violet/30 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Ankit Sharma. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#admin"
              data-ocid="admin.link"
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              Admin
            </a>
            <p className="text-xs text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// App Root
// ──────────────────────────────────────────────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash === "#admin";

  if (isAdmin) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AdminPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider label="About" />
        <AboutSection />
        <SectionDivider label="Services" />
        <ServicesSection />
        <SectionDivider label="Industries" />
        <IndustriesSection />
        <SectionDivider label="Experience" />
        <ExperienceSection />
        <SectionDivider label="Results" />
        <CaseStudiesSection />
        <SectionDivider label="2026 Trends" />
        <TrendsSection />
        <SectionDivider label="Contact" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
