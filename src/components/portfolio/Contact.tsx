import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { Reveal, SectionHeader } from "./Reveal";
import { Mail, MapPin, Linkedin, Check, Send, AlertCircle } from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError(
        "Contact form isn't configured yet — email me directly at the address below instead.",
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(formRef.current);
      const nameVal = (formData.get("name") as string) || "";
      const emailVal = (formData.get("email") as string) || "";
      const messageVal = (formData.get("message") as string) || "";

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: nameVal,
          from_name: nameVal,
          email: emailVal,
          from_email: emailVal,
          reply_to: emailVal,
          to_email: "amrokfarajallah@gmail.com",
          to_name: "Amro",
          recipient: "amrokfarajallah@gmail.com",
          message: messageVal,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS send error:", err);
      setError(
        "Something went wrong sending that — email me directly at amrokfarajallah@gmail.com instead.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 mesh-bg opacity-20 blur-3xl pointer-events-none"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader index="06" label="Contact" title="Got a project? Let's talk." />

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-14">
          <Reveal>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-pretty text-muted-foreground max-w-md leading-relaxed">
                Whether it's a system that needs building, a workflow that needs automating, or an
                idea you can't get out of your head — I'm listening.
              </p>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <a
                  href="mailto:amrokfarajallah@gmail.com"
                  className="flex items-center gap-2.5 text-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-foreground shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  amrokfarajallah@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/amr0kf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-foreground shrink-0">
                    <Linkedin className="w-3.5 h-3.5" />
                  </span>
                  linkedin.com/in/amr0kf
                </a>
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <span className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Beirut, Lebanon 🇱🇧
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              ref={formRef}
              onSubmit={submit}
              className="border border-border/80 bg-card rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10 sm:py-14"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="w-14 h-14 rounded-full bg-surface-hi border border-border flex items-center justify-center mb-4"
                    >
                      <Check className="w-6 h-6 text-foreground" />
                    </motion.div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-border bg-foreground/5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Direct Transmission Confirmed
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium mb-2">
                      Message landed.
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
                      Your note was delivered directly to my inbox at{" "}
                      <span className="text-foreground font-mono">amrokfarajallah@gmail.com</span>.
                      I personally review all incoming inquiries and will follow up shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground underline transition-colors"
                    >
                      Send another note →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Field label="Name" name="name" placeholder="Your name" />
                    <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
                    <Field
                      label="Message"
                      name="message"
                      placeholder="Tell me about the project..."
                      textarea
                    />
                    {error && (
                      <p className="flex items-start gap-2 text-xs sm:text-sm text-destructive">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send message"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>

        <footer className="mt-14 md:mt-24 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-muted-foreground">
          <span>© 2026 Amro — Built in Beirut.</span>
          <span>Let's build something.</span>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const common =
    "w-full bg-transparent border-b border-border focus:border-foreground outline-none py-3 text-foreground placeholder:text-muted-foreground/60 transition-colors";
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={4} className={common} required />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={common} required />
      )}
    </label>
  );
}
