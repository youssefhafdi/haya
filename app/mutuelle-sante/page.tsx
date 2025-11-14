"use client";

import { useState, FormEvent, useRef } from 'react';
import Select from "../components/Select";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

type Step = 1 | 2 | 3 | 4;

export default function MutuelleSanteDevis() {
  const [step, setStep] = useState<Step>(1);
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const validateStep = (currentStep: Step): boolean => {
    const root = formRef.current;
    if (!root) return true;
    const fields = root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `[data-step="${currentStep}"] input, [data-step="${currentStep}"] select, [data-step="${currentStep}"] textarea`
    );
    let isValid = true;
    fields.forEach((el) => {
      if (!el.checkValidity()) {
        el.reportValidity();
        if (isValid) {
          el.focus();
        }
        isValid = false;
      }
    });
    return isValid;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => (Math.min(4, (s + 1)) as Step));
  };
  const prev = () => setStep((s) => (Math.max(1, (s - 1)) as Step));

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult('Envoi en cours...');
    setErrorMessage('');

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const access_token = process.env.NEXT_PUBLIC_ACCESS_KEY;

    formData.append('access_key', access_token || '');
    formData.append('subject', 'Demande de devis Mutuelle Santé');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult('Demande envoyée avec succès !');
        formElement.reset();
        setStep(1);
      } else {
        setErrorMessage(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
    }
  };

  const Progress = () => {
    const percent = [0, 25, 50, 75, 100][step];
    return (
      <div className="w-full">
        <div className="flex justify-between text-white/80 text-sm mb-2">
          <span>Profil</span>
          <span>Assuré</span>
          <span>Mutuelle</span>
          <span>Coordonnées</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-sky-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-sky-900">
      <div className="absolute top-8 left-8 z-50">
        <Link href="/contact">
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-colors duration-300">
            <FaArrowLeft className="text-lg" />
            <span>Retour</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-28">
        <div className="text-center mb-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Devis Mutuelle Santé
          </motion.h1>
          <p className="text-white/90">Complétez les étapes ci-dessous. C'est rapide.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
          <Progress />

          {errorMessage && <p className="text-red-400 mt-6">{errorMessage}</p>}
          {result && <p className="text-green-400 mt-6">{result}</p>}

          <form ref={formRef} onSubmit={onSubmit} className="mt-8">
            {/* Métadonnées pour le routage côté boîte mail */}
            <input type="hidden" name="from_name" value="Mutuelle Santé" />
            <input type="hidden" name="form_name" value="Mutuelle Santé" />
            <input type="hidden" name="from_page" value="/mutuelle-sante" />

            {/* Étape 1: Profil */}
            <div data-step="1" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 1 ? '' : 'hidden'}`}>
              <div>
                <label htmlFor="quiAssurer" className="block text-sm font-medium text-white mb-2">Qui souhaitez-vous assurer ?</label>
                <Select
                  id="quiAssurer"
                  name="Qui assurer"
                  required
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Moi uniquement", label: "Moi uniquement" },
                    { value: "Moi et mon conjoint/concubin", label: "Moi et mon conjoint/concubin" },
                    { value: "Moi et mes enfants", label: "Moi et mes enfants" },
                    { value: "Toute la famille", label: "Toute la famille" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="nbEnfants" className="block text-sm font-medium text-white mb-2">Nombre d'enfants à assurer</label>
                <Select
                  id="nbEnfants"
                  name="Nombre d'enfants"
                  required
                  options={[
                    { value: "0", label: "0" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4+", label: "4 ou plus" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="dateNaissance" className="block text-sm font-medium text-white mb-2">Date de naissance</label>
                <input id="dateNaissance" name="Date de naissance" type="date" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
              </div>
              <div>
                <label htmlFor="codePostal" className="block text-sm font-medium text-white mb-2">Code postal</label>
                <input
                  id="codePostal"
                  name="Code postal"
                  type="text"
                  required
                  pattern="^[0-9]{5}$"
                  title="Code postal à 5 chiffres"
                  inputMode="numeric"
                  maxLength={5}
                  autoComplete="postal-code"
                  onInput={(e) => {
                    const target = e.currentTarget as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9]/g, '').slice(0, 5);
                  }}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                  placeholder="75001"
                />
              </div>
            </div>

            {/* Étape 2: Informations sur l'assuré */}
            <div data-step="2" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 2 ? '' : 'hidden'}`}>
              <div>
                <label htmlFor="nomPrenom" className="block text-sm font-medium text-white mb-2">Nom et prénom</label>
                <input id="nomPrenom" name="Nom et prénom" type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
              </div>
              <div>
                <label htmlFor="situationProfessionnelle" className="block text-sm font-medium text-white mb-2">Situation professionnelle</label>
                <Select
                  id="situationProfessionnelle"
                  name="Situation professionnelle"
                  required
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Salarié", label: "Salarié" },
                    { value: "Fonctionnaire", label: "Fonctionnaire" },
                    { value: "Indépendant", label: "Indépendant" },
                    { value: "Retraité", label: "Retraité" },
                    { value: "Étudiant", label: "Étudiant" },
                    { value: "Sans emploi", label: "Sans emploi" },
                    { value: "Autre", label: "Autre" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="regimeSocial" className="block text-sm font-medium text-white mb-2">Régime social</label>
                <Select
                  id="regimeSocial"
                  name="Régime social"
                  required
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Régime général (CPAM)", label: "Régime général (CPAM)" },
                    { value: "Régime agricole (MSA)", label: "Régime agricole (MSA)" },
                    { value: "Régime social des indépendants (RSI)", label: "Régime social des indépendants (RSI)" },
                    { value: "Autre", label: "Autre" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="revenus" className="block text-sm font-medium text-white mb-2">Revenus annuels (optionnel)</label>
                <Select
                  id="revenus"
                  name="Revenus annuels"
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Moins de 15 000€", label: "Moins de 15 000€" },
                    { value: "15 000€ - 25 000€", label: "15 000€ - 25 000€" },
                    { value: "25 000€ - 40 000€", label: "25 000€ - 40 000€" },
                    { value: "40 000€ - 60 000€", label: "40 000€ - 60 000€" },
                    { value: "Plus de 60 000€", label: "Plus de 60 000€" },
                  ]}
                />
              </div>
            </div>

            {/* Étape 3: Situation mutuelle */}
            <div data-step="3" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 3 ? '' : 'hidden'}`}>
              <div>
                <label htmlFor="mutuelleActuelle" className="block text-sm font-medium text-white mb-2">Avez-vous une mutuelle actuellement ?</label>
                <Select
                  id="mutuelleActuelle"
                  name="Mutuelle actuelle"
                  required
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Oui", label: "Oui" },
                    { value: "Non", label: "Non" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="niveauProtection" className="block text-sm font-medium text-white mb-2">Niveau de protection souhaité</label>
                <Select
                  id="niveauProtection"
                  name="Niveau de protection"
                  required
                  options={[
                    { value: "", label: "Sélectionnez" },
                    { value: "Économique", label: "Économique" },
                    { value: "Standard", label: "Standard" },
                    { value: "Comfort", label: "Comfort" },
                    { value: "Premium", label: "Premium" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="dateDebut" className="block text-sm font-medium text-white mb-2">Date de début souhaitée</label>
                <input id="dateDebut" name="Date de début" type="date" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
              </div>
              <div>
                <label htmlFor="besoinsSpecifiques" className="block text-sm font-medium text-white mb-2">Besoins spécifiques (optionnel)</label>
                <Select
                  id="besoinsSpecifiques"
                  name="Besoins spécifiques"
                  options={[
                    { value: "", label: "Aucun" },
                    { value: "Optique", label: "Optique" },
                    { value: "Dentaire", label: "Dentaire" },
                    { value: "Hospitalisation", label: "Hospitalisation" },
                    { value: "Médecine douce", label: "Médecine douce" },
                    { value: "Plusieurs besoins", label: "Plusieurs besoins" },
                  ]}
                />
              </div>
            </div>

            {/* Étape 4: Coordonnées */}
            <div data-step="4" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 4 ? '' : 'hidden'}`}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Adresse mail</label>
                <input id="email" name="Email" type="email" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">Numéro de téléphone</label>
                <input
                  id="phone"
                  name="Téléphone"
                  type="tel"
                  pattern="^[0-9\s\+\-\(\)]{10,}$"
                  title="Veuillez entrer un numéro de téléphone valide (10 chiffres minimum)"
                  inputMode="tel"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500"
                  placeholder="Ex: +33 6 12 34 56 78"
                />
              </div>
              <div>
                <label htmlFor="ville" className="block text-sm font-medium text-white mb-2">Ville</label>
                <input id="ville" name="Ville" type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" placeholder="Ex: Paris" />
              </div>
              <div>
                <label htmlFor="adresse" className="block text-sm font-medium text-white mb-2">Adresse (optionnel)</label>
                <input id="adresse" name="Adresse" type="text" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" placeholder="Ex: 10 rue de la Paix" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="commentaires" className="block text-sm font-medium text-white mb-2">Commentaires (optionnel)</label>
                <textarea id="commentaires" name="Commentaires" rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" placeholder="Précisions utiles pour votre devis..."></textarea>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-3">
                <button type="button" onClick={prev} disabled={step === 1} className={`px-6 py-3 rounded-lg font-semibold border border-white/20 text-white ${step === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/10'}`}>
                  Étape précédente
                </button>
                {step < 4 && (
                  <button type="button" onClick={next} className="px-6 py-3 rounded-lg font-semibold bg-sky-600 hover:bg-sky-700 text-white">
                    Étape suivante
                  </button>
                )}
              </div>
              {step === 4 && (
                <button type="submit" className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white">
                  Envoyer la demande
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
