import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Logo Diamante SVG (Logo Oficial)
const DiamondLogo = ({ className = '', color = '#000' }: { className?: string; color?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" fill="none">
    <path fill={color} d="M247.258 18.749A63.908 63.908 0 0 0 202.029 0h-84.091a63.906 63.906 0 0 0-45.229 18.749L18.748 72.596C6.749 84.596 0 100.961 0 117.944v84.095c0 16.866 6.75 33.232 18.748 45.231l53.978 53.981A63.907 63.907 0 0 0 117.954 320h84.092a63.908 63.908 0 0 0 45.228-18.749l53.978-53.981A63.91 63.91 0 0 0 320 202.039v-84.095a63.913 63.913 0 0 0-18.748-45.231l-53.978-53.98-.016.016Zm3.749 45.964c2 0 3.117.25 3.866.367.867 3.366 1 16-10.865 39.865-5.5 11.116-12.749 22.732-21.248 34.481a410.027 410.027 0 0 0-20.364-21.865c-7.25-7.25-14.499-14-21.865-20.366 7.616-5.5 15.249-10.5 22.731-14.866 27.231-15.866 42.479-17.499 47.729-17.499v-.117h.016Zm-44.362 95.212c-6.999 8.25-14.498 16.366-22.364 24.365-7.999 8-16.115 15.5-24.364 22.366-8.249-7-16.365-14.366-24.364-22.366-8-7.999-15.499-16.115-22.365-24.365 6.999-8.25 14.499-16.366 22.365-24.365 7.865-8 16.115-15.5 24.364-22.366 8.249 7 16.365 14.366 24.364 22.366 7.999 7.999 15.498 16.115 22.364 24.365ZM90.707 36.865c7.25-7.25 16.865-11.25 27.114-11.25h84.091c10.249 0 19.865 4 27.114 11.25l4.616 4.616c-20.997 5.117-46.978 18.866-73.842 39.115-26.864-20.25-52.844-33.865-73.842-39.115l4.616-4.616h.133ZM65.093 65.097c.617-.117 1.867-.367 3.867-.367 15.865 0 38.612 12.25 47.728 17.5 7.499 4.365 15.115 9.365 22.731 14.865-7.366 6.366-14.615 13.116-21.865 20.366a410.071 410.071 0 0 0-20.364 21.865c-8.5-11.749-15.748-23.365-21.248-34.481C64.077 80.979 64.193 68.363 65.077 64.98v.117h.016Zm-28.23 164.058c-7.25-7.25-11.249-16.866-11.249-27.116v-84.095c0-10.25 4-19.866 11.249-27.115l4.616-4.617c5.116 20.999 18.865 46.981 38.98 73.846-20.249 26.866-33.864 52.848-38.98 73.847l-4.616-4.617v-.133Zm31.98 25.982c-2 0-3.117-.25-3.866-.367-.867-3.366-1-15.999 10.865-39.865 5.5-11.116 12.749-22.732 21.248-34.481a410.071 410.071 0 0 0 20.364 21.865c7.25 7.25 14.499 14 21.865 20.366-7.616 5.5-15.249 10.5-22.731 14.866-27.23 15.866-42.48 17.499-47.728 17.499v.117h-.017Zm160.3 27.865c-7.249 7.25-16.865 11.249-27.114 11.249h-84.091c-10.249 0-19.865-3.999-27.114-11.249l-4.616-4.617c20.997-5.116 46.978-18.865 73.842-39.114 26.864 20.249 52.845 33.865 73.842 39.114l-4.616 4.617h-.133Zm25.614-28.232c-.617.117-1.867.367-3.866.367-15.865 0-38.613-12.25-47.729-17.499-7.499-4.367-15.115-9.367-22.731-14.866a410.464 410.464 0 0 0 21.865-20.366 410.027 410.027 0 0 0 20.364-21.865c8.499 11.749 15.748 23.365 21.248 34.481 11.865 23.866 11.749 36.482 10.865 39.865v-.117h-.016Zm39.479-52.864c0 10.25-4 19.866-11.249 27.115l-4.616 4.617c-5.116-20.999-18.865-46.981-38.979-73.846 20.248-26.866 33.863-52.848 38.979-73.847l4.616 4.617c7.249 7.25 11.249 16.866 11.249 27.115v84.229Z"/>
  </svg>
)

// Logo Infinito SVG (Assinatura Visual)
const InfinityLogo = ({ className = '', color = '#000' }: { className?: string; color?: string }) => (
  <svg className={className} width="120" height="55" viewBox="0 0 400 184" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M393.3 57.2C388.7 45.8 381.9 35.6 373.2 26.9C364.4 18.2 354.2 11.4 342.9 6.8C331.8 2.3 320.2 0 308.3 0C296.4 0 284.8 2.3 273.8 6.7C262.4 11.3 252.2 18.1 243.5 26.8L200 70.3L156.5 26.8C147.7 18.1 137.5 11.3 126.2 6.7C115.2 2.3 103.6 0 91.7 0C79.8 0 68.2 2.3 57.2 6.7C45.8 11.3 35.6 18.1 26.9 26.8C18.2 35.6 11.4 45.8 6.8 57.1C2.3 68.2 0 79.8 0 91.7C0 103.6 2.3 115.2 6.7 126.2C11.3 137.6 18.1 147.8 26.8 156.5C35.5 165.2 45.8 172 57.1 176.6C68.1 181.1 79.7 183.3 91.6 183.3C103.5 183.3 115.1 181 126.1 176.6C137.5 172 147.7 165.2 156.4 156.5L199.9 113L210.4 123.5L243.4 156.5C252.2 165.2 262.4 172 273.7 176.6C284.7 181.1 296.3 183.3 308.2 183.3C320.1 183.3 331.7 181 342.7 176.6C354.1 172 364.3 165.2 373 156.5C381.7 147.7 388.5 137.5 393.1 126.2C397.6 115.2 399.8 103.6 399.8 91.7C399.8 79.8 397.5 68.2 393.1 57.2H393.3ZM369.7 91.7C369.7 108.1 363.3 123.6 351.7 135.2C340.1 146.8 324.7 153.2 308.2 153.2C291.7 153.2 276.3 146.8 264.7 135.2L221.2 91.7L264.7 48.2C276.3 36.6 291.7 30.2 308.2 30.2C324.7 30.2 340.1 36.6 351.7 48.2C363.3 59.8 369.7 75.2 369.7 91.7ZM178.6 91.7L135.1 135.2C123.5 146.8 108.1 153.2 91.6 153.2C75.2 153.2 59.7 146.8 48.1 135.2C36.5 123.6 30.1 108.2 30.1 91.7C30.1 75.2 36.5 59.8 48.1 48.2C59.7 36.6 75.1 30.2 91.6 30.2C108 30.2 123.5 36.6 135.1 48.2L178.5 91.6V91.7H178.6Z" fill={color}/>
  </svg>
)

// Leaky Bucket Animation (Dark theme)
const LeakyBucket = () => (
  <div className="leaky-bucket-visual mt-12">
    <svg viewBox="0 0 200 160" className="w-56 h-48 mx-auto">
      <defs>
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Bucket */}
      <path d="M40 40 L30 140 L170 140 L160 40 Z" fill="none" stroke="#fff" strokeWidth="2" />
      {/* Water level */}
      <rect x="35" y="65" width="130" height="70" fill="url(#waterGradient)" rx="2" />
      {/* Input drops (green = new clients) */}
      <circle cx="60" cy="25" r="5" fill="#4ADE80" className="animate-bounce" />
      <circle cx="100" cy="18" r="5" fill="#4ADE80" className="animate-bounce" style={{ animationDelay: '0.15s' }} />
      <circle cx="140" cy="25" r="5" fill="#4ADE80" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
      {/* Leak holes */}
      <circle cx="50" cy="120" r="5" fill="#000" stroke="#fff" strokeWidth="1.5" />
      <circle cx="80" cy="128" r="4" fill="#000" stroke="#fff" strokeWidth="1.5" />
      <circle cx="120" cy="124" r="5" fill="#000" stroke="#fff" strokeWidth="1.5" />
      <circle cx="150" cy="118" r="4" fill="#000" stroke="#fff" strokeWidth="1.5" />
      {/* Leaking drops (red = churned clients) */}
      <circle cx="50" cy="145" r="4" fill="#EF4444" className="animate-ping" style={{ animationDuration: '1.5s' }} />
      <circle cx="80" cy="148" r="3" fill="#EF4444" className="animate-ping" style={{ animationDelay: '0.2s', animationDuration: '1.5s' }} />
      <circle cx="120" cy="146" r="4" fill="#EF4444" className="animate-ping" style={{ animationDelay: '0.4s', animationDuration: '1.5s' }} />
      <circle cx="150" cy="142" r="3" fill="#EF4444" className="animate-ping" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }} />
    </svg>
    <p className="text-center text-gray-400 text-sm mt-4">Exemplo do Balde Furado: +10 entrando, -8 saindo</p>
  </div>
)

// Journey Map Visual
const JourneyMap = () => (
  <div className="journey-map">
    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
      {['AQUISICAO', 'ONBOARDING', 'ADOPTION', 'EXPANSION', 'RENEWAL'].map((stage, i) => (
        <div key={stage} className="flex items-center">
          <div className={`px-4 py-3 rounded-lg text-center ${i === 0 ? 'bg-gray-200 text-gray-600' : 'bg-black text-white'}`}>
            <p className="text-xs font-medium">{stage}</p>
          </div>
          {i < 4 && <span className="mx-2 text-gray-400">→</span>}
        </div>
      ))}
    </div>
  </div>
)

// Animated Section wrapper
const Section = ({
  children,
  className = '',
  id,
  dark = false,
  soft = false
}: {
  children: React.ReactNode
  className?: string
  id: string
  dark?: boolean
  soft?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section
      ref={ref}
      id={id}
      className={`section min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-16 ${dark ? 'bg-black text-white' : soft ? 'bg-[#F8F8F8] text-black' : 'bg-white text-black'} ${className}`}
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
    <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }} />
  </div>
)

// Navigation dots
const NavDots = ({
  sections,
  currentSection,
  darkSections
}: {
  sections: string[]
  currentSection: number
  darkSections: number[]
}) => (
  <nav className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
    {sections.map((id, index) => (
      <button
        key={id}
        className={`w-2 h-2 rounded-full transition-all ${currentSection === index ? 'scale-150 bg-black' : 'bg-gray-300'} ${darkSections.includes(currentSection) && currentSection === index ? 'bg-white' : ''}`}
        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
        aria-label={`Go to section ${index + 1}`}
      />
    ))}
  </nav>
)

// Arrow Navigation
const ArrowNav = ({
  currentSection,
  totalSections,
  onPrev,
  onNext,
  isDark
}: {
  currentSection: number
  totalSections: number
  onPrev: () => void
  onNext: () => void
  isDark: boolean
}) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
    <button
      onClick={onPrev}
      disabled={currentSection === 0}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentSection === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'} ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-black/10 text-black hover:bg-black/20'}`}
      aria-label="Previous slide"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-gray-500'}`}>
      {currentSection + 1} / {totalSections}
    </span>
    <button
      onClick={onNext}
      disabled={currentSection === totalSections - 1}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentSection === totalSections - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'} ${isDark ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-black/10 text-black hover:bg-black/20'}`}
      aria-label="Next slide"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
)

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  const sectionIds = [
    'cover', 'problem', 'case-real', 'churn-impact', 'quote-client',
    'math', 'ltv-comparison', 'definition', 'definition-example', 'difference-table',
    'pillars', 'pillar-onboarding', 'pillar-adoption', 'pillar-expansion', 'pillar-renewal',
    'metrics', 'metric-churn', 'metric-nps', 'metric-health', 'metric-expansion', 'metric-ttv',
    'journey', 'stages',
    'when-cs', 'stage-founder', 'stage-first-hire', 'stage-team',
    'checklist', 'steps-intro', 'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
    'tools', 'red-flags', 'insight', 'homework', 'closing', 'cta'
  ]

  const darkSections = [1, 7, 21, 37] // problem, definition, stages, closing

  // Navigate to specific slide
  const navigateToSlide = (index: number) => {
    const targetIndex = Math.max(0, Math.min(index, sectionIds.length - 1))
    const el = document.getElementById(sectionIds[targetIndex])
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        navigateToSlide(currentSection + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateToSlide(currentSection - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        navigateToSlide(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        navigateToSlide(sectionIds.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)

      const sectionElements = sectionIds.map(id => document.getElementById(id))
      const viewportMiddle = scrollTop + window.innerHeight / 2

      sectionElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect()
          const absoluteTop = rect.top + scrollTop
          const absoluteBottom = absoluteTop + rect.height
          if (viewportMiddle >= absoluteTop && viewportMiddle < absoluteBottom) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDarkSection = darkSections.includes(currentSection)

  return (
    <>
      <ProgressBar progress={scrollProgress} />
      <NavDots sections={sectionIds} currentSection={currentSection} darkSections={darkSections} />
      <ArrowNav
        currentSection={currentSection}
        totalSections={sectionIds.length}
        onPrev={() => navigateToSlide(currentSection - 1)}
        onNext={() => navigateToSlide(currentSection + 1)}
        isDark={isDarkSection}
      />

      {/* COVER */}
      <Section id="cover">
        <DiamondLogo className="w-16 h-16 mb-8" />
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Aula 45 de 46</p>
        <h1 className="text-5xl md:text-7xl font-bold text-black text-center leading-tight">
          Customer Success<br />
          <span className="text-gray-500">Expert</span>
        </h1>
        <div className="w-16 h-0.5 bg-black my-8" />
        <p className="text-xl md:text-2xl text-gray-600 text-center max-w-xl">
          A arte de fazer clientes ficarem,<br />crescerem e indicarem.
        </p>
        <p className="text-gray-400 mt-12">Marllon Blando</p>
        <p className="text-gray-300 text-sm">Founders Lendarios</p>
        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" dark>
        <p className="text-gray-400 uppercase tracking-widest text-sm mb-8">O Problema</p>
        <h2 className="text-4xl md:text-6xl font-bold text-center leading-tight text-white">
          Voce consegue vender.<br />
          <span className="text-gray-400">Mas consegue reter?</span>
        </h2>
        <LeakyBucket />
      </Section>

      {/* CASE REAL */}
      <Section id="case-real" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Caso Real</p>
        <h2 className="text-3xl md:text-5xl font-bold text-black text-center mb-8">
          O Erro de R$2 Milhoes
        </h2>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-4xl font-bold text-black">R$2M</p>
            <p className="text-gray-500 text-sm mt-2">Investimento captado</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <p className="text-4xl font-bold text-black">50</p>
            <p className="text-gray-500 text-sm mt-2">Clientes em 6 meses</p>
          </div>
          <div className="bg-black p-6 rounded-lg text-center text-white">
            <p className="text-4xl font-bold">16%</p>
            <p className="text-gray-400 text-sm mt-2">Churn mensal</p>
          </div>
        </div>
      </Section>

      {/* CHURN IMPACT */}
      <Section id="churn-impact">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">O Impacto</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
          Vendendo 10 clientes/mes.<br />
          <span className="text-gray-500">Perdendo 8.</span>
        </h2>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-6xl font-bold text-green-600">+10</p>
            <p className="text-gray-500 text-sm">Entrando</p>
          </div>
          <p className="text-4xl text-gray-300">vs</p>
          <div className="text-center">
            <p className="text-6xl font-bold text-red-600">-8</p>
            <p className="text-gray-500 text-sm">Saindo</p>
          </div>
        </div>
        <p className="text-xl text-gray-600 text-center mt-8 max-w-md">
          Crescimento liquido: <strong>apenas 2 clientes/mes</strong>
        </p>
      </Section>

      {/* QUOTE CLIENT */}
      <Section id="quote-client" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">O que os clientes disseram</p>
        <div className="space-y-6 max-w-2xl">
          {[
            "Nao conseguimos configurar direito, desistimos.",
            "O produto e bom, mas nao sabiamos como usar pro nosso caso.",
            "Ficamos travados numa funcionalidade e ninguem ajudou.",
            "A gente esperava mais suporte, nao so um e-mail automatico."
          ].map((quote, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border-l-4 border-black">
              <p className="text-lg italic text-gray-700">"{quote}"</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 mt-8 text-center">
          O problema nao era o produto.<br />
          Era a <strong>experiencia pos-venda</strong>.
        </p>
      </Section>

      {/* MATH */}
      <Section id="math">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">A Matematica</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
          Reduzir churn pela metade =<br />
          <span className="text-gray-500">Dobrar o LTV</span>
        </h2>
        <div className="bg-gray-100 p-8 rounded-lg w-full max-w-xl">
          <p className="text-center text-gray-500 mb-4">Formula do LTV</p>
          <p className="text-center text-2xl md:text-3xl font-mono text-black">
            LTV = Receita Media / Churn Rate
          </p>
        </div>
      </Section>

      {/* LTV COMPARISON */}
      <Section id="ltv-comparison" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">Exemplo Pratico</p>
        <p className="text-xl text-gray-600 mb-8 text-center">Receita media: R$500/mes</p>
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl">
          <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
            <p className="text-gray-500 text-sm mb-2">Churn 10%</p>
            <p className="text-5xl font-bold text-gray-600">R$5.000</p>
            <p className="text-gray-400 mt-4">LTV/CAC = 2,5x</p>
          </div>
          <div className="bg-black p-8 rounded-lg text-center text-white">
            <p className="text-gray-400 text-sm mb-2">Churn 5%</p>
            <p className="text-5xl font-bold">R$10.000</p>
            <p className="text-gray-500 mt-4">LTV/CAC = 5x</p>
          </div>
        </div>
        <p className="text-xl font-bold text-black mt-8 text-center">
          Mesmo produto. Mesmo preco. Dobro do valor.
        </p>
      </Section>

      {/* DEFINITION */}
      <Section id="definition" dark>
        <p className="text-gray-400 uppercase tracking-widest text-sm mb-8">Definicao</p>
        <h2 className="text-3xl md:text-5xl font-bold text-center leading-tight max-w-3xl text-white">
          Customer Success e a pratica<br />
          <span className="text-yellow-400 font-black">PROATIVA</span> de garantir que<br />
          clientes alcancem seus objetivos.
        </h2>
        <p className="text-gray-300 mt-8 text-center max-w-xl text-lg">
          Voce <strong className="text-yellow-400">ANTECIPA</strong> problemas antes do cliente perceber.<br />
          Voce <strong className="text-yellow-400">MONITORA</strong> o uso e age quando algo muda.<br />
          Voce <strong className="text-yellow-400">GUIA</strong> o cliente ate o sucesso dele.
        </p>
      </Section>

      {/* DEFINITION EXAMPLE */}
      <Section id="definition-example" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Na Pratica</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
          CS em Acao: Antes vs Depois
        </h2>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-red-600 font-bold text-sm uppercase mb-4">Sem CS (Reativo)</p>
            <div className="space-y-3 text-gray-600">
              <p>→ Cliente compra, recebe email automatico</p>
              <p>→ Tenta usar sozinho, trava</p>
              <p>→ Abre ticket de suporte</p>
              <p>→ Espera 2 dias por resposta</p>
              <p>→ Desiste e cancela</p>
            </div>
          </div>
          <div className="bg-black p-6 rounded-lg text-white">
            <p className="text-green-400 font-bold text-sm uppercase mb-4">Com CS (Proativo)</p>
            <div className="space-y-3 text-gray-300">
              <p>→ Cliente compra, CS liga no mesmo dia</p>
              <p>→ Agenda onboarding de 30 min</p>
              <p>→ Configura produto junto com cliente</p>
              <p>→ Cliente tem primeira vitoria em 48h</p>
              <p>→ <strong className="text-white">Cliente fica, expande, indica</strong></p>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-8 text-center font-medium">
          A diferenca? <strong>Voce agiu ANTES do problema acontecer.</strong>
        </p>
      </Section>

      {/* DIFFERENCE TABLE */}
      <Section id="difference-table">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Clarificacao</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
          CS ≠ Suporte ≠ Vendas
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left max-w-3xl mx-auto">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-4 pr-4"></th>
                <th className="py-4 px-4 text-gray-500">Suporte</th>
                <th className="py-4 px-4 text-gray-500">Vendas</th>
                <th className="py-4 px-4 font-bold">Customer Success</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-gray-500">Abordagem</td>
                <td className="py-4 px-4">Reativo</td>
                <td className="py-4 px-4">Proativo</td>
                <td className="py-4 px-4 font-medium bg-gray-100">PROATIVO</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-gray-500">Foco</td>
                <td className="py-4 px-4">Resolver bugs</td>
                <td className="py-4 px-4">Fechar deals</td>
                <td className="py-4 px-4 font-medium">Garantir sucesso</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-4 text-gray-500">Momento</td>
                <td className="py-4 px-4">Quando problema</td>
                <td className="py-4 px-4">Antes da compra</td>
                <td className="py-4 px-4 font-medium">Todo o ciclo</td>
              </tr>
              <tr>
                <td className="py-4 text-gray-500">Metrica</td>
                <td className="py-4 px-4">Tempo resposta</td>
                <td className="py-4 px-4">Receita nova</td>
                <td className="py-4 px-4 font-medium">Retencao, NPS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* PILLARS */}
      <Section id="pillars" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Framework</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          Os 4 Pilares do Customer Success
        </h2>
        <div className="grid md:grid-cols-4 gap-6 w-full">
          {[
            { num: '01', title: 'ONBOARDING', desc: 'Ativar cliente' },
            { num: '02', title: 'ADOPTION', desc: 'Engajar cliente' },
            { num: '03', title: 'EXPANSION', desc: 'Crescer receita' },
            { num: '04', title: 'RENEWAL', desc: 'Reter cliente' }
          ].map((pillar) => (
            <div key={pillar.num} className="bg-white p-6 rounded-lg border-l-4 border-black">
              <p className="text-3xl font-bold text-gray-200">{pillar.num}</p>
              <p className="text-lg font-bold text-black mt-2">{pillar.title}</p>
              <p className="text-gray-500 text-sm mt-1">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PILLAR ONBOARDING */}
      <Section id="pillar-onboarding">
        <div className="text-6xl font-bold text-gray-100 mb-4">01</div>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">ONBOARDING</h2>
        <p className="text-xl text-gray-600 text-center mb-8">
          Fazer o cliente ter a <strong>PRIMEIRA VITORIA</strong> rapido.
        </p>
        <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
          {['Welcome call', 'Setup tecnico', 'Treinamento inicial', 'Primeiro resultado'].map((item, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg flex items-center gap-3">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">{i + 1}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 mt-8">Metrica: <strong>Time to Value</strong></p>
      </Section>

      {/* PILLAR ADOPTION */}
      <Section id="pillar-adoption" soft>
        <div className="text-6xl font-bold text-gray-200 mb-4">02</div>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">ADOPTION</h2>
        <p className="text-xl text-gray-600 text-center mb-8">
          Garantir uso <strong>CONSISTENTE</strong> e profundo.
        </p>
        <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md w-full">
          <p className="text-gray-500 text-sm mb-4">O que monitorar:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-black rounded-full"></span>Frequencia de login</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-black rounded-full"></span>Funcionalidades usadas</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-black rounded-full"></span>Profundidade de engajamento</li>
          </ul>
        </div>
        <p className="text-gray-500 mt-8">Metrica: <strong>Engagement Score</strong></p>
      </Section>

      {/* PILLAR EXPANSION */}
      <Section id="pillar-expansion">
        <div className="text-6xl font-bold text-gray-100 mb-4">03</div>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">EXPANSION</h2>
        <p className="text-xl text-gray-600 text-center mb-8">
          Aumentar receita de cliente <strong>EXISTENTE</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-gray-100 px-6 py-3 rounded-lg"><strong>Upsell</strong> - Plano maior</div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg"><strong>Cross-sell</strong> - Outro produto</div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg"><strong>Add-ons</strong> - Mais usuarios</div>
        </div>
        <p className="text-gray-500 mt-8">Metrica: <strong>Expansion MRR</strong></p>
      </Section>

      {/* PILLAR RENEWAL */}
      <Section id="pillar-renewal" soft>
        <div className="text-6xl font-bold text-gray-200 mb-4">04</div>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">RENEWAL</h2>
        <p className="text-xl text-gray-600 text-center mb-8">
          Garantir que cliente <strong>NAO CANCELE</strong>.
        </p>
        <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md w-full">
          <p className="text-gray-500 text-sm mb-4">Sinais de churn:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Nao ta usando o produto</li>
            <li>→ Reclamou muito no suporte</li>
            <li>→ Equipe dele mudou</li>
            <li>→ Resultado financeiro ruim</li>
          </ul>
        </div>
        <p className="text-gray-500 mt-8">Metrica: <strong>Churn Rate &lt;5%</strong></p>
      </Section>

      {/* METRICS */}
      <Section id="metrics">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Metricas</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">
          5 Metricas Essenciais
        </h2>
        <div className="grid grid-cols-5 gap-4 w-full max-w-3xl">
          {['Churn', 'NPS', 'Health', 'Expansion', 'TTV'].map((metric, i) => (
            <div key={metric} className="text-center">
              <div className="w-12 h-12 mx-auto bg-black text-white rounded-full flex items-center justify-center text-lg font-bold">{i + 1}</div>
              <p className="text-sm mt-2 font-medium">{metric}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* METRIC CHURN */}
      <Section id="metric-churn" soft>
        <p className="text-5xl font-bold text-black mb-4">CHURN RATE</p>
        <p className="text-xl text-gray-600 text-center mb-8">Taxa de cancelamento</p>
        <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-md w-full text-center">
          <p className="font-mono text-lg mb-4">Clientes Perdidos / Total x 100</p>
          <div className="flex justify-center gap-8 mt-6">
            <div><p className="text-green-600 font-bold">&lt;3%</p><p className="text-xs text-gray-500">Excelente</p></div>
            <div><p className="text-yellow-600 font-bold">3-7%</p><p className="text-xs text-gray-500">Normal</p></div>
            <div><p className="text-red-600 font-bold">&gt;10%</p><p className="text-xs text-gray-500">Alerta</p></div>
          </div>
        </div>
      </Section>

      {/* METRIC NPS */}
      <Section id="metric-nps">
        <p className="text-5xl font-bold text-black mb-4">NPS</p>
        <p className="text-xl text-gray-600 text-center mb-8">Net Promoter Score</p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-xl w-full">
          <p className="text-center italic mb-6">"De 0 a 10, quanto voce recomendaria nosso produto?"</p>
          <div className="flex justify-between">
            <div className="text-center"><p className="text-2xl">9-10</p><p className="text-green-600 text-sm">Promotores</p></div>
            <div className="text-center"><p className="text-2xl">7-8</p><p className="text-yellow-600 text-sm">Neutros</p></div>
            <div className="text-center"><p className="text-2xl">0-6</p><p className="text-red-600 text-sm">Detratores</p></div>
          </div>
        </div>
        <p className="text-gray-500 mt-6">NPS = % Promotores - % Detratores</p>
      </Section>

      {/* METRIC HEALTH */}
      <Section id="metric-health" soft>
        <p className="text-5xl font-bold text-black mb-4">HEALTH SCORE</p>
        <p className="text-xl text-gray-600 text-center mb-8">Pontuacao de Saude do Cliente</p>
        <div className="flex flex-col gap-4 max-w-md w-full">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <span className="w-6 h-6 rounded-full bg-green-500"></span>
            <span className="font-medium">80-100</span>
            <span className="text-gray-500 ml-auto">Saudavel</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <span className="w-6 h-6 rounded-full bg-yellow-500"></span>
            <span className="font-medium">50-79</span>
            <span className="text-gray-500 ml-auto">Atencao</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <span className="w-6 h-6 rounded-full bg-red-500"></span>
            <span className="font-medium">0-49</span>
            <span className="text-gray-500 ml-auto">Risco</span>
          </div>
        </div>
      </Section>

      {/* METRIC EXPANSION */}
      <Section id="metric-expansion">
        <p className="text-5xl font-bold text-black mb-4">EXPANSION MRR</p>
        <p className="text-xl text-gray-600 text-center mb-8">Receita adicional de clientes existentes</p>
        <div className="bg-gray-100 p-8 rounded-lg max-w-xl w-full text-center">
          <p className="font-mono text-lg">Upsells - Downgrades = Expansion</p>
          <p className="text-gray-500 mt-4">Meta: Sempre positivo</p>
        </div>
      </Section>

      {/* METRIC TTV */}
      <Section id="metric-ttv" soft>
        <p className="text-5xl font-bold text-black mb-4">TIME TO VALUE</p>
        <p className="text-xl text-gray-600 text-center mb-8">Tempo ate primeira vitoria</p>
        <div className="text-center">
          <p className="text-6xl font-bold text-black">&lt;7 dias</p>
          <p className="text-gray-500 mt-4">Ideal</p>
        </div>
        <p className="text-gray-600 mt-8 text-center max-w-md">
          Quanto mais rapido o cliente ve valor, menor a chance de cancelar.
        </p>
      </Section>

      {/* JOURNEY */}
      <Section id="journey">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-8">Customer Journey</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12">A Jornada do Cliente</h2>
        <JourneyMap />
        <p className="text-gray-600 mt-8 text-center max-w-md">
          Em CADA etapa, CS tem acoes especificas para garantir que o cliente tenha sucesso.
        </p>
      </Section>

      {/* STAGES */}
      <Section id="stages" dark>
        <p className="text-gray-400 uppercase tracking-widest text-sm mb-8">Em cada etapa...</p>
        <div className="grid md:grid-cols-5 gap-4 w-full">
          {[
            { stage: 'Aquisicao', owner: 'Marketing + Vendas', action: 'Fechar venda' },
            { stage: 'Onboarding', owner: 'CS', action: 'Ativar cliente' },
            { stage: 'Adoption', owner: 'CS', action: 'Engajar uso' },
            { stage: 'Expansion', owner: 'CS + Vendas', action: 'Upsell' },
            { stage: 'Renewal', owner: 'CS', action: 'Reter' }
          ].map((item, i) => (
            <div key={i} className="text-center p-4 border border-white/30 rounded-lg bg-white/5">
              <p className="font-bold text-white text-sm">{item.stage}</p>
              <p className="text-gray-300 text-xs mt-2">{item.owner}</p>
              <p className="text-gray-400 text-xs mt-1">{item.action}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHEN CS */}
      <Section id="when-cs" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Timing</p>
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-8">
          Quando Ter CS na Startup?
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-lg">
          Customer Success evolui conforme sua startup cresce.
        </p>
      </Section>

      {/* STAGE FOUNDER */}
      <Section id="stage-founder">
        <p className="text-8xl font-bold text-gray-100">01</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">FOUNDER-LED CS</h2>
        <p className="text-xl text-gray-500 mb-8">0-20 clientes</p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-md w-full">
          <p className="font-medium mb-4">O que fazer:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Falar com TODOS pessoalmente</li>
            <li>→ Onboarding manual</li>
            <li>→ Monitorar uso (planilha)</li>
            <li>→ Pedir feedback SEMPRE</li>
          </ul>
        </div>
      </Section>

      {/* STAGE FIRST HIRE */}
      <Section id="stage-first-hire" soft>
        <p className="text-8xl font-bold text-gray-200">02</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">PRIMEIRO CS HIRE</h2>
        <p className="text-xl text-gray-500 mb-8">20-100 clientes</p>
        <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md w-full">
          <p className="font-medium mb-4">Perfil ideal:</p>
          <ul className="space-y-2 text-gray-700">
            <li>→ Generalista (faz tudo)</li>
            <li>→ Comunicativo e empatico</li>
            <li>→ Data-driven</li>
            <li>→ Proativo</li>
          </ul>
        </div>
      </Section>

      {/* STAGE TEAM */}
      <Section id="stage-team">
        <p className="text-8xl font-bold text-gray-100">03</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">TEAM DE CS</h2>
        <p className="text-xl text-gray-500 mb-8">100+ clientes</p>
        <div className="bg-gray-100 p-6 rounded-lg max-w-lg w-full">
          <p className="font-medium mb-4">Estrutura:</p>
          <div className="space-y-2 text-gray-700">
            <p>→ VP of Customer Success</p>
            <p>→ Onboarding Specialists</p>
            <p>→ CSMs (por segmento)</p>
            <p>→ CS Operations</p>
          </div>
        </div>
      </Section>

      {/* CHECKLIST */}
      <Section id="checklist" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Autodiagnostico</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">Minha startup precisa de CS?</h2>
        <div className="space-y-3 max-w-lg w-full">
          {[
            'Mais de 20 clientes pagantes?',
            'Churn maior que 5% ao mes?',
            'Reclamacoes sobre falta de atencao?',
            'Nao sabe quais clientes estao em risco?',
            'Onboarding nao estruturado?',
            'Sem metricas de CS?',
            'Perde clientes sem saber por que?',
            'Gastando +50% tempo apagando incendio?'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 mt-6 text-sm">3+ SIM = Hora de estruturar CS</p>
      </Section>

      {/* STEPS INTRO */}
      <Section id="steps-intro">
        <p className="text-8xl font-bold text-gray-100">5</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-4">PASSOS</h2>
        <p className="text-xl text-gray-600 text-center">Para montar CS do zero</p>
        <InfinityLogo className="mt-12 opacity-20" />
      </Section>

      {/* STEP 1 */}
      <Section id="step-1" soft>
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Mapear Customer Journey</h2>
        <p className="text-gray-600 text-center max-w-md">
          Desenhe as etapas da jornada adaptadas ao SEU produto.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-6">
          <p className="text-sm text-gray-500">Ferramenta: Miro, Figma, papel</p>
        </div>
      </Section>

      {/* STEP 2 */}
      <Section id="step-2">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Definir Metricas Minimas</h2>
        <div className="flex gap-4 mt-6">
          <div className="bg-gray-100 px-6 py-3 rounded-lg font-medium">Churn Rate</div>
          <div className="bg-gray-100 px-6 py-3 rounded-lg font-medium">Health Score</div>
        </div>
        <p className="text-gray-500 mt-6 text-sm">Obrigatorias desde o dia 1</p>
      </Section>

      {/* STEP 3 */}
      <Section id="step-3" soft>
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Criar Onboarding Estruturado</h2>
        <div className="space-y-3 max-w-md w-full mt-6">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-gray-500 text-sm">Dia 0</span>
            <span>Boas-vindas + proximos passos</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-gray-500 text-sm">Dia 2</span>
            <span>Tutorial em video</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-gray-500 text-sm">Dia 5</span>
            <span>"Precisa de ajuda?"</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
            <span className="text-gray-500 text-sm">Dia 10</span>
            <span>"Vamos agendar uma call!"</span>
          </div>
        </div>
      </Section>

      {/* STEP 4 */}
      <Section id="step-4">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">4</div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Implementar Check-ins</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold">High-value</p>
            <p className="text-gray-500 text-sm">Mensal</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold">Mid-value</p>
            <p className="text-gray-500 text-sm">Trimestral</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-bold">Low-value</p>
            <p className="text-gray-500 text-sm">Automacao</p>
          </div>
        </div>
      </Section>

      {/* STEP 5 */}
      <Section id="step-5" soft>
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">5</div>
        <h2 className="text-2xl font-bold text-black text-center mb-4">Sistema de Alertas</h2>
        <p className="text-gray-600 text-center max-w-md mb-6">
          Monitorar sinais de churn e AGIR antes do cliente cancelar.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-red-600 font-medium">Se red flag aparece:</p>
          <p className="text-gray-700 mt-2">Liga pro cliente. Oferece ajuda pratica.</p>
        </div>
      </Section>

      {/* TOOLS */}
      <Section id="tools">
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Ferramentas</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
          Da pra comecar com R$0
        </h2>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-500 text-xs uppercase mb-4">Gratuitas</p>
            <ul className="space-y-2 text-sm">
              <li>Google Sheets</li>
              <li>Google Forms</li>
              <li>HubSpot CRM (free)</li>
              <li>Calendly (free)</li>
              <li>Loom (free)</li>
              <li>WhatsApp</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-500 text-xs uppercase mb-4">Ate R$200/mes</p>
            <ul className="space-y-2 text-sm">
              <li>Intercom</li>
              <li>Pipedrive</li>
              <li>Customer.io</li>
              <li>Zapier</li>
            </ul>
          </div>
          <div className="bg-black p-6 rounded-lg text-white">
            <p className="text-gray-500 text-xs uppercase mb-4">Investimento</p>
            <ul className="space-y-2 text-sm">
              <li>Gainsight</li>
              <li>ChurnZero</li>
              <li>Vitally</li>
              <li>Totango</li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">So quando 100+ clientes</p>
          </div>
        </div>
      </Section>

      {/* RED FLAGS */}
      <Section id="red-flags" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Sinais de Alerta</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">Red Flags</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl w-full">
          {[
            'Cliente nao loga ha 7+ dias',
            'Nao usa funcionalidades principais',
            'Muitos tickets de suporte',
            'Health Score vermelho',
            'Pagamento atrasado',
            'Pediu pra falar com gerente'
          ].map((flag, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg">
              <span className="text-red-500 text-xl">⚠</span>
              <span className="text-gray-700">{flag}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 mt-8 text-center">
          Acao imediata: <strong>Liga pro cliente. Oferece ajuda.</strong>
        </p>
      </Section>

      {/* INSIGHT */}
      <Section id="insight">
        <div className="max-w-2xl text-center">
          <p className="text-3xl md:text-4xl italic font-serif text-black leading-relaxed">
            "E 5-7x mais barato expandir receita de cliente existente do que adquirir cliente novo."
          </p>
          <div className="w-16 h-0.5 bg-black mx-auto my-8" />
          <p className="text-gray-600">
            Cliente ja confia. Ja usa. Ja viu valor.<br />
            CS transforma isso em crescimento sustentavel.
          </p>
        </div>
      </Section>

      {/* HOMEWORK */}
      <Section id="homework" soft>
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Acao</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
          Homework: Implemente 1 Metrica
        </h2>
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-black transition-colors">
            <p className="text-xs text-gray-500 uppercase mb-2">Opcao 1</p>
            <p className="font-bold mb-2">Calcular Churn Rate</p>
            <p className="text-gray-600 text-sm">Planilha. Clientes perdidos / total. Ultimos 3 meses.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <p className="text-xs text-black uppercase mb-2">Opcao 2</p>
            <p className="font-bold mb-2">Criar Health Score</p>
            <p className="text-gray-600 text-sm">Verde / Amarelo / Vermelho. Baseado em uso.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-black transition-colors">
            <p className="text-xs text-gray-500 uppercase mb-2">Opcao 3</p>
            <p className="font-bold mb-2">Fazer NPS Survey</p>
            <p className="text-gray-600 text-sm">Google Forms. "De 0 a 10..."</p>
          </div>
        </div>
      </Section>

      {/* CLOSING */}
      <Section id="closing" dark>
        <p className="text-gray-400 uppercase tracking-widest text-sm mb-8">Takeaway</p>
        <h2 className="text-2xl md:text-4xl font-bold text-center leading-relaxed text-white">
          Cliente satisfeito nao cancela.<br />
          <span className="text-yellow-400">Cliente satisfeito expande.</span><br />
          Cliente satisfeito vira promotor.
        </h2>
        <div className="w-16 h-0.5 bg-yellow-400 mx-auto my-8" />
        <p className="text-xl text-gray-300">
          CS e a maquina de crescimento sustentavel da sua startup.
        </p>
      </Section>

      {/* CTA */}
      <Section id="cta">
        <DiamondLogo className="w-16 h-16 mb-8" />
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">Proximos passos</p>
        <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
          Essa semana, implemente UMA coisa.
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <a href="./MATERIAL-ALUNO.html" target="_blank" className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-center">
            Abrir Material do Aluno
          </a>
          <a href="./GLOSSARIO-CS.html" target="_blank" className="px-8 py-4 bg-gray-100 text-black rounded-lg font-medium hover:bg-gray-200 transition-colors text-center">
            Ver Glossario CS
          </a>
        </div>
        <div className="mt-16 flex items-center gap-3">
          <InfinityLogo className="opacity-50" />
        </div>
        <p className="text-gray-400 text-sm mt-4">Marllon Blando | Founders Lendarios</p>
        <p className="text-gray-300 text-xs mt-2">Aula 45 de 46</p>
      </Section>
    </>
  )
}

export default App
