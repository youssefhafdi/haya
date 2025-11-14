'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle, FaStar, FaClock, FaLock, FaArrowRight } from 'react-icons/fa';

export default function AssuranceEmprunteur() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    typePret: '',
    personnesAssurer: '',
    dateDebut: '',
    niveauProtection: '',
    nombrePrets: '',
    montantPret: '',
    dureePret: '',
    tauxPret: '',
    dateSignature: '',
    datePremiereEcheance: ''
  });

  const totalSteps = 6;
  const progress = step <= 1 ? 16 : step <= 2 ? 33 : step <= 3 ? 50 : step <= 4 ? 66 : step === 5 ? 83 : 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaArrowLeft />
            <span>Retour</span>
          </Link>
          <div className="text-sm">Service gratuit et sans engagement</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Assurance prêt immobilier : comparateur et devis gratuit
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Vous avez complété :</span>
              <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">Étape {step}/{totalSteps} ({Math.round(progress)}%)</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <FaStar className="text-blue-600 text-2xl" />
            <div>
              <p className="font-semibold text-gray-900">Le meilleur prix</p>
              <p className="text-sm text-gray-600">Les meilleurs prix du marché</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <FaClock className="text-green-600 text-2xl" />
            <div>
              <p className="font-semibold text-gray-900">Service gratuit</p>
              <p className="text-sm text-gray-600">Complètement gratuit, sans engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
            <FaLock className="text-purple-600 text-2xl" />
            <div>
              <p className="font-semibold text-gray-900">Données protégées</p>
              <p className="text-sm text-gray-600">Protection de votre vie privée</p>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {/* Step 1: Type de prêt */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Type de prêt à assurer ?
                </h2>
                <div className="space-y-4">
                  {[
                    'Crédit immobilier pour une résidence principale',
                    'Crédit immobilier pour une résidence secondaire',
                    'Crédit immobilier pour un investissement locatif',
                    'Crédit conso'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFormData('typePret', option);
                        setStep(2);
                      }}
                      className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <div className="font-semibold text-lg text-gray-900">{option}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personnes à assurer */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Qui sont les personnes à assurer ?
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      updateFormData('personnesAssurer', 'vous');
                      setStep(3);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-lg text-gray-900">Vous</div>
                  </button>
                  <button
                    onClick={() => {
                      updateFormData('personnesAssurer', 'vous-et-co-emprunteur');
                      setStep(3);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-lg text-gray-900">Vous et votre co-emprunteur</div>
                  </button>
                </div>
                <button onClick={handleBack} className="text-blue-600 hover:underline">
                  ← Retour
                </button>
              </motion.div>
            )}

            {/* Step 3: Date de début et nombre de prêts */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  A partir de quel jour voulez-vous être assuré ?
                </h2>
                <input
                  type="date"
                  onChange={(e) => {
                    updateFormData('dateDebut', e.target.value);
                  }}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg mb-8"
                />

                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Combien de prêts avez-vous à assurer ?
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      updateFormData('nombrePrets', '1');
                      setStep(4);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-lg text-gray-900">1 seul prêt</div>
                  </button>
                  <button
                    onClick={() => {
                      updateFormData('nombrePrets', '2');
                      setStep(4);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-semibold text-lg text-gray-900">2 prêts</div>
                  </button>
                </div>
                <button onClick={handleBack} className="text-blue-600 hover:underline">
                  ← Retour
                </button>
              </motion.div>
            )}

            {/* Step 4: Niveau de protection */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Quel niveau de protection recherchez-vous ?
                </h2>
                <p className="text-gray-600 mb-6">
                  Vous pourrez modifier ce critère sur la page de résultats
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      updateFormData('niveauProtection', 'minimum');
                      setStep(5);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-bold text-lg text-gray-900 mb-2">
                      Formule Minimum
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Elle comprend les garanties :
                    </div>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      <li>Décès</li>
                      <li>Perte Totale et Irréversible d'Autonomie</li>
                    </ul>
                  </button>
                  <button
                    onClick={() => {
                      updateFormData('niveauProtection', 'optimum');
                      setStep(5);
                    }}
                    className="w-full p-6 text-left border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-bold text-lg text-gray-900 mb-2">
                      Formule Optimum
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Elle comprend les garanties :
                    </div>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      <li>Décès</li>
                      <li>Perte Totale et Irréversible d'Autonomie</li>
                      <li>Invalidité Permanente Totale</li>
                      <li>Incapacité Temporaire Totale de Travail</li>
                    </ul>
                    <div className="text-xs text-blue-600 mt-2 font-semibold">
                      La formule Optimum sera requise par les banques pour un prêt concernant une résidence principale ou secondaire.
                    </div>
                  </button>
                </div>
                <button onClick={handleBack} className="text-blue-600 hover:underline">
                  ← Retour
                </button>
              </motion.div>
            )}

            {/* Step 5: Informations du prêt */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations sur votre prêt
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant du prêt (€)
                    </label>
                    <input
                      type="number"
                      onChange={(e) => updateFormData('montantPret', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                      placeholder="Ex: 200000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée du prêt (années)
                    </label>
                    <input
                      type="number"
                      onChange={(e) => updateFormData('dureePret', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                      placeholder="Ex: 20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taux du prêt (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      onChange={(e) => updateFormData('tauxPret', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                      placeholder="Ex: 3.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de signature du prêt
                    </label>
                    <input
                      type="date"
                      onChange={(e) => updateFormData('dateSignature', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de première échéance
                    </label>
                    <input
                      type="date"
                      onChange={(e) => updateFormData('datePremiereEcheance', e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(6)}
                    className="flex-1 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Continuer
                  </button>
                </div>
                <button onClick={handleBack} className="text-blue-600 hover:underline">
                  ← Retour
                </button>
              </motion.div>
            )}

            {/* Step 6: Completion */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6"
              >
                <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Votre devis personnalisé est en préparation
                </h2>
                <p className="text-lg text-gray-600">
                  Nous allons vous contacter dans les plus brefs délais avec les meilleures offres adaptées à vos besoins.
                </p>
                <div className="pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continuer
                    <FaArrowRight />
                  </Link>
                </div>
                <button onClick={handleBack} className="block mx-auto text-blue-600 hover:underline mt-4">
                  ← Retour
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Vous avez des questions ? <Link href="/contact" className="text-blue-600 hover:underline">Contactez-nous</Link></p>
        </div>
      </div>
    </div>
  );
}

