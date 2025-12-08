'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter, FaShieldAlt, FaFileContract, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-sky-900 to-gray-900 text-white relative overflow-hidden" suppressHydrationWarning>
      {/* Pattern de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Contenu principal du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Colonne 1: À propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              <FaShieldAlt className="text-sky-400" />
              Haya Assurances
            </h3> */}
             <Image
                src="/assets/h.png"
                alt="ORIAS"
                width={200}
                height={200}
                className="object-contain"
              />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre partenaire de confiance pour tous vos besoins en assurance. 
              Nous vous accompagnons avec professionnalisme et expertise pour protéger ce qui compte le plus pour vous.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/company/haya-assurances/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="text-lg" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook className="text-lg" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter className="text-lg" />
              </motion.a>
            </div>
          </motion.div>

          {/* Colonne 2: Nos services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/assurance-auto" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Assurance auto
                </Link>
              </li>
              <li>
                <Link href="/assurance-habitation" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Assurance habitation
                </Link>
              </li>
              <li>
                <Link href="/mutuelle-sante" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Mutuelle santé
                </Link>
              </li>
              <li>
                <Link href="/assurance-moto" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Assurance moto
                </Link>
              </li>
              <li>
                <Link href="/assurance-emprunteur" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Assurance emprunteur
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Assurance pro
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Colonne 3: Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/nos-activites" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Nos activités
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Engagements qualité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/reclamations" className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Réclamations
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Colonne 4: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-sky-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  17 Place du Général de Gaulle<br />
                     Montreuil, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-sky-400 flex-shrink-0" />
                <a href="tel:+33980807637" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">
                  +33 9 80 80 76 37
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-sky-400 flex-shrink-0" />
                <a href="mailto:Hayaassurances@gmail.com" className="text-gray-300 hover:text-sky-400 transition-colors duration-300">
                  Hayaassurances@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Section inférieure */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Mentions légales */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-sky-400 transition-colors duration-300 flex items-center gap-2">
              <FaLock className="text-xs" />
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-sky-400 transition-colors duration-300 flex items-center gap-2">
              <FaFileContract className="text-xs" />
              Politique de confidentialité
            </Link>
            <Link href="#" className="hover:text-sky-400 transition-colors duration-300 flex items-center gap-2">
              <FaShieldAlt className="text-xs" />
              CGU
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            <p suppressHydrationWarning>© {currentYear} Haya Assurances. Tous droits réservés.</p>
          </div>
        </div>

        {/* Certification */}
        {/* <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <p className="flex items-center gap-3">
             
              Intermédiaire en assurance immatriculé ORIAS
            </p>
            <span className="hidden md:block">•</span>
            <p>Service gratuit et sans engagement</p>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
