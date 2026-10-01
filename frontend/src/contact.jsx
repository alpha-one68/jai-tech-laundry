import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import "./page.css";

const SERVICES = ["Wash & Fold", "Dry Cleaning", "Commercial Laundry", "Garment Care", "Linen Care", "Uniform Care"];
const PHONE = "+971 50 855 1051";
const EMAIL = "jaitechl3259@gmail.com";
const ENQUIRY_API =
  import.meta.env.VITE_ENQUIRY_API_URL ||
  "http://127.0.0.1:8000/enquiry/";
const QUESTIONS = [
  {
    question: "How do I request a quote?",
    answer: "Choose the service you need and tell us about your items. The enquiry form prepares a WhatsApp message for you to review and send. Our team can then discuss your requirements and pricing with you.",
  },
  {
    question: "Can I enquire about laundry for my business?",
    answer: "Yes. Select Commercial Laundry and share your business type, the items you need cared for, and your approximate laundry volume. You can also enquire about linen and uniform care.",
  },
  {
    question: "What details should I include?",
    answer: "A description of your garments or linen, approximate quantities, fabric details, and any particular care requirements are helpful. If you have a preferred timeframe, include that so the team can discuss availability with you.",
  },
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service") || "";
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: SERVICES.includes(requestedService) ? requestedService : "", message: "" });
  const [preparedLink, setPreparedLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (SERVICES.includes(requestedService)) {
      setForm((current) => ({ ...current, service: requestedService }));
      setPreparedLink("");
      setError("");
    }
  }, [requestedService]);

  const reveal = {
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
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

    // Open during the click so the browser can allow the new tab.
    const whatsappTab = window.open("about:blank", "_blank");
    if (whatsappTab) {
      whatsappTab.opener = null;
      whatsappTab.document.title = "Preparing your WhatsApp enquiry";
      whatsappTab.document.body.textContent = "Preparing your WhatsApp enquiry…";
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(
          Object.entries(form).map(([key, value]) => [key, value.trim()]),
        )),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const details = data && typeof data === "object"
          ? Object.values(data).flat().filter((value) => typeof value === "string").join(" ")
          : "";
        throw new Error(details || "We couldn’t prepare your enquiry. Please try again.");
      }

      let url;
      try {
        url = new URL(data?.whatsapp_url);
      } catch {
        throw new Error("We couldn’t prepare your WhatsApp link. Please try again.");
      }
      if (url.protocol !== "https:" || url.hostname !== "api.whatsapp.com" || url.pathname !== "/send") {
        throw new Error("We couldn’t prepare your WhatsApp link. Please try again.");
      }

      setPreparedLink(url.href);
      // The visible link also works when the popup is blocked or closed.
      if (whatsappTab && !whatsappTab.closed) {
        try { whatsappTab.location.replace(url.href); } catch { /* Use the visible link. */ }
      }
    } catch (failure) {
      if (whatsappTab && !whatsappTab.closed) whatsappTab.close();
      setError(failure.name === "AbortError"
        ? "This is taking too long. Please try again."
        : failure instanceof TypeError
          ? "We couldn’t connect. Check your connection and try again."
          : failure.message || "We couldn’t prepare your enquiry. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  }

  return (
    <motion.main className="contact-page" id="main" tabIndex={-1} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <section className="contact-masthead container" aria-labelledby="contact-title">
        <motion.div {...reveal}>
          <Link className="contact-back" to="/"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
          <div className="contact-eyebrow"><span /> CONTACT JAI TECH</div>
          <h1 id="contact-title">Let’s make laundry <span>effortless.</span></h1>
        </motion.div>
        <motion.div className="contact-masthead-note" {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.12 }}>
          <div className="contact-note-symbol" aria-hidden="true"><Sparkles size={30} strokeWidth={1.4} /></div>
          <p>Good care starts with<br />a conversation.</p>
          <span>A wardrobe refresh or a laundry operation. Tell us what you need, and let’s find the right care.</span>
        </motion.div>
      </section>

      <section className="contact-layout container" aria-label="Get in touch">
        <motion.div className="contact-form-card" {...reveal}>
          <div className="contact-card-top"><span className="contact-section-number">01 / YOUR ENQUIRY</span><MessageCircle size={23} aria-hidden="true" /></div>
          <h2>A little detail.<br />A better conversation.</h2>
          <p className="contact-form-intro">Fill in the details below. We’ll prepare your message in WhatsApp so you can review it and send it directly to our team.</p>

          <form onSubmit={submitEnquiry} className="contact-enquiry-form" aria-busy={isSubmitting} aria-describedby={error ? "contact-form-error" : undefined}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">Full name <span aria-hidden="true">*</span></label>
                <input id="contact-name" name="name" value={form.name} onChange={updateField} placeholder="Your name" autoComplete="name" required pattern={String.raw`.*\S.*`} title="Enter your name." maxLength={100} disabled={isSubmitting} />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-phone">Phone number <span aria-hidden="true">*</span></label>
                <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="+971" autoComplete="tel" required pattern={String.raw`(?=(?:[^0-9]*[0-9]){6,15}[^0-9]*$)\+?[0-9\(\) .\-]{6,32}`} title="Enter 6–15 digits. A leading +, spaces, parentheses, dots and hyphens are allowed." maxLength={32} disabled={isSubmitting} />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email address <span className="contact-optional">Optional</span></label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" maxLength={254} disabled={isSubmitting} />
              </div>
              <div className="contact-field contact-select-field">
                <label htmlFor="contact-service">Service <span aria-hidden="true">*</span></label>
                <div className="contact-select-wrap">
                  <select id="contact-service" name="service" value={form.service} onChange={updateField} required disabled={isSubmitting}>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                  <ChevronDown size={17} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="contact-field contact-message-field">
              <label htmlFor="contact-message">Tell us a little more <span className="contact-optional">Optional</span></label>
              <textarea id="contact-message" name="message" value={form.message} onChange={updateField} placeholder="What would you like us to take care of? Include quantities or special requirements if you have them." rows={4} maxLength={2000} disabled={isSubmitting} />
            </div>
            <div className="contact-form-actions">
              <motion.button type="submit" className="contact-submit" disabled={isSubmitting} whileHover={reduceMotion || isSubmitting ? undefined : { y: -2 }} whileTap={reduceMotion || isSubmitting ? undefined : { scale: 0.98 }}>
                {isSubmitting ? "Preparing your enquiry…" : "Start on WhatsApp"} <ArrowUpRight size={20} aria-hidden="true" />
              </motion.button>
            </div>
            <p className="contact-form-note">Fields marked * are required. Review your enquiry in WhatsApp and tap Send to send it to our team.</p>
            {error && <p id="contact-form-error" className="contact-error" role="alert">{error}</p>}
            <div aria-live="polite" aria-atomic="true">
              {preparedLink && <div className="contact-prepared"><Check size={20} aria-hidden="true" /><div><strong>Your enquiry is ready.</strong><p>Review and send your message in WhatsApp. If the new tab didn’t open, <a href={preparedLink} target="_blank" rel="noopener noreferrer">open your prepared enquiry here <ArrowUpRight size={13} aria-hidden="true" /></a>.</p></div></div>}
            </div>
          </form>
        </motion.div>

        <motion.aside className="contact-details" {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.1 }}>
          <div className="contact-direct-card">
            <span className="contact-section-number">02 / SAY HELLO</span>
            <h2>A human touch.<br />Every step of the way.</h2>
            <a className="contact-channel" href="tel:+971508551051"><span className="contact-channel-icon"><Phone size={20} strokeWidth={1.7} aria-hidden="true" /></span><span><small>CALL US</small><strong>{PHONE}</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="contact-channel" href={`mailto:${EMAIL}`}><span className="contact-channel-icon"><Mail size={20} strokeWidth={1.7} aria-hidden="true" /></span><span><small>EMAIL US</small><strong>{EMAIL}</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
            <div className="contact-channel contact-location"><span className="contact-channel-icon"><MapPin size={20} strokeWidth={1.7} aria-hidden="true" /></span><span><small>BASED IN</small><strong>Dubai, United Arab Emirates</strong></span></div>
          </div>
          <div className="contact-image-card">
            <img src="/images/linen.jpg" alt="Freshly folded linen, ready for careful laundry service" loading="lazy" />
            <span className="contact-image-badge"><span /> CARE IN EVERY FOLD</span>
            <div className="contact-image-caption"><p>Fresh starts.<br />Thoughtful care.</p><Sparkles size={26} strokeWidth={1.5} aria-hidden="true" /></div>
          </div>
        </motion.aside>
      </section>

      <motion.section className="contact-faq container" {...reveal} aria-labelledby="contact-faq-title">
        <div className="contact-faq-heading"><span className="contact-section-number">A FEW HELPFUL DETAILS</span><h2 id="contact-faq-title">Before we<br />say hello.</h2><p>A little clarity to help you get started.</p></div>
        <div className="contact-faq-items">
          {QUESTIONS.map((item, index) => {
            const isOpen = openQuestion === index;
            return <div className={`contact-faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
              <h3><button type="button" id={`contact-faq-question-${index}`} aria-expanded={isOpen} aria-controls={`contact-faq-answer-${index}`} onClick={() => setOpenQuestion(isOpen ? null : index)}><span className="contact-faq-index">0{index + 1}</span><span>{item.question}</span><ChevronDown size={21} aria-hidden="true" /></button></h3>
              <AnimatePresence initial={false}>
                {isOpen && <motion.div key="answer" id={`contact-faq-answer-${index}`} role="region" aria-labelledby={`contact-faq-question-${index}`} initial={{ height: reduceMotion ? "auto" : 0, opacity: reduceMotion ? 1 : 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reduceMotion ? "auto" : 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.24 }} className="contact-faq-answer"><p>{item.answer}</p></motion.div>}
              </AnimatePresence>
            </div>;
          })}
        </div>
      </motion.section>
    </motion.main>
  );
}
