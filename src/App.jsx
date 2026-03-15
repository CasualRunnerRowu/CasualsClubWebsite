import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown,
  MessageCircle,
  Instagram,
  Mail,
  Handshake,
  Send,
  Users,
  Music,
  Zap,
  Heart,
} from 'lucide-react'

/* ────────────────────── animation helpers ────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────── parallax image ──────────────────────── */
function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="h-[112%] w-full object-cover" />
    </div>
  )
}

/* ───────────────────── culture card ──────────────────────── */
function CultureCard({ icon: Icon, title, desc, src, delay = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-shadow hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-white backdrop-blur-sm">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold tracking-wide">{title}</span>
            </div>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-asphalt/60">{desc}</p>
        </div>
      </div>
    </Reveal>
  )
}

/* ───────────────────── event moment card ─────────────────── */
function MomentCard({ src, label, caption, delay = 0 }) {
  return (
    <Reveal delay={delay} className="group">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-black/[0.04]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={src}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="px-5 py-4">
          <p className="font-heading text-base font-bold text-asphalt">{label}</p>
          <p className="mt-1 text-sm text-asphalt/50">{caption}</p>
        </div>
      </div>
    </Reveal>
  )
}

/* ═══════════════════════════ APP ═════════════════════════ */
export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-cloud overflow-x-hidden">

      {/* ━━━━━━━━━━━━━━━━━━ NAV ━━━━━━━━━━━━━━━━━━ */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Casuals Club" className="h-8 w-8 rounded-full object-contain" />
            <span className={`font-heading text-[15px] font-bold tracking-wide transition-colors duration-500 ${scrolled ? 'text-asphalt' : 'text-white'}`}>
              CASUALS CLUB
            </span>
          </a>

          <div className={`hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.18em] lg:flex transition-colors duration-500 ${scrolled ? 'text-asphalt/50' : 'text-white/65'}`}>
            <a href="#story" className={`transition-colors ${scrolled ? 'hover:text-asphalt' : 'hover:text-white'}`}>Story</a>
            <a href="#culture" className={`transition-colors ${scrolled ? 'hover:text-asphalt' : 'hover:text-white'}`}>Culture</a>
            <a href="#events" className={`transition-colors ${scrolled ? 'hover:text-asphalt' : 'hover:text-white'}`}>Events</a>
            <a href="#join" className={`transition-colors ${scrolled ? 'hover:text-asphalt' : 'hover:text-white'}`}>Join</a>
          </div>

          <a
            href="#join"
            className={`rounded-full border px-5 py-2 text-[12px] font-semibold tracking-wide transition-all duration-500 ${
              scrolled
                ? 'border-asphalt/15 text-asphalt hover:bg-asphalt hover:text-white'
                : 'border-white/25 text-white hover:bg-white hover:text-asphalt'
            }`}
          >
            Join the Club
          </a>
        </div>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-asphalt">
        <motion.img
          src="/hero.png"
          alt="Runners in motion"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-20 pt-32 text-center sm:px-8 lg:px-10">
          <motion.img
            src="/logo.png"
            alt="Casuals Club"
            className="mb-6 h-16 w-16 rounded-full object-contain shadow-2xl sm:h-20 sm:w-20"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          />
          <motion.h1
            className="font-heading text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-tight text-white"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            CASUALS<br />CLUB
          </motion.h1>
          <motion.p
            className="mt-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            Movement &middot; Music &middot; Connection
          </motion.p>
          <motion.p
            className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            A community-driven social club for people who want to stay active, meet new people, and build something real together.
          </motion.p>
        </div>

        <motion.a
          href="#story"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ STORY (split) ━━━━━━━━━━━━━━━━━━ */}
      <section id="story" className="bg-cloud lg:py-0">
        <div className="grid min-h-[85svh] grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[50vh] lg:min-h-full">
            <ParallaxImage src="/run-night.png" alt="Night run" className="absolute inset-0 h-full" />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          <div className="flex items-center px-6 py-16 sm:px-10 md:px-14 lg:px-16 xl:px-20 lg:py-24">
            <div className="max-w-lg">
              <Reveal>
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta">
                  Our Story
                </span>
              </Reveal>
              <Reveal delay={1}>
                <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.08] text-asphalt sm:text-4xl lg:text-5xl">
                  Built for people who wanted{' '}
                  <span className="text-casual-blue">more than a run group.</span>
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 text-base leading-7 text-asphalt/55 sm:text-[17px] sm:leading-8">
                  The city already had running culture. What was missing was something younger, more social, and less competitive — a space for movement, music, community, and genuine connection all in the same place.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <p className="mt-4 text-base leading-7 text-asphalt/45 sm:text-[17px] sm:leading-8">
                  Weekly runs keep the rhythm. Monthly events turn that rhythm into something bigger — a healthier version of a social where people move together, meet new faces, and stay for the atmosphere.
                </p>
              </Reveal>
              <Reveal delay={4}>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    { stat: 'Open Pace', sub: 'Run, jog, or walk.' },
                    { stat: 'Weekly', sub: 'Consistent rhythm.' },
                    { stat: 'Monthly', sub: 'Culture events.' },
                  ].map((item) => (
                    <div key={item.stat} className="rounded-2xl border border-black/[0.05] bg-white p-4 shadow-sm">
                      <p className="font-heading text-sm font-bold text-asphalt">{item.stat}</p>
                      <p className="mt-1 text-xs text-asphalt/45">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ CULTURE ━━━━━━━━━━━━━━━━━━ */}
      <section id="culture" className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta">
                Culture
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-asphalt sm:text-4xl lg:text-5xl">
                More than cardio — it's a whole social atmosphere.
              </h2>
              <p className="mt-5 text-base leading-7 text-asphalt/50 sm:text-[17px] sm:leading-8">
                Movement is the entry point. Connection, music, networking, and community are the reason people stay.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <CultureCard
              icon={Users}
              title="Movement"
              desc="A casual pace, a welcoming crowd, and room for runners, walkers, and first-timers. Showing up is what matters."
              src="/run-night.png"
              delay={0}
            />
            <CultureCard
              icon={Music}
              title="Music"
              desc="DJs, playlists, and daytime energy that make every meetup feel social from the moment it starts."
              src="/meetup-party.jpg"
              delay={1}
            />
            <CultureCard
              icon={Zap}
              title="Networking"
              desc="Conversations after the run, new faces every week, and real connections that keep growing."
              src="/coffee-shoes.png"
              delay={2}
            />
            <CultureCard
              icon={Heart}
              title="Community"
              desc="A healthier social scene built around genuine connection, local support, and shared energy."
              src="/night-crew.png"
              delay={3}
            />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ INTERSTITIAL ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <ParallaxImage src="/group-run.png" alt="Group run" className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Running is just the
              <span className="text-casual-blue"> starting point</span>.
              The real magic is the people you meet and the culture you build.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ EVENTS ━━━━━━━━━━━━━━━━━━ */}
      <section id="events" className="bg-cloud py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-terracotta">
                  Events
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-asphalt sm:text-4xl lg:text-5xl">
                  Once a month, the run becomes a full experience.
                </h2>
                <p className="mt-5 text-base leading-7 text-asphalt/50 sm:text-[17px] sm:leading-8">
                  The weekly run is the foundation. The monthly event is where the wider culture shows up — music, vendors, post-run connection, and an atmosphere that feels active and energizing.
                </p>
                <div className="mt-8 rounded-2xl border border-black/[0.05] bg-white p-6 shadow-sm">
                  <p className="font-heading text-xl font-bold text-asphalt">Next up: May 3rd</p>
                  <p className="mt-2 text-sm leading-6 text-asphalt/50">
                    A casual 5K, music, local vendors, and the kind of post-run atmosphere that keeps people staying longer.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 rounded-full bg-asphalt px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-asphalt-light"
                  >
                    RSVP for May 3rd
                  </motion.button>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <MomentCard src="/meetup-unity.jpg" label="Arrival" caption="Music starts, energy builds." delay={0} />
              <MomentCard src="/meetup-hangout.jpg" label="Run Together" caption="Open pace, shared energy." delay={1} />
              <MomentCard src="/meetup-dj.jpg" label="The Atmosphere" caption="DJs, vendors, community." delay={2} />
              <MomentCard src="/meetup-social.jpg" label="Stay After" caption="Where real connection happens." delay={3} />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ JOIN ━━━━━━━━━━━━━━━━━━ */}
      <section id="join" className="relative overflow-hidden py-24 sm:py-28 lg:py-36">
        <div className="absolute inset-0">
          <img src="/meetup-unity.jpg" alt="Community" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-asphalt/82" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-casual-blue">
                Join
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                A healthier social scene starts with one Saturday.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/50 sm:text-[17px]">
                Movement, music, new people, and a community that actually wants you there.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <motion.a
                href="#"
                whileHover={{ y: -4 }}
                className="group block rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md transition-all hover:border-white/20 sm:p-7"
              >
                <MessageCircle className="mb-4 h-7 w-7 text-casual-blue" />
                <h3 className="font-heading text-lg font-bold text-white">Join the Chat</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  Routes, reminders, and the easiest way to meet the crew.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-casual-blue transition-all group-hover:tracking-wider">
                  Open WhatsApp →
                </span>
              </motion.a>
            </Reveal>

            <Reveal delay={1}>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group block rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md transition-all hover:border-white/20 sm:p-7"
              >
                <Instagram className="mb-4 h-7 w-7 text-terracotta" />
                <h3 className="font-heading text-lg font-bold text-white">Follow the Culture</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  Weekly recaps, event photos, and the people behind the movement.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-terracotta transition-all group-hover:tracking-wider">
                  @casualsclub →
                </span>
              </motion.a>
            </Reveal>

            <Reveal delay={2}>
              <div className="rounded-2xl border border-casual-blue/20 bg-casual-blue/[0.12] p-6 backdrop-blur-md sm:col-span-2 sm:p-7 lg:col-span-1">
                <Mail className="mb-4 h-7 w-7 text-casual-blue" />
                <h3 className="font-heading text-lg font-bold text-white">Stay in the Loop</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  Event drops, updates, and collabs — straight to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="min-w-0 flex-1 rounded-xl border border-white/12 bg-white/8 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-casual-blue/50 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-casual-blue px-4 py-2.5 text-white transition-colors hover:bg-casual-blue-dark"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </form>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-casual-blue"
                  >
                    You're in. Welcome to the club.
                  </motion.p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ PARTNER ━━━━━━━━━━━━━━━━━━ */}
      <section id="partner" className="bg-cloud py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
              <Handshake className="h-7 w-7" />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-6 font-heading text-3xl font-bold text-asphalt sm:text-4xl">
              Build With the Community
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-asphalt/50 sm:text-[17px]">
              Local vendors, DJs, artists, and community brands all have a place here. If you want to shape the atmosphere, let's build something together.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <motion.a
              href="mailto:hello@casualsclub.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:brightness-110"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-asphalt py-12 text-white sm:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-6 border-b border-white/[0.06] pb-8 md:flex-row">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Casuals Club" className="h-7 w-7 rounded-full object-contain" />
              <div>
                <p className="font-heading text-sm font-bold tracking-wide">CASUALS CLUB</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Movement &middot; Music &middot; Connection</p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-white/35">
              <a href="https://instagram.com" className="transition-colors hover:text-casual-blue"><Instagram className="h-[18px] w-[18px]" /></a>
              <a href="#" className="transition-colors hover:text-casual-blue"><MessageCircle className="h-[18px] w-[18px]" /></a>
              <a href="mailto:hello@casualsclub.com" className="transition-colors hover:text-casual-blue"><Mail className="h-[18px] w-[18px]" /></a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/22 md:flex-row">
            <p>© 2026 Casuals Club. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#story" className="transition-colors hover:text-white/45">Story</a>
              <a href="#culture" className="transition-colors hover:text-white/45">Culture</a>
              <a href="#events" className="transition-colors hover:text-white/45">Events</a>
              <a href="#join" className="transition-colors hover:text-white/45">Join</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
