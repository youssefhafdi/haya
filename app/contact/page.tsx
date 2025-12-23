'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Contact() {
  const [showReclamation, setShowReclamation] = useState(false);
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reclamationType, setReclamationType] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Envoi en cours...");
    setErrorMessage("");
    
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const access_token = process.env.NEXT_PUBLIC_ACCESS_KEY;

    // Champ anti-bot (honeypot) : si rempli, on ignore l'envoi
    if (formData.get("botcheck")) {
      setResult("");
      setErrorMessage("");
      return;
    }

    if (!access_token) {
      setResult("");
      setErrorMessage("Clé d'accès du formulaire manquante. Merci de configurer NEXT_PUBLIC_ACCESS_KEY dans le fichier .env.local.");
      return;
    }

    formData.append("access_key", access_token);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message envoyé avec succès!");
        formElement.reset();
      } else {
        console.log("Erreur", data);
        setErrorMessage(data.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setErrorMessage("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900">
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

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Contactez-nous
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            className="h-1 bg-sky-500 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
          >
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </motion.p>

          <div className="flex justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReclamation(false)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                !showReclamation 
                  ? 'bg-sky-600 text-white shadow-lg' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Contact général
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReclamation(true)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                showReclamation 
                  ? 'bg-sky-600 text-white shadow-lg' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Faire une réclamation
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-8">Nos Coordonnées</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Notre Adresse</h3>
                    <p className="text-white/80">254 Rue Vendôme</p>
                    <p className="text-white/80">69003 Lyon</p>
                    <p className="text-white/80">France</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <FaPhone className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Téléphone</h3>
                    <a 
                      href="tel:+33980807637" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      +33 9 80 80 76 37
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sky-500/20 p-3 rounded-lg">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <a 
                      href="mailto:contact@haya-assurances.com" 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      contact@haya-assurances.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-8">
                {showReclamation ? (
                  <div className="flex items-center gap-3">
                    <FaExclamationCircle className="text-red-500" />
                    <span>Formulaire de réclamation</span>
                  </div>
                ) : (
                  "Envoyez-nous un message"
                )}
              </h2>

              {errorMessage && (
                <p className="text-red-400 mb-4">{errorMessage}</p>
              )}

              {result && (
                <p className="text-green-400 mb-4">{result}</p>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Champ anti-bot (honeypot) caché pour les utilisateurs humains */}
                <div className="hidden">
                  <label htmlFor="botcheck" className="block text-sm text-white/60">
                    Laissez ce champ vide
                  </label>
                  <input
                    type="text"
                    id="botcheck"
                    name="botcheck"
                    autoComplete="off"
                    tabIndex={-1}
                    className="opacity-0"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                    placeholder="votre@email.com"
                  />
                </div>

                {showReclamation && (
                  <>
                    <div>
                      <label htmlFor="reference" className="block text-sm font-medium text-white mb-2">
                        Numéro de contrat / référence
                      </label>
                      <input
                        type="text"
                        id="reference"
                        name="reference"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                        placeholder="Votre numéro de contrat"
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-white mb-2">
                        Type de réclamation
                      </label>
                      <Select value={reclamationType} onValueChange={setReclamationType} required>
                        <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                          <SelectValue placeholder="Sélectionnez le type de réclamation" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          <SelectItem value="contrat" className="text-white hover:bg-white/10 focus:bg-white/10">Contrat d'assurance</SelectItem>
                          <SelectItem value="sinistre" className="text-white hover:bg-white/10 focus:bg-white/10">Déclaration de sinistre</SelectItem>
                          <SelectItem value="remboursement" className="text-white hover:bg-white/10 focus:bg-white/10">Remboursement</SelectItem>
                          <SelectItem value="autre" className="text-white hover:bg-white/10 focus:bg-white/10">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="type" value={reclamationType} />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    {showReclamation ? "Description détaillée de votre réclamation" : "Message"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                    placeholder={showReclamation ? "Décrivez en détail votre réclamation..." : "Votre message..."}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    showReclamation
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500'
                      : 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500'
                  }`}
                >
                  {showReclamation ? "Envoyer la réclamation" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-8">Notre localisation</h2>
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
        </motion.div>
      </div>
    </div>
  );
}
