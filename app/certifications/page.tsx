'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPhone, FaEnvelope, FaArrowLeft, FaCheckCircle, FaAward, FaShieldAlt } from 'react-icons/fa';

const certifications = [
  {
    title: "Certification ORIAS",
    description: "GARANTIE DE PROFESSIONNALISME ET DE CONFORMITÉ RÉGLEMENTAIRE",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
    points: [
      "Immatriculation officielle en tant qu'intermédiaire en assurance",
      "Respect strict des obligations légales et réglementaires",
      "Vérification annuelle des compétences professionnelles",
      "Garantie financière pour la protection des clients"
    ]
  },
  {
    title: "Label Qualité",
    description: "EXCELLENCE ET ENGAGEMENT DANS LA SATISFACTION CLIENT",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    points: [
      "Processus de gestion certifié ISO 9001",
      "Suivi rigoureux des indicateurs de satisfaction",
      "Formation continue des équipes",
      "Audits réguliers des procédures"
    ]
  },
  {
    title: "Accréditations Professionnelles",
    description: "RECONNAISSANCE DE NOTRE EXPERTISE PAR LES ACTEURS DU MARCHÉ",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    points: [
      "Partenariats avec les principales compagnies d'assurance",
      "Habilitation à la gestion des risques spéciaux",
      "Certification en conseil patrimonial",
      "Agrément pour les risques d'entreprise"
    ]
  }
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900" suppressHydrationWarning>
      {/* Bouton Retour */}
      <div className="absolute top-8 left-8 z-50">
        <Link href="/">
          <motion.div
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-colors duration-300"
          >
            <FaArrowLeft className="text-lg" />
            <span>Retour</span>
          </motion.div>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop"
          alt="Engagements qualité"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Engagements qualité
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              className="h-1 bg-sky-500 mx-auto mb-8"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 max-w-2xl mx-auto px-6"
            >
              La garantie d'un service professionnel et certifié pour votre tranquillité
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {certifications.map((certification, index) => (
          <motion.div
            key={certification.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="mb-32 last:mb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-bold text-white mb-6">{certification.title}</h2>
                <div className="h-1 w-24 bg-sky-500 mb-8" />
                <p className="text-xl text-white/90 mb-8">{certification.description}</p>
                <div className="space-y-4">
                  {certification.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                        <FaCheckCircle className="text-sky-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="text-lg text-white/80 group-hover:text-white transition-colors duration-300">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={certification.image}
                    alt={certification.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Contact */}
      <div className="bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Contactez-nous</h2>
            <p className="text-xl text-white/80">Notre équipe est à votre disposition pour répondre à vos questions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="tel:+33980807637"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors duration-300 px-8 py-4 rounded-xl text-white"
            >
              <FaPhone className="text-2xl" />
              <span>+33 9 80 80 76 37</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-4 bg-sky-500 hover:bg-sky-600 transition-colors duration-300 px-8 py-4 rounded-xl text-white"
            >
              <FaEnvelope className="text-2xl" />
              <span>Nous contacter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 