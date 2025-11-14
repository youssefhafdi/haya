"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export default function CentreInformation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900">
      <div className="absolute top-8 left-8 z-50">
        <Link href="/">
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-colors duration-300">
            <FaArrowLeft className="text-lg" />
            <span>Retour</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Centre d’information
          </motion.h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Retrouvez ici des informations utiles sur nos assurances, nos démarches et les documents à prévoir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <h2 className="text-white text-xl font-semibold mb-3">Documents utiles</h2>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Justificatif d’identité (CNI ou Passeport)</li>
              <li>Justificatif de domicile (-3 mois)</li>
              <li>Relevé d’information (assurances auto/moto)</li>
              <li>Carte grise (véhicule)</li>
            </ul>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <h2 className="text-white text-xl font-semibold mb-3">Démarches</h2>
            <ul className="list-disc list-inside text-white/80 space-y-2">
              <li>Demande de devis en ligne (auto, moto, habitation, santé)</li>
              <li>Déclaration de sinistre</li>
              <li>Suivi de dossier</li>
              <li>Résiliation et changement d’assureur</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


