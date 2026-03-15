import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
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
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import secondImage from '../websiteImages/secondimage.jpg'

/* ────────────────────── spring configs ───────────────────── */
const spring = { type: 'spring', stiffness: 300, damping: 24 }
const gentleSpring = { type: 'spring', stiffness: 180, damping: 22 }

/* ────────────────────── animation variants ───────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}
const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}
const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

/* ────────────────────── scroll progress bar ──────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-casual-blue origin-left pointer-events-none"
      style={{ scaleX }}
    />
  )
}

/* ────────────────────── Reveal ────────────────────────────── */
function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = direction === 'left' ? fadeLeft
    : direction === 'right' ? fadeRight
    : direction === 'scale' ? scaleIn
    : fadeUp
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ────────────────────── TiltCard ──────────────────────────── */
function TiltCard({ children, className = '', intensity = 7 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 280, damping: 28 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 280, damping: 28 })
  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { x.set(0); y.set(0) }
  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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

/* ───────────── wrapper: centers content at all widths ────── */
function Container({ className = '', children, size = 'default' }) {
  const maxW = size === 'narrow' ? 'max-w-5xl' : size === 'wide' ? 'max-w-[1400px]' : 'max-w-7xl'
  return (
    <div className={`mx-auto w-full ${maxW} px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  )
}

/* ───────────────────── polaroid card ─────────────────────── */
function Polaroid({ src, label, caption, icon: Icon, delay = 0, rotate = 0 }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard className="h-full" intensity={5}>
        <motion.div
          whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
          className="group h-full cursor-default"
          style={{ rotate: `${rotate}deg` }}
        >
          <Card className="h-full overflow-hidden border-none bg-white p-3 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500 rounded-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-asphalt/5">
              <motion.img
                src={src}
                alt={label}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              {Icon && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur-md border-none">
                    <Icon className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold tracking-wide">{label}</span>
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="px-1 pt-3 pb-1 sm:px-1 sm:pt-4 sm:pb-2">
              <p className="font-heading text-sm font-bold text-asphalt sm:text-base">{label}</p>
              {caption && <p className="mt-1 text-xs text-asphalt/45 sm:text-sm">{caption}</p>}
            </CardContent>
          </Card>
        </motion.div>
      </TiltCard>
    </Reveal>
  )
}

/* ═══════════════════════════ APP ═════════════════════════ */
export default function App() {
  // Google Forms config - replace these after creating your form
  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'
  const GOOGLE_FORM_EMAIL_ENTRY = 'entry.123456789' // Replace with your actual entry ID

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    // Submit to Google Forms
    const formData = new FormData()
    formData.append(GOOGLE_FORM_EMAIL_ENTRY, email)

    try {
      // Google Forms doesn't allow CORS, so we use no-cors mode
      // This means we won't get a response, but the submission will work
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      })
    } catch (err) {
      console.error('Form submission error:', err)
    }

    // Show success message regardless (no-cors prevents us from checking response)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-cloud overflow-x-hidden">
      <ScrollProgress />

      {/* ━━━━━━━━━━━━━━━━━━ NAV ━━━━━━━━━━━━━━━━━━ */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between py-4">
            <motion.a href="#" className="flex items-center gap-2.5"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring}
            >
              <motion.img src="/logo.png" alt="Casuals Club" className="h-8 w-8 object-contain"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className={`font-heading text-[15px] font-bold tracking-wide transition-colors duration-500 ${scrolled ? 'text-asphalt' : 'text-white'}`}>
                CASUALS CLUB
              </span>
            </motion.a>

            <div className={`hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.18em] lg:flex transition-colors duration-500 ${scrolled ? 'text-asphalt/50' : 'text-white/65'}`}>
              {['Story', 'Events', 'Culture', 'Join'].map((item) => (
                <motion.a key={item} href={`#${item.toLowerCase()}`} className="relative py-0.5"
                  whileHover={{ color: scrolled ? 'rgb(30,30,30)' : 'rgb(255,255,255)' }}
                >
                  {item}
                  <motion.span
                    className={`absolute bottom-0 left-0 h-px w-full ${scrolled ? 'bg-asphalt' : 'bg-white'}`}
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={spring}>
              <Button
                variant="outline"
                size="lg"
                render={<a href="#join" />}
                className={`rounded-full text-[12px] font-semibold tracking-wide transition-all duration-500 ${
                  scrolled
                    ? 'border-asphalt/15 text-asphalt hover:bg-asphalt hover:text-white'
                    : 'border-white/25 bg-transparent text-white hover:bg-white hover:text-asphalt'
                }`}
              >
                Join the Club
              </Button>
            </motion.div>
          </div>
        </Container>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-asphalt">
        <motion.img
          src="/hero.png"
          alt="Runners in motion"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />

        <Container className="relative z-10 flex flex-col items-center pb-20 pt-32 text-center">
          <motion.img
            src="/logo.png"
            alt="Casuals Club"
            className="mb-6 h-16 w-16 object-contain sm:h-20 sm:w-20"
            initial={{ opacity: 0, scale: 0.75, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* staggered line reveal */}
          {['CASUALS', 'CLUB'].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                className="font-heading text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-tight text-white"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.28 + i * 0.13, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.div>
            </div>
          ))}

          <motion.p
            className="mt-5 text-[11px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.8 }}
          >
            Movement &middot; Music &middot; Connection
          </motion.p>
          <motion.p
            className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            A community-driven social club for people who want to stay active, meet new people, and build something real together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.98, duration: 0.7 }}
          >
            <motion.a
              href="#story"
              whileHover={{ y: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className="mt-10 inline-flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ STORY (split) ━━━━━━━━━━━━━━━━━━ */}
      <section id="story" className="bg-cloud">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid min-h-[85svh] grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[50vh] lg:min-h-full">
              <ParallaxImage src={secondImage} alt="Night run" className="absolute inset-0 h-full" />
              <div className="absolute inset-0 bg-black/15" />
            </div>

            <div className="flex items-center px-6 py-16 sm:px-10 md:px-14 lg:px-16 xl:px-20 2xl:px-24 lg:py-24">
              <div className="max-w-lg">
                <Reveal direction="right">
                  <Badge variant="secondary" className="rounded-full bg-terracotta/10 text-terracotta border-none font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-3 py-1">
                    Our Story
                  </Badge>
                </Reveal>
                <Reveal delay={1} direction="right">
                  <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.08] text-asphalt sm:text-4xl lg:text-5xl">
                    Built for people who wanted{' '}
                    <span className="text-casual-blue">more than a run group.</span>
                  </h2>
                </Reveal>
                <Reveal delay={2} direction="right">
                  <p className="mt-6 text-base leading-7 text-asphalt/55 sm:text-[17px] sm:leading-8">
                    The city already had running culture. What was missing was something younger, more social, and less competitive, a space for movement, music, community, and genuine connection all in the same place.
                  </p>
                </Reveal>
                <Reveal delay={3} direction="right">
                  <p className="mt-4 text-base leading-7 text-asphalt/45 sm:text-[17px] sm:leading-8">
                    Weekly runs keep the rhythm. Monthly events turn that rhythm into something bigger, creating a healthier version of a social where people move together, meet new faces, and stay for the atmosphere.
                  </p>
                </Reveal>
                <Reveal delay={4} direction="right">
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {[
                      { stat: 'Weekend Socials', sub: 'Hangouts beyond the run.' },
                      { stat: 'Special Events', sub: 'Pop-ups, DJs, and parties.' },
                      { stat: 'Open Pace', sub: 'All paces welcome.' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.stat}
                        whileHover={{ y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={spring}
                      >
                        <Card className="border-none bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-0 h-full">
                          <CardContent className="p-4">
                            <p className="font-heading text-sm font-bold text-asphalt">{item.stat}</p>
                            <p className="mt-1 text-xs text-asphalt/45">{item.sub}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ EVENTS ━━━━━━━━━━━━━━━━━━ */}
      <section id="events" className="bg-cloud py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Badge variant="secondary" className="rounded-full bg-terracotta/10 text-terracotta border-none font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-3 py-1">
                  Events
                </Badge>
                <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-asphalt sm:text-4xl lg:text-5xl">
                  Once a month, the run becomes a full experience.
                </h2>
                <p className="mt-5 text-base leading-7 text-asphalt/50 sm:text-[17px] sm:leading-8">
                  The weekly run is the foundation. The monthly event is where the wider culture shows up, music, vendors, post-run connection, and an atmosphere that feels active and energizing.
                </p>

                <motion.div whileHover={{ scale: 1.01 }} transition={gentleSpring}>
                  <Card className="mt-8 border-none bg-white shadow-sm rounded-2xl p-0">
                    <CardContent className="p-6 sm:p-7">
                      <p className="font-heading text-xl font-bold text-asphalt">Next up: May 3rd</p>
                      <p className="mt-2 text-sm leading-6 text-asphalt/50">
                        A casual 5K, music, local vendors, and the kind of post-run atmosphere that keeps people staying longer.
                      </p>
                      <Button
                        size="lg"
                        disabled
                        className="mt-6 rounded-full bg-asphalt/20 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-asphalt/40 cursor-not-allowed border border-asphalt/10 gap-2"
                      >
                        <Clock className="h-3.5 w-3.5" />
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <Polaroid src="/meetup-unity.jpg" label="Arrival" caption="Music starts, energy builds." delay={0} rotate={-1.5} />
              <Polaroid src="/meetup-hangout.jpg" label="Run Together" caption="Open pace, shared energy." delay={1} rotate={1} />
              <Polaroid src="/meetup-dj.jpg" label="The Atmosphere" caption="DJs, vendors, community." delay={2} rotate={0.8} />
              <Polaroid src="/meetup-social.jpg" label="Stay After" caption="Where real connection happens." delay={3} rotate={-1} />
            </div>
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ INTERSTITIAL ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
        <ParallaxImage src="/group-run.png" alt="Group run" className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-black/50" />
        <Container size="narrow" className="relative z-10 text-center">
          <Reveal>
            <p className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Running is just the
              <span className="text-casual-blue"> starting point</span>.
              The real magic is the people you meet and the culture you build.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ CULTURE ━━━━━━━━━━━━━━━━━━ */}
      <section id="culture" className="bg-white py-20 sm:py-24 lg:py-32">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="rounded-full bg-terracotta/10 text-terracotta border-none font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-3 py-1">
                Culture
              </Badge>
              <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-asphalt sm:text-4xl lg:text-5xl">
                More than fitness, it's a whole social atmosphere.
              </h2>
              <p className="mt-5 text-base leading-7 text-asphalt/50 sm:text-[17px] sm:leading-8">
                Movement is the entry point. Connection, music, networking, and community are the reason people stay.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:gap-7">
            <Polaroid
              icon={Users}
              label="Movement"
              caption="A casual pace, a welcoming crowd, and room for runners, walkers, and first-timers. Showing up is what matters."
              src="/run-night.png"
              delay={0}
              rotate={-1.5}
            />
            <Polaroid
              icon={Music}
              label="Music"
              caption="DJs, playlists, and daytime energy that make every meetup feel social from the moment it starts."
              src="/meetup-party.jpg"
              delay={1}
              rotate={1.2}
            />
            <Polaroid
              icon={Zap}
              label="Networking"
              caption="Conversations after the run, new faces every week, and real connections that keep growing."
              src="/coffee-shoes.png"
              delay={2}
              rotate={-0.8}
            />
            <Polaroid
              icon={Heart}
              label="Community"
              caption="A healthier social scene built around genuine connection, local support, and shared energy."
              src="/night-crew.png"
              delay={3}
              rotate={1.5}
            />
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ JOIN ━━━━━━━━━━━━━━━━━━ */}
      <section id="join" className="relative overflow-hidden py-24 sm:py-28 lg:py-36">
        <div className="absolute inset-0">
          <img src="/meetup-unity.jpg" alt="Community" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-asphalt/82" />
        </div>

        <Container size="narrow" className="relative z-10">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="rounded-full bg-casual-blue/15 text-casual-blue border-none font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-3 py-1">
                Join
              </Badge>
              <h2 className="mt-5 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                A healthier social scene starts with one Saturday.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/50 sm:text-[17px]">
                Movement, music, new people, and a community that actually wants you there.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            <Reveal delay={0}>
              <TiltCard intensity={4} className="h-full">
                <motion.a
                  href="https://ig.me/j/AbbClY3jKu7ge-z7"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.10] sm:p-7"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-casual-blue/20 ring-1 ring-casual-blue/30">
                    <MessageCircle className="h-5 w-5 text-casual-blue" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">Join the Chat</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    Routes, reminders, and the easiest way to meet the crew.
                  </p>
                  <motion.span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-casual-blue"
                    whileHover={{ x: 4 }}
                    transition={spring}
                  >
                    Join on Instagram <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </motion.span>
                </motion.a>
              </TiltCard>
            </Reveal>

            <Reveal delay={1}>
              <TiltCard intensity={4} className="h-full">
                <motion.a
                  href="https://www.instagram.com/thecasuals.club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.10] sm:p-7"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/25 via-pink-500/20 to-orange-400/20 ring-1 ring-pink-400/25">
                    <Instagram className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">Follow the Culture</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    Weekly recaps, event photos, and the people behind the movement.
                  </p>
                  <motion.span
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-pink-400"
                    whileHover={{ x: 4 }}
                    transition={spring}
                  >
                    @thecasuals.club <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </motion.span>
                </motion.a>
              </TiltCard>
            </Reveal>

            <Reveal delay={2}>
              <TiltCard intensity={4} className="h-full">
                <div className="h-full rounded-2xl border border-casual-blue/20 bg-casual-blue/[0.12] p-6 backdrop-blur-md sm:col-span-2 sm:p-7 lg:col-span-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-casual-blue/25 ring-1 ring-casual-blue/30">
                    <Mail className="h-5 w-5 text-casual-blue" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">Stay in the Loop</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    Event drops, updates, and collabs straight to your inbox.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="min-w-0 flex-1 rounded-xl border-white/12 bg-white/8 h-10 px-4 text-sm text-white placeholder:text-white/35 focus-visible:border-casual-blue/50 focus-visible:ring-casual-blue/20"
                    />
                    <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} transition={spring}>
                      <Button
                        type="submit"
                        size="lg"
                        className="rounded-xl bg-casual-blue px-4 text-white hover:bg-casual-blue-dark h-10"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                  <AnimatePresence>
                    {submitted && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="mt-3 text-xs text-casual-blue"
                      >
                        You're in. Welcome to the club.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ PARTNER ━━━━━━━━━━━━━━━━━━ */}
      <section id="partner" className="bg-cloud py-20 sm:py-24 lg:py-28">
        <Container size="narrow" className="text-center">
          <Reveal direction="scale">
            <motion.div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta"
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={spring}
            >
              <Handshake className="h-7 w-7" />
            </motion.div>
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={spring} className="inline-block mt-8">
              <Button
                size="lg"
                render={<a href="mailto:hello@casualsclub.com" />}
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white hover:brightness-110"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </Button>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-asphalt py-16 text-white sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center">
            <motion.img src="/logo.png" alt="Casuals Club" className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              whileHover={{ scale: 1.1, rotate: 8 }} transition={spring}
            />
            <p className="mt-4 font-heading text-xl font-bold tracking-wide sm:text-2xl">CASUALS CLUB</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-white/35">Movement &middot; Music &middot; Connection</p>

            <div className="mt-8 flex items-center gap-3">
              {[
                { href: 'https://www.instagram.com/thecasuals.club/', icon: Instagram, label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400' },
                { href: 'https://ig.me/j/AbbClY3jKu7ge-z7', icon: MessageCircle, label: 'Community Chat', color: 'hover:bg-casual-blue' },
                { href: 'mailto:hello@casualsclub.com', icon: Mail, label: 'Email', color: 'hover:bg-terracotta' },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={spring}
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] text-white/60 transition-all duration-300 hover:text-white ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
              {['Story', 'Events', 'Culture', 'Join'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ color: 'rgba(255,255,255,0.7)', y: -1 }}
                  transition={{ duration: 0.15 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <Separator className="my-8 w-full max-w-xs bg-white/[0.08]" />

            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              © 2026 Casuals Club. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
