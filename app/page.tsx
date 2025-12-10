'use client';

import { FaUserGraduate, FaGraduationCap, FaBuilding, FaCar, FaHome, FaHeartbeat, FaShieldAlt, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaLinkedin, FaChevronDown, FaEnvelope, FaChevronLeft, FaChevronRight, FaArrowRight, FaBicycle, FaBars, FaTimes, FaCalculator, FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useGoogleReCaptcha, RecaptchaProvider } from './components/RecaptchaProvider';

const slides = [
  {
    title: "Votre assurance, notre engagement",
    subtitle: "Des solutions sur mesure pour protéger ce qui compte le plus pour vous",
    image: "/assets/image1.jpeg",
    cta: {
      secondary: {
        text: "Nous contacter",
        link: "/contact"
      }
    }
  },
  {
    title: "L'expertise à votre service",
    subtitle: "Une équipe de professionnels dédiée à votre satisfaction",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    cta: {
      secondary: {
        text: "En savoir plus",
        link: "#services"
      }
    }
  },
  {
    title: "Des solutions innovantes",
    subtitle: "Découvrez nos services adaptés à vos besoins spécifiques",
    image: "/assets/image2.png",
    cta: {
      secondary: {
        text: "Nos reconnaissances",
        link: "/certifications"
      }
    }
  }
];

const services = [
  {
    icon: FaCar,
    title: "Assurance auto",
    color: "#3b82f6"
  },
  {
    icon: FaHome,
    title: "Assurance habitation",
    color: "#3b82f6"
  },
  {
    icon: FaHeartbeat,
    title: "Mutuelle santé",
    color: "#3b82f6"
  },
  {
    icon: FaBicycle,
    title: "Assurance moto",
    color: "#3b82f6"
  },
  {
    icon: FaCalculator,
    title: "Assurance emprunteur",
    color: "#3b82f6"
  },
];

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      setFormStatus({
        type: 'error',
        message: 'reCAPTCHA n\'est pas encore chargé'
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        recaptchaToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue');
      }

      setFormStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès !'
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h3>
      
      {formStatus.message && (
        <div className={`mb-4 p-4 rounded-lg ${
          formStatus.type === 'success' 
            ? 'bg-green-500/20 text-green-100' 
            : 'bg-red-500/20 text-red-100'
        }`}>
          {formStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Nom complet</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="Votre message..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-white text-sky-600 font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
            isSubmitting 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:bg-sky-50'
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showContactSection, setShowContactSection] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effet de scroll pour la navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    setShowContactSection(true);
    setIsContactOpen(false);
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-rotation du slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <RecaptchaProvider>
      <div className="min-h-screen bg-white">
        {/* Navigation principale */}
        <motion.nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
          }`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}>
                <Link href="/" className="flex items-center">
                  <div className="relative h-20">
                    <Image 
                      src="/assets/h.png"
                      alt="Haya Assurances Logo"
                      width={320}
                      height={100}
                      className="w-full h-full"
                      priority
                    />
                  </div>
                </Link>
              </motion.div>

              {/* Navigation Desktop */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link
                  href="/nos-activites"
                  className={`font-medium transition-colors duration-300 hover:text-sky-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Nos activités
                </Link>
                <Link
                  href="/certifications"
                  className={`font-medium transition-colors duration-300 hover:text-sky-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Engagements qualité
                </Link>
                <Link
                  href="/centre-d-information"
                  className={`font-medium transition-colors duration-300 hover:text-sky-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Centre d’information
                </Link>
                <Link
                  href="#services"
                  className={`font-medium transition-colors duration-300 hover:text-sky-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Nos services
                </Link>
              </div>

              {/* Bouton Menu Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-2xl" />
                ) : (
                  <FaBars className="text-2xl" />
                )}
              </button>

              {/* Boutons de contact */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.a 
                  href="tel:+33980807637"
                  className={`hidden md:flex items-center gap-2 transition-colors ${
                    isScrolled ? 'text-sky-600' : 'text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaPhone className="text-lg" />
                  <span className="font-medium">+33 9 80 80 76 37</span>
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/contact"
                    className="bg-sky-600 text-white px-6 py-2.5 rounded-full hover:bg-sky-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl font-medium"
                  >
                    <FaEnvelope className="text-lg" />
                    <span>Contact</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-white shadow-lg border-b"
            >
              <div className="px-6 py-4 space-y-4">
                <Link
                  href="/nos-activites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-sky-500 transition-colors duration-300 py-2"
                >
                  Nos activités
                </Link>
                <Link
                  href="/certifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-sky-500 transition-colors duration-300 py-2"
                > 
                  Engagements qualité
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-sky-500 transition-colors duration-300 py-2"
                >
                  Blog
                </Link>
                <Link
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 font-medium hover:text-sky-500 transition-colors duration-300 py-2"
                >
                  Nos services
                </Link>
                <div className="pt-4 border-t">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-sky-600 text-white px-6 py-2.5 rounded-full hover:bg-sky-700 transition-colors font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section avec Carrousel Amélioré */}
        <section className="relative h-screen overflow-hidden">
          {/* Indicateur de progression */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-30 space-y-4">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group flex items-center"
                whileHover={{ x: -8 }}
              >
                <span className="hidden group-hover:block mr-2 text-white text-sm font-medium">
                  {`0${index + 1}`}
                </span>
                <div className="w-10 h-1 rounded-full overflow-hidden bg-white/20">
                  <motion.div
                    className="h-full bg-white"
                    initial={false}
                    animate={{
                      width: currentSlide === index ? "100%" : "0%"
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Contrôles du carrousel */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronLeft className="text-xl" />
            </motion.button>

            <div className="flex gap-3">
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <FaChevronRight className="text-xl" />
            </motion.button>
          </div>

          {/* Slides */}
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => (
              currentSlide === index && (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                >
                  {/* Image de fond avec overlay */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
                    <motion.div
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 10 }}
                      className="w-full h-full relative"
                    >
        <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
          priority
        />
                    </motion.div>
                  </div>

                  {/* Contenu du slide */}
                  <div className="relative h-screen flex items-center z-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="max-w-3xl"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: 100 }}
                          className="h-1 bg-sky-500 mb-8"
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                          {slide.title}
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl">
                          {slide.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link
                              href={slide.cta.secondary.link}
                              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors border border-white/20"
                            >
                              {slide.cta.secondary.text}
                            </Link>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Indicateur de défilement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 text-white/70"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Découvrir plus</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-8 bg-white/30 rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Services d'Assurance Section */}
        <section className="relative z-10 px-6 py-20 bg-white" id="services">
          <div className="max-w-[90rem] mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl text-black font-bold mb-6"
              >
                Nos Services d'Assurance
              </motion.h2>
            </div>

            <div className="flex flex-wrap gap-8 max-w-6xl mx-auto items-stretch justify-center px-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden group backdrop-blur-sm h-full w-64 sm:w-72"
                >
                  {/* Effet de gradient en arrière-plan au hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/60 group-hover:via-blue-50/30 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
                  
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Icône avec effet amélioré */}
                  <div className="mb-8 flex justify-center relative z-10">
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110 transform transition-transform duration-500">
                      <service.icon 
                        className="text-5xl transform group-hover:scale-110 transition-transform duration-500" 
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-xl font-bold text-gray-900 mb-10 text-center leading-tight flex-grow relative z-10 group-hover:text-blue-700 transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Bouton Je compare */}
                  {service.title === "Assurance auto" ? (
                    <Link
                      href="/assurance-auto"
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : service.title === "Assurance habitation" ? (
                    <Link
                      href="/assurance-habitation"
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : service.title === "Mutuelle santé" ? (
                    <Link
                      href="/mutuelle-sante"
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : service.title === "Assurance moto" ? (
                    <Link
                      href="/assurance-moto"
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : service.title === "Assurance emprunteur" ? (
                    <Link
                      href="/assurance-emprunteur"
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : (
                    <button 
                      className="mt-auto text-sm font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 relative z-10 group/btn"
                      style={{ color: service.color }}
                    >
                      <span>Je compare</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}

                  {/* Bordure inférieure avec effet amélioré */}
                  <div 
                    className="h-1.5 mt-6 rounded-full transition-all duration-500 group-hover:h-2 group-hover:shadow-lg relative overflow-hidden"
                    style={{ 
                      backgroundColor: service.color,
                      boxShadow: `0 0 15px ${service.color}50`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        
        {/* Section Contact Complète */}
        {showContactSection && (
          <section id="contact-section" className="relative z-10 px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                Contactez-nous
              </h2>
              <p className="text-xl text-center text-white/90 mb-16 max-w-3xl mx-auto">
                Notre équipe est à votre disposition pour répondre à toutes vos questions
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Informations de contact */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Nos Coordonnées</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-sky-500/20 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-2xl text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Adresse</h4>
                        <p className="text-sky-100">254 Rue Vendôme</p>
                        <p className="text-sky-100">69003 Lyon</p>
                        <p className="text-sky-100">France</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-sky-500/20 p-3 rounded-lg">
                        <FaPhone className="text-2xl text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Téléphone</h4>
                        <a href="tel:+33980807637" className="text-sky-100 hover:text-white transition-colors">
                          +33 9 80 80 76 37
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-sky-500/20 p-3 rounded-lg">
                        <FaLinkedin className="text-2xl text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">LinkedIn</h4>
                        <a 
                          href="https://www.linkedin.com/company/haya-assurances/about/"
          target="_blank"
          rel="noopener noreferrer"
                          className="text-sky-100 hover:text-white transition-colors"
                        >
                          Suivez-nous sur LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulaire de contact */}
                <ContactForm />

                {/* Carte */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">Notre localisation</h3>
                  <div className="w-full h-[400px] rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps?q=254%20Rue%20Vend%C3%B4me%2C%2069003%20Lyon&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
    </div>
    
    {/* Section Statistiques - DERNIÈRE SECTION DE LA PAGE */}
    <section className="relative z-10 py-20 overflow-hidden bg-gradient-to-r from-sky-900 to-blue-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_1px,_transparent_1px)] opacity-10"/>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent mb-4">
                15K+
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Clients Satisfaits
              </h3>
              <p className="text-white/80">
                Qui nous font confiance chaque jour
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent mb-4">
                98%
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Taux de Satisfaction
              </h3>
              <p className="text-white/80">
                De nos clients recommandent nos services
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <div className="text-5xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent mb-4">
                3+
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Années d'Expérience
              </h3>
              <p className="text-white/80">
                D'expertise dans l'assurance
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </RecaptchaProvider>
  );
}
