"use client";

import { useState, FormEvent, useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

type Step = 1 | 2 | 3 | 4;

export default function AutoDevis() {
  const [step, setStep] = useState<Step>(1);
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  // State for all select fields
  const [usageVehicule, setUsageVehicule] = useState('');
  const [bonusMalus, setBonusMalus] = useState('');
  const [assureActuellement, setAssureActuellement] = useState('');
  const [typeGarantie, setTypeGarantie] = useState('');
  const [sinistres, setSinistres] = useState('');

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
    formData.append('subject', 'Demande de devis Auto');

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
          <span>Véhicule</span>
          <span>Conducteur</span>
          <span>Assurance</span>
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
        <Link href="/">
          <motion.div whileHover={{ x: -5 }} className="flex items-center gap-2 text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/40 transition-colors duration-300">
            <FaArrowLeft className="text-lg" />
            <span>Retour</span>
          </motion.div>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-28">
        <div className="text-center mb-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Devis Assurance Auto
          </motion.h1>
          <p className="text-white/90">Complétez les étapes ci-dessous. C'est rapide.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20">
          <Progress />

          {errorMessage && <p className="text-red-400 mt-6">{errorMessage}</p>}
          {result && <p className="text-green-400 mt-6">{result}</p>}

          <form ref={formRef} onSubmit={onSubmit} className="mt-8">
            {/* Métadonnées pour le routage côté boîte mail */}
            <input type="hidden" name="from_name" value="Assurance Auto" />
            <input type="hidden" name="form_name" value="Assurance Auto" />
            <input type="hidden" name="from_page" value="/assurance-auto" />
            <div data-step="1" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 1 ? '' : 'hidden'}`}>
                <div className="md:col-span-2">
                  <label htmlFor="immatriculation" className="block text-sm font-medium text-white mb-2">Plaque d'immatriculation (si connue)</label>
                  <input id="immatriculation" name="Plaque d'immatriculation" type="text" placeholder="AB-123-CD" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="marque" className="block text-sm font-medium text-white mb-2">Marque</label>
                  <input id="marque" name="Marque" type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="modele" className="block text-sm font-medium text-white mb-2">Modèle</label>
                  <input id="modele" name="Modèle" type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="miseEnCirculation" className="block text-sm font-medium text-white mb-2">Date de 1ère mise en circulation</label>
                  <input id="miseEnCirculation" name="Mise en circulation" type="month" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="usage" className="block text-sm font-medium text-white mb-2">Usage du véhicule</label>
                  <Select value={usageVehicule} onValueChange={setUsageVehicule} required>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="Privé" className="text-white hover:bg-white/10 focus:bg-white/10">Privé</SelectItem>
                      <SelectItem value="Privé + trajet travail" className="text-white hover:bg-white/10 focus:bg-white/10">Privé + trajet travail</SelectItem>
                      <SelectItem value="Professionnel" className="text-white hover:bg-white/10 focus:bg-white/10">Professionnel</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="Usage" value={usageVehicule} />
                </div>
              </div>

            <div data-step="2" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 2 ? '' : 'hidden'}`}>
                <div>
                  <label htmlFor="nomPrenom" className="block text-sm font-medium text-white mb-2">Nom et prénom</label>
                  <input id="nomPrenom" name="Nom et prénom" type="text" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-white mb-2">Date de naissance</label>
                  <input id="dateNaissance" name="Date de naissance" type="date" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="datePermis" className="block text-sm font-medium text-white mb-2">Date d'obtention du permis</label>
                  <input id="datePermis" name="Date du permis" type="date" required className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
                </div>
                <div>
                  <label htmlFor="bonusMalus" className="block text-sm font-medium text-white mb-2">Bonus / Malus</label>
                  <Select value={bonusMalus} onValueChange={setBonusMalus} required>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="0.50" className="text-white hover:bg-white/10 focus:bg-white/10">0.50</SelectItem>
                      <SelectItem value="0.57" className="text-white hover:bg-white/10 focus:bg-white/10">0.57</SelectItem>
                      <SelectItem value="0.64" className="text-white hover:bg-white/10 focus:bg-white/10">0.64</SelectItem>
                      <SelectItem value="0.71" className="text-white hover:bg-white/10 focus:bg-white/10">0.71</SelectItem>
                      <SelectItem value="0.76" className="text-white hover:bg-white/10 focus:bg-white/10">0.76</SelectItem>
                      <SelectItem value="0.82" className="text-white hover:bg-white/10 focus:bg-white/10">0.82</SelectItem>
                      <SelectItem value="0.90" className="text-white hover:bg-white/10 focus:bg-white/10">0.90</SelectItem>
                      <SelectItem value="1.00" className="text-white hover:bg-white/10 focus:bg-white/10">1.00</SelectItem>
                      <SelectItem value=">1.00" className="text-white hover:bg-white/10 focus:bg-white/10">Supérieur à 1.00 (malus)</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="Bonus / Malus" value={bonusMalus} />
                </div>
              </div>

            <div data-step="3" className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${step === 3 ? '' : 'hidden'}`}>
                <div>
                  <label htmlFor="assureActuellement" className="block text-sm font-medium text-white mb-2">Assuré actuellement ?</label>
                  <Select value={assureActuellement} onValueChange={setAssureActuellement} required>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="Oui" className="text-white hover:bg-white/10 focus:bg-white/10">Oui</SelectItem>
                      <SelectItem value="Non" className="text-white hover:bg-white/10 focus:bg-white/10">Non</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="Assuré actuellement" value={assureActuellement} />
                </div>
                <div>
                  <label htmlFor="typeGarantie" className="block text-sm font-medium text-white mb-2">Garantie souhaitée</label>
                  <Select value={typeGarantie} onValueChange={setTypeGarantie} required>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="Tiers" className="text-white hover:bg-white/10 focus:bg-white/10">Tiers</SelectItem>
                      <SelectItem value="Tiers +" className="text-white hover:bg-white/10 focus:bg-white/10">Tiers +</SelectItem>
                      <SelectItem value="Tous risques" className="text-white hover:bg-white/10 focus:bg-white/10">Tous risques</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="Garantie souhaitée" value={typeGarantie} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="sinistres" className="block text-sm font-medium text-white mb-2">Sinistres sur 36 mois</label>
                  <Select value={sinistres} onValueChange={setSinistres} required>
                    <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="0" className="text-white hover:bg-white/10 focus:bg-white/10">0</SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-white/10 focus:bg-white/10">1</SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-white/10 focus:bg-white/10">2</SelectItem>
                      <SelectItem value=">=3" className="text-white hover:bg-white/10 focus:bg-white/10">3 ou plus</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="Sinistres (36 mois)" value={sinistres} />
                </div>
              </div>

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
                <div>
                  <label htmlFor="adresse" className="block text-sm font-medium text-white mb-2">Adresse</label>
                  <input id="adresse" name="Adresse" type="text" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sky-500" />
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
