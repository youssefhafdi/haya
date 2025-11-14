'use client';

import { FaComments, FaExclamationCircle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AVotreEcoute() {
  const [subject, setSubject] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-400 to-sky-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/50 via-transparent to-sky-600/50 backdrop-blur-3xl"></div>

      {/* Bulles d'arrière-plan animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-sky-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-8"
        >
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="Haya Assurances Logo" 
              width={200} 
              height={53} 
              className="w-auto h-[40px]"
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link 
              href="/reclamations" 
              className="group relative flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-500 ease-out"
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 group-hover:animate-shine"></div>
              
              {/* Bordure animée */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/30 via-red-500/30 to-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Contenu du bouton */}
              <div className="relative flex items-center gap-3">
                {/* Conteneur de l'icône avec animation */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-red-600 rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-br from-amber-400 to-red-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FaExclamationCircle className="text-lg text-white" />
                  </div>
                </div>

                {/* Texte avec animation */}
                <div className="flex items-center">
                  <span className="font-medium text-white group-hover:text-white/90 transition-colors duration-300">Réclamations</span>
                  <div className="mx-3 h-4 w-px bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 hidden sm:block">
                    Déposer une réclamation
                  </span>
                </div>
              </div>

              {/* Effet de surbrillance au survol */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/50 to-red-500/50 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="flex gap-6 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-white hover:text-sky-200 transition-colors font-medium">
            Accueil
          </Link>
          <Link href="#" className="text-white hover:text-sky-200 transition-colors font-medium">
            A propos
          </Link>
        </motion.div>
      </nav>

      {/* Contenu Principal */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl">
                <FaComments className="text-4xl text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nous Contacter
            </h1>
            <p className="text-xl text-white/90">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form className="space-y-6">
              <div className="group/field">
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">Nom et Prénom</label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-sky-500/40 transition-all duration-300"
                  placeholder="Votre nom et prénom"
                  required
                />
              </div>

              <div className="group/field">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Adresse Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-sky-500/40 transition-all duration-300"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="group/field">
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">Numéro de Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="^[0-9\s\+\-\(\)]{10,}$"
                  title="Veuillez entrer un numéro de téléphone valide (10 chiffres minimum)"
                  inputMode="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-sky-500/40 transition-all duration-300"
                  placeholder="Ex: 06 12 34 56 78"
                  required
                />
              </div>

              <div className="group/field">
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">Sujet</label>
                <Select value={subject} onValueChange={setSubject} required>
                  <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-sky-500/40">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="devis" className="text-white hover:bg-white/10 focus:bg-white/10">Demande de devis</SelectItem>
                    <SelectItem value="information" className="text-white hover:bg-white/10 focus:bg-white/10">Demande d'information</SelectItem>
                    <SelectItem value="rendez-vous" className="text-white hover:bg-white/10 focus:bg-white/10">Prise de rendez-vous</SelectItem>
                    <SelectItem value="autre" className="text-white hover:bg-white/10 focus:bg-white/10">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="subject" value={subject} />
              </div>

              <div className="group/field">
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-sky-500/40 transition-all duration-300 resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-sky-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Envoyer le message
              </button>

              <div className="text-center mt-6">
                <p className="text-white/80 text-sm">
                  Pour déposer une réclamation, veuillez vous rendre sur notre{' '}
                  <Link href="/reclamations" className="text-white hover:text-sky-200 underline">
                    page dédiée aux réclamations
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 