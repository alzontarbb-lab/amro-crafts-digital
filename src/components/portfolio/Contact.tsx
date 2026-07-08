import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, SectionHeader } from "./Reveal";
import { Mail, MapPin, Linkedin, Check, Send } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 mesh-bg opacity-30 blur-3xl pointer-events-none"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeader index="06" label="Contact" title="Got a project? Let's talk." />

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          <Reveal>
            <div className="space-y-8">
              <p className="text-xl text-pretty text-muted-foreground max-w-md">
                Whether it's a system that needs building, a workflow that needs automating, or an
                idea you can't get out of your head — I'm listening.
              </p>

              <div className="space-y-4 font-mono text-sm">
                <a
                  href="mailto:hello@amro.dev"
                  className="flex items-center gap-3 text-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full glass flex items-center justify-center group-hover:border-foreground">
                    <Mail className="w-4 h-4" />
                  </span>
                  amrokfarajallah@gmail.com
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full glass flex items-center justify-center group-hover:border-foreground">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  linkedin.com/in/amro
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-9 h-9 rounded-full glass flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </span>
                  Beirut, Lebanon 🇱🇧
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="w-16 h-16 rounded-full bg-foreground border border-foreground flex items-center justify-center mb-6"
                    >
                      <Check className="w-7 h-7 text-background" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-medium mb-2">Message sent.</h3>
                    <p className="text-muted-foreground">I'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <Field label="Name" name="name" placeholder="Your name" />
                    <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
                    <Field
                      label="Message"
                      name="message"
                      placeholder="Tell me about the project..."
                      textarea
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground hover:text-primary-foreground transition-colors disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send message"}
                      <Send className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>

        <footer className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
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
