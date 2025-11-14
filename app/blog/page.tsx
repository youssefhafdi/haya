'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaUser, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const blogPosts = [
  {
    title: "HAYA Assurances : L'innovation au service de votre protection",
    excerpt: "Depuis 3 ans, HAYA Assurances révolutionne le monde de l'assurance avec une approche moderne et innovante. Notre jeune équipe dynamique s'engage chaque jour à vous offrir des solutions d'assurance adaptées à l'ère du digital, combinant expertise technique et service personnalisé.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2071&auto=format&fit=crop",
    date: "15 Mars 2024",
    author: "HAYA Assurances",
    category: "Notre Histoire"
  },
  {
    title: "Protection des données : notre priorité absolue",
    excerpt: "Dans un monde de plus en plus connecté, la sécurité de vos données est notre priorité. Découvrez comment HAYA Assurances met en place des protocoles stricts et des solutions innovantes pour garantir la confidentialité et la protection de vos informations personnelles.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    date: "10 Mars 2024",
    author: "HAYA Assurances",
    category: "Sécurité"
  },
  {
    title: "Nos solutions d'assurance sur mesure",
    excerpt: "Chez HAYA Assurances, nous comprenons que chaque client est unique. C'est pourquoi nous développons des solutions d'assurance personnalisées qui s'adaptent parfaitement à vos besoins, que vous soyez un particulier ou une entreprise.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    date: "5 Mars 2024",
    author: "HAYA Assurances",
    category: "Services"
  }
];

export default function Blog() {
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
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Blog"
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
              Blog
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
              Découvrez nos actualités et notre expertise en assurance
            </motion.p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-sky-500 text-white text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-white/80 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-sky-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-sky-500" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Section Contact avec style similaire à Nos Activités */}
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-sky-900 to-gray-900">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Contactez-nous</h2>
            <div className="h-1 w-24 bg-sky-500 mx-auto mb-8" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-sky-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-4 rounded-xl">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Téléphone</h3>
                  <p className="text-white/80">Appelez-nous directement</p>
                </div>
              </div>
              <Link
                href="tel:+33980807637"
                className="flex items-center justify-center gap-2 bg-sky-500 text-white py-3 px-6 rounded-xl hover:bg-sky-600 transition-colors mt-4"
              >
                <span>+33 9 80 80 76 37</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-10">
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white font-bold">
            1
          </button>
        </div>
      </div>
    </div>
  );
} 