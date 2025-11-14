'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const activities = [
  {
    title: "Le courtage",
    description: "VOTRE ASSURANCE SUR MESURE, NOTRE EXPERTISE INÉGALÉE.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
    points: [
      "Analyse approfondie de vos besoins",
      "Comparaison des meilleures offres du marché",
      "Négociation des conditions optimales",
      "Accompagnement personnalisé"
    ]
  },
  {
    title: "La gestion de sinistres",
    description: "UN ACCOMPAGNEMENT EXPERT POUR VOS DÉCLARATIONS.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    points: [
      "Prise en charge immédiate",
      "Suivi personnalisé de votre dossier",
      "Expertise technique dédiée",
      "Résolution rapide et efficace"
    ]
  },
  {
    title: "Le conseil",
    description: "DES SOLUTIONS ADAPTÉES À VOS ENJEUX SPÉCIFIQUES.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    points: [
      "Audit de vos contrats existants",
      "Optimisation de vos garanties",
      "Veille réglementaire",
      "Recommandations stratégiques"
    ]
  }
];

export default function NosActivites() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900">
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
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
          alt="Nos Activités"
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
              Nos Activités
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
              Découvrez notre expertise en assurance et nos services sur mesure
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="mb-32 last:mb-0"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl font-bold text-white mb-6">{activity.title}</h2>
                <div className="h-1 w-24 bg-sky-500 mb-8" />
                <p className="text-xl text-white/90 mb-8">{activity.description}</p>
                <div className="space-y-4">
                  {activity.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300">
                        <FaArrowRight className="text-sky-500 group-hover:text-white transition-colors duration-300" />
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
                    src={activity.image}
                    alt={activity.title}
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