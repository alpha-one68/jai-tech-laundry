import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BedDouble,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Droplets,
  Hotel,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Shirt,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  WashingMachine,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "+971 50 855 1051";
const EMAIL = "jaitechl3259@gmail.com";
const ENQUIRY_API =
  import.meta.env.VITE_ENQUIRY_API_URL ||
  "http://127.0.0.1:8000/enquiry/";
const WA =
  "https://api.whatsapp.com/send?phone=971508551051&text=Hello%20Jai%20Tech%20Laundry%2C%20I%27d%20like%20to%20discuss%20your%20services.";
const EASE = [0.22, 1, 0.36, 1];

const IMAGES = {
  linen:
    "https://images.pexels.com/photos/7691101/pexels-photo-7691101.jpeg?auto=compress&cs=tinysrgb&w=1600",
  care:
    "https://images.pexels.com/photos/6466228/pexels-photo-6466228.jpeg?auto=compress&cs=tinysrgb&w=1400",
  facility:
    "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=2200&q=85",
};

const CUMMINS_LOGO =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 113.9 100.1" style="enable-background:new 0 0 113.9 100.1;" xml:space="preserve"><style type="text/css"> .logo-st0{fill-rule:evenodd;clip-rule:evenodd;} .logo-st0.dark{fill:#000;} </style><g><path class="logo-st0 dark" d="M69.1,8.5l-3.7,2.6c0.8,1,1.2,1.5,1.8,2.4l4.9,7.1l3.6-2.5L72,12.6c-0.1-0.1-1.7-1.9,0.1-3.2 c1.1-0.8,2.1,0.1,2.8,1l3.9,5.6l3.6-2.5L78,7.1c-1.5-2.1-3.9-2.4-6-1C70.7,7,70.1,8,69.9,9.5L69.1,8.5z M63,10.3l-1.8-2.6l-3.7,2.5 l1.8,2.6L63,10.3z M70.8,21.6L64.1,12l-3.6,2.5l6.7,9.6L70.8,21.6z M46,24.6l-3.6,2.5c0.8,1,1.2,1.5,1.8,2.4l4.9,7.1l3.6-2.5 L49,28.6c-0.1-0.1-1.7-1.9,0.1-3.2c1.1-0.8,2.1,0.1,2.8,1l3.9,5.6l3.6-2.5L55.6,24c-0.1-0.1-1.7-1.9,0.1-3.2c1.1-0.8,2.1,0.1,2.8,1 l3.9,5.6l3.6-2.5l-4.5-6.4c-1.5-2.1-3.9-2.4-6-1c-1.4,1-2.3,2.6-2.1,4.2c-1.2-0.9-3-0.6-4.1,0.2c-1.4,1-2.4,2.4-2.1,4.2l0,0 L46,24.6z M27.8,37.2l-3.6,2.5c0.8,1,1.2,1.5,1.8,2.4l4.9,7.1l3.6-2.5l-3.8-5.5c-0.1-0.1-1.7-1.9,0.1-3.2c1.1-0.8,2.1,0.1,2.7,1 l3.9,5.6l3.6-2.5l-3.8-5.5c-0.1-0.1-1.7-1.9,0.1-3.2c1.1-0.8,2.1,0.1,2.7,1l3.9,5.6l3.6-2.5l-4.5-6.4c-1.5-2.1-3.9-2.4-6-1 c-1.4,1-2.3,2.6-2.1,4.2c-1.2-0.9-3-0.6-4.1,0.2c-1.4,1-2.4,2.4-2.1,4.2l0,0L27.8,37.2z M26.4,52.4l3.7-2.6c-0.8-1-1.2-1.5-1.8-2.4 l-4.9-7.1l-3.6,2.5l3.8,5.5c0.1,0.1,1.7,1.9-0.1,3.2c-1.1,0.8-2.1-0.1-2.8-1l-3.9-5.6l-3.6,2.5l4.5,6.4c1.5,2.1,3.9,2.4,6,1 c1.2-0.9,1.9-1.9,2.1-3.4L26.4,52.4z M81.1,0c-0.3,0-0.7,0.2-0.9,0.3C78.3,1.6,77,3.6,78.6,6C81,9.5,86,4.5,87.2,6.2 c0.4,0.6,0.1,1.2-0.6,1.7c-0.3,0.2-0.8,0.3-1.2,0.2C85,8,84.7,7.8,84.6,7.4l-3.4,2.4c2,2.9,4.6,1.8,7,0.2c2.2-1.5,4.1-3.8,2.4-6.4 c-1.1-1.6-2.4-1.7-3.8-1.3c-2.8,0.9-4.2,1.9-4.7,1.2c-0.4-0.6-0.3-1.1,0.3-1.5c0.5-0.3,0.9-0.4,1.2-0.3c0.3,0.1,0.4,0.2,0.7,0.5 L87.8,0h12.4v36.6H56.9c-6.1,0-15,2.8-15,13.4c0,10.1,9.1,12.9,15,12.9h43.3V100H52.6C26.4,100,0,82.4,0,50C0,17.4,27.3,0,52.6,0 h28.1L81.1,0z M9.7,43.9l-4.8,3.3c-3.4,2.4-5.1,7.1-2,11.5c3.1,4.4,7.9,4.6,11.5,2.1l4.8-3.3l-2.7-3.9l-4.5,3.1 c-1.7,1.2-3.8,0.6-4.8-1c-1.1-1.5-0.9-3.7,0.8-4.9l4.5-3.1L9.7,43.9z"/><path class="logo-st0 dark" d="M106.9,94.1v-2.3h1.5c0.8,0,1.6,0.2,1.6,1.1c0,1.1-1,1.2-2,1.2H106.9z M106.9,94.8h1.4l1.9,2.9h0.9l-2-2.9 c0.9-0.2,1.7-0.7,1.7-1.8c0-1.2-0.7-1.8-2.1-1.8h-2.5v6.6h0.8V94.8z M108.2,89.5c2.8,0,4.8,2.2,4.8,4.9c0,2.7-2.1,4.9-4.8,4.9 c-2.7,0-4.8-2.2-4.8-4.9C103.3,91.7,105.4,89.5,108.2,89.5z M108.2,88.7c-3.2,0-5.7,2.5-5.7,5.7s2.5,5.7,5.7,5.7 c3.2,0,5.7-2.5,5.7-5.7S111.4,88.7,108.2,88.7z"/></g></svg>`
  );

const CLIENTS = [
  {
    name: "ADNH Catering",
    sector: "Catering & support services",
    logo: "https://www.adnhc.me/api/images/eyJrIjoiYWRuaC13ZWItZmlsZXNcL3NldHRpbmdzXC9sb2dvX2RhcmtfbG9nby1kYXJrXzE3NjkwODMxMjYuc3ZnIiwicyI6Ijk5ODIyMjc1NzFmNGIwMGM3MmEyMzU2ODgyNDEwNWYwNjcyMjc2ODNmODY3MTE0ZmRkY2JlYjQ1MGM1M2Q4YjkifQ",
    url: "https://www.adnhc.me/",
    className: "logo-adnh",
  },
  {
    name: "Shangri-La",
    sector: "Hospitality",
    logo: "https://sitecore-cd.shangri-la.com/-/media/Shangri-La/header_footer/251023/Shangri-La_EN.png",
    url: "https://www.shangri-la.com/",
  },
  {
    name: "Emarat",
    sector: "Energy & retail",
    logo: "https://www.emarat.ae/media/l31apyym/logo.svg",
    url: "https://www.emarat.ae/",
  },
  {
    name: "Aster DM Healthcare",
    sector: "Healthcare",
    logo: "https://www.asterdmhealthcare.com/fileadmin/user_upload/f-logo.svg",
    url: "https://www.asterdmhealthcare.com/",
  },
  {
    name: "Cummins",
    sector: "Industrial",
    logo: CUMMINS_LOGO,
    url: "https://www.cummins.com/",
  },
  {
    name: "Drydocks World",
    sector: "Marine & industrial",
    logo: "https://dpw-p-001.sitecorecontenthub.cloud/api/public/content/ff6c3bbff45e4422ac2f063b0adcdf23?v=3a841275",
    url: "https://www.drydocks.gov.ae/",
    cardClass: "client-dark",
  },
  {
    name: "Jumeirah",
    sector: "Hospitality",
    logo: "https://cdn.jumeirah.com/api/public/content/e72506f8245346f6899095f444413b8d?v=6f049aa6",
    url: "https://www.jumeirah.com/",
    className: "logo-jumeirah",
  },
];

const SERVICES = [
  {
    name: "Wash & Fold",
    icon: Droplets,
    category: "EVERYDAY, ELEVATED",
    text: "Fresh, beautifully folded essentials. Thoughtful care that gives you your time back.",
    detail: "Everyday garments · Everyday comfort",
  },
  {
    name: "Dry Cleaning",
    icon: Sparkles,
    category: "FOR YOUR FINEST",
    text: "From your favourite suit to delicate fabrics, a considered clean for the pieces that matter.",
    detail: "Delicates · Formalwear · Premium fabrics",
    featured: true,
  },
  {
    name: "Commercial Laundry",
    icon: WashingMachine,
    category: "BUILT FOR BUSINESS",
    text: "A dependable laundry partner, with care shaped around your organisation’s requirements.",
    detail: "Hotels · Restaurants · Organisations",
  },
  {
    name: "Garment Care",
    icon: Shirt,
    category: "CARE IN EVERY THREAD",
    text: "Professional cleaning and finishing, keeping your garments ready for their next chapter.",
    detail: "Everyday wear · Specialised garments",
  },
  {
    name: "Linen Care",
    icon: BedDouble,
    category: "THE FEEL OF FRESH",
    text: "Crisp sheets, soft towels, and beautifully finished linen. The details your guests feel.",
    detail: "Sheets · Towels · Hospitality linen",
  },
  {
    name: "Uniform Care",
    icon: BadgeCheck,
    category: "A SHARPER FIRST IMPRESSION",
    text: "Consistent, professional finishing for the uniforms that represent your team.",
    detail: "Corporate · Hospitality · Industrial",
  },
];

const SERVICE_NAMES = SERVICES.map((service) => service.name);

const INDUSTRIES = [
  {
    name: "Hospitality",
    icon: Hotel,
    text: "A welcome your guests can feel.",
    details:
      "Guest linen, towels and staff uniforms, finished with care for every stay.",
    service: "Linen Care",
    image: IMAGES.linen,
  },
  {
    name: "Restaurants",
    icon: UtensilsCrossed,
    text: "Set the table. We’ll handle the linen.",
    details:
      "Table linen, kitchen textiles and uniforms, cared for around your operation.",
    service: "Commercial Laundry",
    image: IMAGES.care,
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    text: "Thoughtful care for essential fabrics.",
    details:
      "Discuss your organisation’s fabric, uniform and laundering requirements with our team.",
    service: "Commercial Laundry",
    image: IMAGES.linen,
  },
  {
    name: "Corporate & industrial",
    icon: BriefcaseBusiness,
    text: "Make your everyday look professional.",
    details:
      "Uniform and garment care tailored to the needs of your organisation.",
    service: "Uniform Care",
    image: IMAGES.facility,
  },
];

const PROCESS_STEPS = [
  {
    name: "A closer look.",
    label: "INSPECT",
    icon: Shirt,
    text: "We begin with the details. Fabrics and garments are assessed to understand the care they need.",
  },
  {
    name: "A considered clean.",
    label: "CLEAN",
    icon: Droplets,
    text: "Appropriate cleaning methods are selected for the fabric, with careful handling throughout.",
  },
  {
    name: "The finishing touch.",
    label: "FINISH",
    icon: Sparkles,
    text: "Professional finishing brings back that clean, crisp, ready-to-use feeling.",
  },
  {
    name: "Care, checked.",
    label: "CHECK",
    icon: BadgeCheck,
    text: "A final quality review makes sure the details have received the attention they deserve.",
  },
];

const QUESTIONS = [
  {
    question: "How do I request a quote?",
    answer:
      "Choose the service you need and tell us about your items. The enquiry form prepares a WhatsApp message for you to review and send. Our team can then discuss your requirements and pricing with you.",
  },
  {
    question: "Can I enquire about laundry for my business?",
    answer:
      "Yes. Select Commercial Laundry and share your business type, the items you need cared for, and your approximate laundry volume. You can also enquire about linen and uniform care.",
  },
  {
    question: "What details should I include?",
    answer:
      "A description of your garments or linen, approximate quantities, fabric details, and any particular care requirements are helpful. If you have a preferred timeframe, include that so the team can discuss availability with you.",
  },
];

function Brand({ inverted = false }) {
  return (
    <Link
      to="/"
      className={`brand ${inverted ? "brand-inverted" : ""}`}
      aria-label="Jai Tech Laundry home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <path
            d="M32 8c-3 15-9 21-24 24 15 3 21 9 24 24 3-15 9-21 24-24C41 29 35 23 32 8Z"
            fill="currentColor"
          />
          <circle cx="32" cy="32" r="5" fill="#c6f36b" />
        </svg>
      </span>
      <span className="brand-type">
        Jai Tech
        <span>LAUNDRY & FABRIC CARE</span>
      </span>
    </Link>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

function MagneticLink({
  children,
  to,
  className = "",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  function move(event) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.13);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  }

  return (
    <motion.span
      className="magnetic"
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;

    function close(event) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="top-bar">
        <div className="container">
          <span>Professional care. A fresher everyday.</span>
          <a href="tel:+971508551051">
            <Phone size={12} />
            {PHONE}
            <span className="top-location">
              &nbsp; · &nbsp; DUBAI, UAE
            </span>
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/#about">Our story</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#industries">Industries</Link>
            <Link to="/#clients">Our clients</Link>
            <Link
              to="/contact"
              className={
                location.pathname === "/contact" ? "nav-active" : ""
              }
            >
              Contact
            </Link>
          </nav>

          <Link
            to="/contact"
            className="button button-dark nav-quote"
          >
            Let’s talk <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label={
              open ? "Close navigation" : "Open navigation"
            }
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <Link to="/#about">Our story</Link>
              <Link to="/#services">Services</Link>
              <Link to="/#industries">Industries</Link>
              <Link to="/#clients">Our clients</Link>
              <Link to="/contact">Contact & enquiries</Link>
            </motion.nav>
          )}
        </AnimatePresence>

        <motion.div
          className="page-progress"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -85]);

  return (
    <section className="hero container" ref={ref}>
      <div className="hero-copy">
        <motion.div
          className="eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <span className="tiny-star">✳</span>
          A FRESH STANDARD OF CARE
        </motion.div>

        <h1 className="hero-title">
          {["Every thread.", "Exceptional", "care."].map(
            (line, index) => (
              <span
                className={`line-mask line-${index}`}
                key={line}
              >
                <motion.span
                  initial={
                    reduceMotion
                      ? false
                      : { y: "110%", rotate: 3 }
                  }
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.18 + index * 0.12,
                    ease: EASE,
                  }}
                >
                  {line}
                  {index === 2 && (
                    <span
                      className="title-spark"
                      aria-hidden="true"
                    >
                      ✳
                    </span>
                  )}
                </motion.span>
              </span>
            )
          )}
        </h1>

        <motion.p
          className="hero-description"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          From everyday garments to the linen your guests love.
          Expert laundry and dry cleaning, with care in every detail.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <MagneticLink
            to="/contact"
            className="button button-lime"
          >
            Find your fresh <ArrowUpRight size={19} />
          </MagneticLink>

          <Link to="/#services" className="text-link">
            Explore our services <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div
          className="hero-footnote"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          <span className="round-icon">
            <ShieldCheck size={18} />
          </span>

          <span>
            Thoughtful fabric care.
            <br />
            <strong>For you. For your business.</strong>
          </span>

          <span className="hero-location">
            BASED IN
            <br />
            <strong>DUBAI, UAE</strong>
          </span>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={
          reduceMotion
            ? false
            : {
                clipPath:
                  "inset(8% 8% 8% 8% round 180px 180px 22px 22px)",
                opacity: 0,
              }
        }
        animate={{
          clipPath:
            "inset(0% 0% 0% 0% round 180px 180px 22px 22px)",
          opacity: 1,
        }}
        transition={{
          duration: 1.3,
          delay: 0.25,
          ease: EASE,
        }}
      >
        <motion.img
          className="hero-photo"
          src={IMAGES.linen}
          alt="A stack of fresh, soft white towels"
          fetchPriority="high"
          style={reduceMotion ? undefined : { y: imageY }}
        />

        <div className="hero-photo-shade" />

        <div className="visual-top-label">
          <span>THE FEEL OF FRESH</span>
          <Sparkles size={17} />
        </div>

        <motion.div
          className="fresh-seal"
          style={reduceMotion ? undefined : { y: badgeY }}
        >
          <motion.svg
            viewBox="0 0 120 120"
            animate={
              reduceMotion ? undefined : { rotate: 360 }
            }
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            aria-hidden="true"
          >
            <defs>
              <path
                id="seal-path"
                d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0"
              />
            </defs>
            <text>
              <textPath href="#seal-path">
                THOUGHTFULLY CLEANED · BEAUTIFULLY FINISHED ·
              </textPath>
            </text>
          </motion.svg>

          <Sparkles size={32} />
        </motion.div>

        <motion.div
          className="hero-note"
          animate={
            reduceMotion ? undefined : { y: [0, -8, 0] }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="note-icon">
            <BedDouble size={24} />
          </span>

          <div>
            <small>It’s all in the details.</small>
            <strong>Clean. Smooth. Ready.</strong>
          </div>

          <span className="note-check">
            <Check size={15} />
          </span>
        </motion.div>

        <span className="photo-caption">
          Freshness you can feel.
        </span>
      </motion.div>

      <Link
        to="/#about"
        className="scroll-cue"
        aria-label="Discover our story"
      >
        <ArrowDown size={16} />
        <span>SCROLL TO DISCOVER</span>
      </Link>
    </section>
  );
}

function ClientStrip() {
  return (
    <div className="client-strip container">
      <span>
        IN GOOD
        <br />
        <strong>COMPANY.</strong>
      </span>

      <div className="client-strip-logos">
        {CLIENTS.slice(0, 5).map((client) => (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${client.name} official website`}
          >
            <img
              src={client.logo}
              alt={client.name}
              className={client.className || ""}
            />
          </a>
        ))}
      </div>

      <Link
        className="client-strip-link"
        to="/#clients"
        aria-label="See all our clients"
      >
        <ArrowUpRight size={22} />
      </Link>
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      className="section about-section container"
    >
      <div className="about-images">
        <Reveal className="about-image-frame">
          <img
            src={IMAGES.care}
            alt="Hospitality staff carefully carrying fresh towels"
            loading="lazy"
            className="parallax-image"
          />
          <span className="image-tag">
            <Sparkles size={16} />
            THE HUMAN SIDE OF CLEAN
          </span>
        </Reveal>

        <Reveal className="about-mini-card" delay={0.2}>
          <span className="mini-card-icon">
            <Droplets size={29} />
          </span>
          <span>
            Every fabric is different.
            <br />
            <strong>So is the way we care.</strong>
          </span>
        </Reveal>

        <span className="about-image-index">01 / OUR STORY</span>
      </div>

      <div className="about-copy">
        <Reveal className="eyebrow">
          GOOD CARE GOES A LONG WAY
        </Reveal>

        <Reveal
          as="h2"
          className="section-title"
          delay={0.1}
        >
          A little more care.
          <br />
          A lot more <span className="highlight-word">fresh.</span>
        </Reveal>

        <Reveal as="p" className="body-copy" delay={0.2}>
          At Jai Tech Laundry, we believe great laundry is about
          more than clean fabric. It’s about the confidence of a
          sharp uniform, the comfort of fresh linen, and one less
          thing on your list.
        </Reveal>

        <Reveal as="p" className="body-copy" delay={0.3}>
          Based in Dubai, we bring thoughtful handling and
          professional finishing to garments, linen, and commercial
          laundry. Care that works around you.
        </Reveal>

        <Reveal className="about-values" delay={0.4}>
          <span>
            <ShieldCheck size={18} /> Careful fabric handling
          </span>
          <span>
            <Sparkles size={18} /> A finish you can feel
          </span>
        </Reveal>

        <Reveal delay={0.45}>
          <Link to="/contact" className="text-link">
            Meet your laundry partner <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, {
    stiffness: 180,
    damping: 25,
  });
  const rotateY = useSpring(y, {
    stiffness: 180,
    damping: 25,
  });
  const Icon = service.icon;

  function move(event) {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();

    x.set(
      -(
        (event.clientY - rect.top - rect.height / 2) /
        rect.height
      ) * 5
    );

    y.set(
      ((event.clientX - rect.left - rect.width / 2) /
        rect.width) * 5
    );
  }

  return (
    <Reveal
      delay={(index % 3) * 0.08}
      className="service-perspective"
    >
      <motion.article
        className={`service-card ${
          service.featured ? "service-featured" : ""
        }`}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformPerspective: 900,
              }
        }
        onPointerMove={move}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        whileHover={reduceMotion ? undefined : { y: -6 }}
        transition={{ duration: 0.25 }}
      >
        <div className="service-top">
          <span className="service-icon">
            <Icon size={29} strokeWidth={1.5} />
          </span>
          <span className="service-number">0{index + 1}</span>
        </div>

        <span className="service-category">
          {service.category}
        </span>

        <h3>{service.name}</h3>
        <p>{service.text}</p>

        <div className="service-card-bottom">
          <small>{service.detail}</small>
          <Link
            to={`/contact?service=${encodeURIComponent(
              service.name
            )}`}
            className="service-link"
            aria-label={`Enquire about ${service.name}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Services() {
  return (
    <section
      id="services"
      className="section services-section"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Reveal className="eyebrow">WHAT WE DO</Reveal>
            <Reveal as="h2" className="section-title">
              Your fabrics.
              <br />
              Our <span className="highlight-word">speciality.</span>
            </Reveal>
          </div>

          <Reveal as="p" className="section-description">
            Everyday essentials or business-sized needs.
            <br />
            There’s a thoughtful clean for every fabric.
          </Reveal>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  const Icon = PROCESS_STEPS[active].icon;

  function handleKey(event) {
    if (
      !["ArrowRight", "ArrowLeft", "Home", "End"].includes(
        event.key
      )
    ) {
      return;
    }

    event.preventDefault();

    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? PROCESS_STEPS.length - 1
          : (active +
              (event.key === "ArrowRight"
                ? 1
                : PROCESS_STEPS.length - 1)) %
            PROCESS_STEPS.length;

    setActive(next);
    document.getElementById(`process-tab-${next}`)?.focus();
  }

  return (
    <section className="process-section" id="process">
      <div className="container process-grid">
        <div className="process-copy">
          <Reveal className="eyebrow">THE JAI TECH WAY</Reveal>

          <Reveal as="h2" className="section-title">
            The difference
            <br />
            is in the <em>details.</em>
          </Reveal>

          <Reveal as="p" className="body-copy">
            A considered process, from the first inspection to the
            final fold. Explore the four steps behind your fresh.
          </Reveal>

          <div
            className="process-tabs"
            role="tablist"
            aria-label="Our care process"
          >
            {PROCESS_STEPS.map((step, index) => (
              <button
                key={step.label}
                type="button"
                role="tab"
                id={`process-tab-${index}`}
                aria-selected={active === index}
                aria-controls="process-detail"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={handleKey}
                className={active === index ? "active" : ""}
              >
                <span>0{index + 1}</span>
                {step.label}
              </button>
            ))}
          </div>

          <div
            className="process-detail"
            id="process-detail"
            role="tabpanel"
            aria-labelledby={`process-tab-${active}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <Icon size={25} />
                <h3>{PROCESS_STEPS[active].name}</h3>
                <p>{PROCESS_STEPS[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="process-photo">
          <img
            className="parallax-image"
            src={IMAGES.facility}
            alt="A row of commercial laundry machines"
            loading="lazy"
          />

          <div className="process-photo-shade" />

          <div className="process-photo-label">
            <span>PRECISION IN EVERY CYCLE</span>
            <span className="large-photo-star">✳</span>
          </div>

          <div className="process-photo-bottom">
            <WashingMachine size={23} />
            <span>
              Professional equipment.
              <br />
              <strong>Personal attention.</strong>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Industries() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = INDUSTRIES[active];
  const Icon = current.icon;

  function handleKey(event) {
    if (
      !["ArrowDown", "ArrowUp", "Home", "End"].includes(
        event.key
      )
    ) {
      return;
    }

    event.preventDefault();

    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? INDUSTRIES.length - 1
          : (active +
              (event.key === "ArrowDown"
                ? 1
                : INDUSTRIES.length - 1)) %
            INDUSTRIES.length;

    setActive(next);
    document.getElementById(`industry-tab-${next}`)?.focus();
  }

  return (
    <section
      className="section industries-section container"
      id="industries"
    >
      <div className="section-heading">
        <div>
          <Reveal className="eyebrow">
            CARE THAT FITS YOUR WORLD
          </Reveal>

          <Reveal as="h2" className="section-title">
            Big on care.
            <br />
            Built for <span className="highlight-word">business.</span>
          </Reveal>
        </div>

        <Reveal as="p" className="section-description">
          Different industries. Different needs.
          <br />
          The same attention to every detail.
        </Reveal>
      </div>

      <div className="industries-layout">
        <div
          className="industry-list"
          role="tablist"
          aria-label="Business sectors"
          aria-orientation="vertical"
        >
          {INDUSTRIES.map((industry, index) => {
            const ItemIcon = industry.icon;

            return (
              <button
                type="button"
                role="tab"
                key={industry.name}
                id={`industry-tab-${index}`}
                aria-selected={active === index}
                aria-controls="industry-panel"
                tabIndex={active === index ? 0 : -1}
                className={`industry-option ${
                  active === index ? "active" : ""
                }`}
                onClick={() => setActive(index)}
                onKeyDown={handleKey}
              >
                <ItemIcon size={22} />
                <span>{industry.name}</span>
                <ArrowUpRight size={19} />
              </button>
            );
          })}
        </div>

        <div
          className="industry-panel"
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="industry-panel-inner"
              initial={
                reduceMotion ? false : { opacity: 0, x: 14 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.3 }}
            >
              <div className="industry-panel-copy">
                <span className="industry-label">
                  <Icon size={15} />
                  {current.name}
                </span>

                <h3>{current.text}</h3>
                <p>{current.details}</p>

                <Link
                  to={`/contact?service=${encodeURIComponent(
                    current.service
                  )}`}
                  className="text-link"
                >
                  Let’s talk about your business
                  <ArrowUpRight size={17} />
                </Link>
              </div>

              <img
                src={current.image}
                alt={
                  active === 1
                    ? "Professionally prepared towels carried by hospitality staff"
                    : active === 3
                      ? "Commercial laundry equipment"
                      : "Fresh white hospitality linen"
                }
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="section clients-section" id="clients">
      <div className="container">
        <div className="section-heading">
          <div>
            <Reveal className="eyebrow">OUR CLIENTS</Reveal>

            <Reveal as="h2" className="section-title">
              Good care.
              <br />
              Great <span className="highlight-word">company.</span>
            </Reveal>
          </div>

          <Reveal as="p" className="section-description">
            Across hospitality, healthcare and industry,
            <br />
            we’re proud to be part of their everyday.
          </Reveal>
        </div>

        <div className="clients-grid">
          {CLIENTS.map((client, index) => (
            <Reveal
              key={client.name}
              delay={(index % 4) * 0.08}
            >
              <a
                className={`client-card ${
                  client.cardClass || ""
                }`}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${client.name} official website`}
              >
                <div className="client-logo">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className={client.className || ""}
                  />
                </div>

                <div className="client-meta">
                  <span>{client.sector}</span>
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <Link
              className="client-card client-invitation"
              to="/contact"
            >
              <span className="invite-star" aria-hidden="true">
                ✳
              </span>

              <h3>
                Your business.
                <br />
                Our next chapter.
              </h3>

              <div className="client-meta">
                <span>Let’s work together</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="cta-section container">
      <Reveal className="cta-inner">
        <span className="cta-decoration" aria-hidden="true">
          ✳
        </span>

        <div>
          <span className="eyebrow">
            A FRESH START, TOGETHER
          </span>
          <h2>
            Leave the laundry.
            <br />
            <span>Keep the peace of mind.</span>
          </h2>
        </div>

        <div className="cta-action">
          <p>
            Tell us what you need.
            <br />
            We’ll take it from there.
          </p>
          <MagneticLink
            to="/contact"
            className="button button-dark"
          >
            Let’s make it fresh <ArrowUpRight size={19} />
          </MagneticLink>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand inverted />
            <p>
              A fresh standard of care.
              <br />
              Made for your everyday.
            </p>
          </div>

          <div className="footer-column">
            <h3>EXPLORE</h3>
            <Link to="/#about">Our story</Link>
            <Link to="/#services">Our services</Link>
            <Link to="/#industries">For business</Link>
            <Link to="/#clients">Our clients</Link>
          </div>

          <div className="footer-column">
            <h3>LET’S CONNECT</h3>
            <a href="tel:+971508551051">{PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <Link to="/contact">
              Contact & enquiries <ArrowUpRight size={14} />
            </Link>
            <span>Dubai, United Arab Emirates</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Jai Tech Laundry.
          </span>
          <span>Thoughtfully cleaned. Beautifully finished.</span>
          <a
            href="#main"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
          >
            BACK TO TOP <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.utils.toArray(".parallax-image").forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, ref);

    const refresh = () => ScrollTrigger.refresh();
    const images = ref.current?.querySelectorAll("img") || [];

    images.forEach((image) =>
      image.addEventListener("load", refresh)
    );

    ScrollTrigger.refresh();

    return () => {
      images.forEach((image) =>
        image.removeEventListener("load", refresh)
      );
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <motion.main
      id="main"
      ref={ref}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Hero />
      <ClientStrip />
      <About />
      <Services />
      <Process />
      <Industries />
      <Clients />
      <CallToAction />
    </motion.main>
  );
}

function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service") || "";
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICE_NAMES.includes(requestedService)
      ? requestedService
      : "",
    message: "",
  });

  const [preparedLink, setPreparedLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    if (SERVICE_NAMES.includes(requestedService)) {
      setForm((current) => ({
        ...current,
        service: requestedService,
      }));
      setPreparedLink("");
      setError("");
    }
  }, [requestedService]);

  const reveal = {
    initial: {
      opacity: reduceMotion ? 1 : 0,
      y: reduceMotion ? 0 : 24,
    },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: EASE,
    },
  };

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setPreparedLink("");
    setError("");
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");
    setPreparedLink("");

    let whatsappTab = null;

    // Open synchronously so browsers can allow the new tab.
    try {
      whatsappTab = window.open("about:blank", "_blank");

      if (whatsappTab) {
        whatsappTab.opener = null;
        whatsappTab.document.title =
          "Preparing your WhatsApp enquiry";
        whatsappTab.document.body.textContent =
          "Preparing your WhatsApp enquiry…";
      }
    } catch {
      // The prepared link below remains available.
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      15000
    );

    try {
      const response = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(form).map(([key, value]) => [
              key,
              value.trim(),
            ])
          )
        ),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const details =
          data && typeof data === "object"
            ? Object.values(data)
                .flat()
                .filter((value) => typeof value === "string")
                .join(" ")
            : "";

        throw new Error(
          details ||
            "We couldn’t prepare your enquiry. Please try again."
        );
      }

      let url;

      try {
        url = new URL(data?.whatsapp_url);
      } catch {
        throw new Error(
          "We couldn’t prepare your WhatsApp link. Please try again."
        );
      }

      if (
        url.protocol !== "https:" ||
        url.hostname !== "api.whatsapp.com" ||
        url.pathname !== "/send"
      ) {
        throw new Error(
          "We couldn’t prepare your WhatsApp link. Please try again."
        );
      }

      setPreparedLink(url.href);

      if (whatsappTab && !whatsappTab.closed) {
        try {
          whatsappTab.location.replace(url.href);
        } catch {
          // The visitor can use the visible prepared link.
        }
      }
    } catch (failure) {
      if (whatsappTab && !whatsappTab.closed) {
        try {
          whatsappTab.close();
        } catch {
          // Continue showing the form error.
        }
      }

      setError(
        failure.name === "AbortError"
          ? "This is taking too long. Please try again."
          : failure instanceof TypeError
            ? "We couldn’t connect. Check your connection and try again."
            : failure.message ||
              "We couldn’t prepare your enquiry. Please try again."
      );
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  }

  return (
    <motion.main
      className="contact-page"
      id="main"
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <section
        className="contact-masthead container"
        aria-labelledby="contact-title"
      >
        <motion.div {...reveal}>
          <Link className="contact-back" to="/">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to home
          </Link>

          <div className="contact-eyebrow">
            <span />
            CONTACT JAI TECH
          </div>

          <h1 id="contact-title">
            Let’s make laundry <span>effortless.</span>
          </h1>
        </motion.div>

        <motion.div
          className="contact-masthead-note"
          {...reveal}
          transition={{
            ...reveal.transition,
            delay: reduceMotion ? 0 : 0.12,
          }}
        >
          <div
            className="contact-note-symbol"
            aria-hidden="true"
          >
            <Sparkles size={30} strokeWidth={1.4} />
          </div>

          <p>
            Good care starts with
            <br />
            a conversation.
          </p>

          <span>
            A wardrobe refresh or a laundry operation. Tell us what
            you need, and let’s find the right care.
          </span>
        </motion.div>
      </section>

      <section
        className="contact-layout container"
        aria-label="Get in touch"
      >
        <motion.div className="contact-form-card" {...reveal}>
          <div className="contact-card-top">
            <span className="contact-section-number">
              01 / YOUR ENQUIRY
            </span>
            <MessageCircle size={23} aria-hidden="true" />
          </div>

          <h2>
            A little detail.
            <br />
            A better conversation.
          </h2>

          <p className="contact-form-intro">
            Fill in the details below. We’ll prepare your message
            in WhatsApp so you can review it and send it directly
            to our team.
          </p>

          <form
            onSubmit={submitEnquiry}
            className="contact-enquiry-form"
            aria-busy={isSubmitting}
            aria-describedby={
              error ? "contact-form-error" : undefined
            }
          >
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Full name <span aria-hidden="true">*</span>
                </label>

                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  pattern={String.raw`.*\S.*`}
                  title="Enter your name."
                  maxLength={100}
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">
                  Phone number <span aria-hidden="true">*</span>
                </label>

                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField}
                  placeholder="+971"
                  autoComplete="tel"
                  required
                  pattern={String.raw`(?=(?:[^0-9]*[0-9]){6,15}[^0-9]*$)\+?[0-9\(\) .\-]{6,32}`}
                  title="Enter 6–15 digits. A leading +, spaces, parentheses, dots and hyphens are allowed."
                  maxLength={32}
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">
                  Email address
                  <span className="contact-optional">Optional</span>
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-field contact-select-field">
                <label htmlFor="contact-service">
                  Service <span aria-hidden="true">*</span>
                </label>

                <div className="contact-select-wrap">
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={updateField}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    {SERVICE_NAMES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={17} aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="contact-field contact-message-field">
              <label htmlFor="contact-message">
                Tell us a little more
                <span className="contact-optional">Optional</span>
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={updateField}
                placeholder="What would you like us to take care of? Include quantities or special requirements if you have them."
                rows={4}
                maxLength={2000}
                disabled={isSubmitting}
              />
            </div>

            <div className="contact-form-actions">
              <motion.button
                type="submit"
                className="contact-submit"
                disabled={isSubmitting}
                whileHover={
                  reduceMotion || isSubmitting
                    ? undefined
                    : { y: -2 }
                }
                whileTap={
                  reduceMotion || isSubmitting
                    ? undefined
                    : { scale: 0.98 }
                }
              >
                {isSubmitting
                  ? "Preparing your enquiry…"
                  : "Start on WhatsApp"}
                <ArrowUpRight size={20} aria-hidden="true" />
              </motion.button>
            </div>

            <p className="contact-form-note">
              Fields marked * are required. Review your enquiry
              in WhatsApp and tap Send to send it to our team.
            </p>

            {error && (
              <p
                id="contact-form-error"
                className="contact-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <div aria-live="polite" aria-atomic="true">
              {preparedLink && (
                <div className="contact-prepared">
                  <Check size={20} aria-hidden="true" />

                  <div>
                    <strong>Your enquiry is ready.</strong>
                    <p>
                      Review and send your message in WhatsApp.
                      If the new tab didn’t open,{" "}
                      <a
                        href={preparedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        open your prepared enquiry here{" "}
                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                        />
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </motion.div>

        <motion.aside
          className="contact-details"
          {...reveal}
          transition={{
            ...reveal.transition,
            delay: reduceMotion ? 0 : 0.1,
          }}
        >
          <div className="contact-direct-card">
            <span className="contact-section-number">
              02 / SAY HELLO
            </span>

            <h2>
              A human touch.
              <br />
              Every step of the way.
            </h2>

            <a
              className="contact-channel"
              href="tel:+971508551051"
            >
              <span className="contact-channel-icon">
                <Phone
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>

              <span>
                <small>CALL US</small>
                <strong>{PHONE}</strong>
              </span>

              <ArrowUpRight size={18} aria-hidden="true" />
            </a>

            <a
              className="contact-channel"
              href={`mailto:${EMAIL}`}
            >
              <span className="contact-channel-icon">
                <Mail
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>

              <span>
                <small>EMAIL US</small>
                <strong>{EMAIL}</strong>
              </span>

              <ArrowUpRight size={18} aria-hidden="true" />
            </a>

            <div className="contact-channel contact-location">
              <span className="contact-channel-icon">
                <MapPin
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </span>

              <span>
                <small>BASED IN</small>
                <strong>Dubai, United Arab Emirates</strong>
              </span>
            </div>
          </div>

          <div className="contact-image-card">
            <img
              src={IMAGES.linen}
              alt="Freshly folded linen, ready for careful laundry service"
              loading="lazy"
            />

            <span className="contact-image-badge">
              <span />
              CARE IN EVERY FOLD
            </span>

            <div className="contact-image-caption">
              <p>
                Fresh starts.
                <br />
                Thoughtful care.
              </p>
              <Sparkles
                size={26}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.aside>
      </section>

      <motion.section
        className="contact-faq container"
        {...reveal}
        aria-labelledby="contact-faq-title"
      >
        <div className="contact-faq-heading">
          <span className="contact-section-number">
            A FEW HELPFUL DETAILS
          </span>

          <h2 id="contact-faq-title">
            Before we
            <br />
            say hello.
          </h2>

          <p>A little clarity to help you get started.</p>
        </div>

        <div className="contact-faq-items">
          {QUESTIONS.map((item, index) => {
            const isOpen = openQuestion === index;

            return (
              <div
                className={`contact-faq-item${
                  isOpen ? " is-open" : ""
                }`}
                key={item.question}
              >
                <h3>
                  <button
                    type="button"
                    id={`contact-faq-question-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`contact-faq-answer-${index}`}
                    onClick={() =>
                      setOpenQuestion(isOpen ? null : index)
                    }
                  >
                    <span className="contact-faq-index">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                    <ChevronDown
                      size={21}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      id={`contact-faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`contact-faq-question-${index}`}
                      initial={{
                        height: reduceMotion ? "auto" : 0,
                        opacity: reduceMotion ? 1 : 0,
                      }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{
                        height: reduceMotion ? "auto" : 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.24,
                      }}
                      className="contact-faq-answer"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>
    </motion.main>
  );
}

function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">PAGE NOT FOUND</span>
      <h1>A fresh start?</h1>
      <p>
        This page isn’t here. Let’s get you back to our services.
      </p>
      <Link to="/" className="button button-lime">
        Back to home <ArrowRight size={18} />
      </Link>
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const lenis = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;

    const smooth = new Lenis({
      autoRaf: true,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });

    lenis.current = smooth;
    smooth.on("scroll", ScrollTrigger.update);

    return () => {
      smooth.destroy();
      lenis.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    document.title =
      location.pathname === "/contact"
        ? "Contact Jai Tech Laundry — Let’s make it fresh"
        : "Jai Tech Laundry — A fresh standard of care";

    if (!location.hash) {
      if (lenis.current) {
        lenis.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }

    const timer = window.setTimeout(() => {
      const target = location.hash
        ? document.getElementById(location.hash.slice(1))
        : null;

      if (target) {
        if (lenis.current) {
          lenis.current.scrollTo(target, { offset: -110 });
        } else {
          target.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
          });
        }
      }

      ScrollTrigger.refresh();
    }, 400);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, reduceMotion]);

  return (
    <>
      <Navigation />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <a
        className="whatsapp-float"
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Jai Tech Laundry on WhatsApp"
      >
        <MessageCircle size={24} />
        <span>LET’S CHAT</span>
      </a>
    </>
  );
}