// npm i framer-motion lucide-react
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import {
  Droplets, Sparkles, Building2, Shirt, BedDouble, BadgeCheck, Search,
  ShieldCheck, Phone, Mail, MapPin, Menu, X, ArrowUpRight, ArrowRight,
  Hotel, UtensilsCrossed, Stethoscope, Briefcase, Check, MessageCircle, WashingMachine,
} from "lucide-react";
import "./App.css";

const PHONE = "+971 50 855 1051";
const EMAIL = "jaitechl3259@gmail.com";
const WA = "https://api.whatsapp.com/send?phone=971508551051&text=Hello%20Jai%20Tech%20Laundry";
const img = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const NAV = ["about", "services", "industries", "clients", "contact"];

const SERVICES = [
  { icon: Droplets, title: "Wash & Fold", text: "Washing, drying and folding with careful fabric handling and clean finishing." },
  { icon: Sparkles, title: "Dry Cleaning", text: "Care for suits, formal wear, delicate garments and premium fabrics.", featured: true },
  { icon: Building2, title: "Commercial Laundry", text: "Laundry built around the requirements of commercial organisations." },
  { icon: Shirt, title: "Garment Care", text: "Cleaning and finishing for everyday and specialised garments." },
  { icon: BedDouble, title: "Linen Care", text: "Sheets, towels, hospitality linen and other fabric items." },
  { icon: BadgeCheck, title: "Uniform Care", text: "Corporate, hospitality and industrial uniforms, cleaned and finished." },
];

const INDUSTRIES = [
  { icon: Hotel, title: "Hospitality", text: "Professional linen and garment care.", src: img("photo-1566073771259-6a8506099945") },
  { icon: UtensilsCrossed, title: "Restaurants", text: "Linen, garment and uniform care.", src: img("photo-1515003197210-e0cd71810b5f") },
  { icon: Stethoscope, title: "Healthcare", text: "Professional fabric care solutions.", src: img("photo-1586773860418-d37222d8fce3") },
  { icon: Briefcase, title: "Corporate", text: "Professional uniform and garment care.", src: img("photo-1497366811353-6870744d04b2") },
];

const STEPS = [
  { icon: Search, title: "Inspect", text: "Garments and fabrics are assessed." },
  { icon: Droplets, title: "Clean", text: "Appropriate cleaning care is applied." },
  { icon: Sparkles, title: "Finish", text: "Items are professionally finished." },
  { icon: BadgeCheck, title: "Check", text: "Final quality review before handover." },
];

const CLIENTS = ["ADNH Catering", "Shangri-La", "Emarat", "Aster", "Cummins", "Drydocks World", "Jumeirah"];
const MARQUEE = ["Fabric assessment", "Professional cleaning", "Premium finishing", "Commercial support", "Uniform care", "Linen care"];

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

const Reveal = ({ children, i = 0, className, as: Tag = "div" }) => {
  const M = motion[Tag];
  return (
    <M className={className} variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </M>
  );
};

/* Floating soap bubbles */
function Bubbles({ count = 16 }) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i, size: 12 + ((i * 37) % 46), left: (i * 61) % 100,
      dur: 9 + ((i * 7) % 9), delay: (i * 1.3) % 8,
    })), [count]);
  if (reduce) return null;
  return (
    <div className="bubbles" aria-hidden="true">
      {items.map((b) => (
        <motion.span
          key={b.id}
          className="bubble"
          style={{ width: b.size, height: b.size, left: `${b.left}%` }}
          initial={{ y: "20vh", opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 0.9, 0.9, 0], x: [0, 20, -20, 10] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* Animated washing machine for the hero */
function Machine() {
  return (
    <div className="machine" aria-hidden="true">
      <div className="machine-top">
        <i /><i /><i />
        <motion.b animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
      </div>
      <div className="drum">
        <div className="drum-water"><span /><span /></div>
        <motion.div
          className="drum-shirt"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <Shirt size={54} strokeWidth={1.6} />
        </motion.div>
        <span className="shine" />
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      className={`nav ${solid ? "is-solid" : ""}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="wrap nav-in">
        <a href="#home" className="brand">
          <span className="brand-mark"><WashingMachine size={20} /></span>
          <span><strong>Jai Tech</strong><small>Laundry</small></span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          {NAV.map((n) => (
            <a key={n} href={`#${n}`} onClick={() => setOpen(false)}>{n}</a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Request quote <ArrowUpRight size={16} />
          </a>
        </nav>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <Bubbles />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <motion.p className="pill" variants={fade} initial="hidden" animate="show">
            <span className="pulse" /> Commercial laundry &amp; dry cleaning, Dubai
          </motion.p>
          <motion.h1 variants={fade} custom={1} initial="hidden" animate="show">
            Fabric care, <em>engineered</em> to feel effortless.
          </motion.h1>
          <motion.p className="lead" variants={fade} custom={2} initial="hidden" animate="show">
            Laundry, dry cleaning and garment care for hospitality, healthcare,
            corporate and industrial clients.
          </motion.p>
          <motion.div className="hero-actions" variants={fade} custom={3} initial="hidden" animate="show">
            <a href="#services" className="btn btn-primary">Explore services <ArrowRight size={18} /></a>
            <a href="#contact" className="btn btn-ghost">Request a quote</a>
          </motion.div>
          <motion.ul className="proof" variants={fade} custom={4} initial="hidden" animate="show">
            <li><ShieldCheck size={18} /> Careful fabric handling</li>
            <li><Droplets size={18} /> Specialised cleaning</li>
            <li><Sparkles size={18} /> Crisp finishing</li>
          </motion.ul>
        </div>

        <motion.div className="hero-stage" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="stage-blob" />
          <Machine />
          <motion.div className="float-card fc-one" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="fc-icon"><BadgeCheck size={20} /></span>
            <div><small>Quality standard</small><strong>Professional care</strong></div>
          </motion.div>
          <motion.div className="float-card fc-two" animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <span className="fc-icon sun"><Sparkles size={20} /></span>
            <div><small>Finishing</small><strong>Clean. Crisp. Ready.</strong></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-label="Our approach">
      <div className="marquee-track">
        {row.map((t, i) => (<span key={i}><Sparkles size={16} /> {t}</span>))}
      </div>
    </div>
  );
}

function About() {
  const list = ["Commercial laundry solutions", "Professional dry cleaning", "Garment & uniform care", "Linen & fabric care", "Professional finishing", "Business laundry support"];
  return (
    <section className="section" id="about">
      <div className="wrap split">
        <Reveal className="about-gallery">
          <img className="ab-main" src={img("photo-1545173168-9f1947eebb7f", 1200)} alt="Professional laundry facility" loading="lazy" />
          <img className="ab-side" src={img("photo-1604335399105-a0c585fd81a1", 800)} alt="Laundry equipment" loading="lazy" />
          <motion.div className="ab-badge" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <Sparkles size={20} /> Care in every detail
          </motion.div>
        </Reveal>
        <div>
          <Reveal as="h2" className="h2">Built around quality, care and precision.</Reveal>
          <Reveal as="p" i={1} className="muted">
            Jai Tech Laundry provides professional laundry, dry cleaning and garment care in Dubai,
            with a strong focus on fabric quality and consistent finishing.
          </Reveal>
          <Reveal as="p" i={2} className="muted">
            Our services are designed for commercial organisations and customers who need
            dependable care across a range of fabrics and garments.
          </Reveal>
          <ul className="checks">
            {list.map((t, i) => (
              <Reveal as="li" i={i + 3} key={t}><span><Check size={14} /></span>{t}</Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section tint" id="services">
      <div className="wrap">
        <div className="intro">
          <Reveal as="h2" className="h2">Advanced fabric care solutions.</Reveal>
          <Reveal as="p" i={1} className="muted">
            Services for garments, linen, uniforms and commercial laundry needs.
          </Reveal>
        </div>
        <div className="grid-3">
          {SERVICES.map(({ icon: Icon, title, text, featured }, i) => (
            <motion.article
              key={title}
              className={`card ${featured ? "featured" : ""}`}
              variants={fade} custom={i % 3} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {featured && <span className="badge">Most requested</span>}
              <motion.span className="card-icon" whileHover={{ rotate: -10, scale: 1.1 }}><Icon size={26} /></motion.span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact">Enquire <ArrowUpRight size={16} /></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="intro center">
          <Reveal as="h2" className="h2">A structured care process.</Reveal>
          <Reveal as="p" i={1} className="muted">Focused on fabric care and consistent finishing.</Reveal>
        </div>
        <div className="steps">
          <motion.div className="steps-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut" }} />
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} i={i} className="step">
              <span className="step-icon"><Icon size={26} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="section tint" id="industries">
      <div className="wrap">
        <div className="intro">
          <Reveal as="h2" className="h2">Professional care for business.</Reveal>
          <Reveal as="p" i={1} className="muted">Laundry tailored to organisations that need professional fabric care.</Reveal>
        </div>
        <div className="grid-4">
          {INDUSTRIES.map(({ icon: Icon, title, text, src }, i) => (
            <motion.article key={title} className="industry" variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }} whileHover="hover">
              <motion.img src={src} alt={title} loading="lazy" variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.6 }} />
              <div className="industry-shade" />
              <div className="industry-copy">
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="section" id="clients">
      <div className="wrap">
        <div className="intro center">
          <Reveal as="h2" className="h2">Trusted by leading organisations.</Reveal>
          <Reveal as="p" i={1} className="muted">Hospitality, healthcare, industrial and corporate sectors.</Reveal>
        </div>
      </div>
      <div className="marquee light">
        <div className="marquee-track slow">
          {row.map((c, i) => (<span key={i} className="client">{c}</span>))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    // Connect to your Django endpoint here, e.g.
    // await fetch("/api/enquiry/", { method: "POST", headers: { "Content-Type": "application/json", "X-CSRFToken": csrf }, body: JSON.stringify(form) });
    setSent(true);
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact">
          <div className="contact-copy">
            <Reveal as="h2" className="h2">Let's talk about your laundry needs.</Reveal>
            <Reveal as="p" i={1}>Contact us for commercial laundry, dry cleaning and garment care enquiries.</Reveal>
            <Reveal i={2} className="info">
              <a href={`tel:${PHONE.replace(/\s/g, "")}`}><Phone size={18} /> {PHONE}</a>
              <a href={`mailto:${EMAIL}`}><Mail size={18} /> {EMAIL}</a>
              <span><MapPin size={18} /> Dubai, United Arab Emirates</span>
            </Reveal>
          </div>

          <Reveal i={2}>
            <form className="form" onSubmit={submit}>
              <h3>Tell us your requirements</h3>
              {sent && (
                <motion.div className="success" role="status" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Check size={18} /> Enquiry sent. Our team will get back to you soon.
                </motion.div>
              )}
              <div className="two">
                <label>Full name *<input required value={form.name} onChange={set("name")} placeholder="Your name" /></label>
                <label>Phone *<input required value={form.phone} onChange={set("phone")} placeholder="+971" /></label>
              </div>
              <label>Email<input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" /></label>
              <label>Service *
                <select required value={form.service} onChange={set("service")}>
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (<option key={s.title}>{s.title}</option>))}
                </select>
              </label>
              <label>Message<textarea rows="4" value={form.message} onChange={set("message")} placeholder="Volumes, fabrics, schedule…" /></label>
              <motion.button className="btn btn-primary block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Submit enquiry <ArrowRight size={18} />
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-in">
        <span>© {new Date().getFullYear()} Jai Tech Laundry. All rights reserved.</span>
        <span>Professional laundry services, Dubai</span>
      </div>
    </footer>
  );
}

export default function JaiTechLaundry() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Industries />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <motion.a
        href={WA} target="_blank" rel="noopener noreferrer" className="wa" aria-label="Contact on WhatsApp"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle size={26} />
      </motion.a>
    </>
  );
}