import { useState } from "react";
import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Veuillez entrer un email valide"),
  phone: z.string().optional(),
  practiceName: z.string().min(2, "Le nom du centre est requis"),
  practiceSize: z.string().min(1, "Veuillez sélectionner la taille"),
  specialty: z.string().min(1, "Veuillez sélectionner votre spécialité"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const specialties = [
  "Kinésithérapie générale",
  "Kinésithérapie du sport",
  "Rééducation",
  "Pédiatrie",
  "Gériatrie",
  "Orthopédie",
  "Neurologie",
  "Respiratoire",
  "Périnéologie",
  "Autre",
];

const practiceSizes = [
  "Cabinet individuel (1 praticien)",
  "Petit centre (2-5 praticiens)",
  "Centre moyen (6-15 praticiens)",
  "Grand centre (16-50 praticiens)",
  "Réseau / Enterprise (50+ praticiens)",
];

export const FinalCTA = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    trackEvent("contact_form_submit", {
      specialty: data.specialty,
      practiceSize: data.practiceSize,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`text-white transition-all duration-700 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à transformer la gestion de votre centre ?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Rejoignez les professionnels de santé qui ont déjà modernisé leur
              pratique avec SMC – Smart Medical Centers. Essai gratuit sans
              carte bancaire.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Mise en place rapide",
                "Formation incluse",
                "Accompagnement personnalisé",
                "Support réactif",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <Icons.CheckCircle2 className="w-6 h-6 text-accent-400" />
                  <span className="text-primary-50">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-8 border-t border-white/10">
              <p className="text-primary-200 text-sm">
                Ou contactez-nous directement :
              </p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="tel:+33762189273"
                  className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors"
                >
                  <Icons.Phone className="w-5 h-5" />
                  07 62 18 92 73
                </a>
                <a
                  href="mailto:smartmedicenters@gmail.com"
                  className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors"
                >
                  <Icons.Mail className="w-5 h-5" />
                  smartmedicenters@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.CheckCircle2 className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Merci !</h3>
                  <p className="text-slate-600 mb-6">
                    Nous avons bien reçu votre demande. Un membre de notre
                    équipe vous contactera dans les 24 heures pour planifier
                    votre démonstration personnalisée.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    Soumettre une autre demande
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">
                    Demander une démonstration gratuite
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Remplissez le formulaire et nous vous recontacterons dans
                    les 24 heures.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          {...register("firstName")}
                          placeholder="Prénom *"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("lastName")}
                          placeholder="Nom *"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Email professionnel *"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Téléphone"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <input
                        {...register("practiceName")}
                        placeholder="Nom du centre / cabinet *"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                      {errors.practiceName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.practiceName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select
                          {...register("specialty")}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-700"
                        >
                          <option value="">
                            Sélectionnez une spécialité *
                          </option>
                          {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>
                              {specialty}
                            </option>
                          ))}
                        </select>
                        {errors.specialty && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.specialty.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <select
                          {...register("practiceSize")}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-700"
                        >
                          <option value="">Taille du centre *</option>
                          {practiceSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        {errors.practiceSize && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.practiceSize.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <textarea
                        {...register("message")}
                        placeholder="Parlez-nous de vos besoins (optionnel)"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        "Demander une démonstration gratuite"
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      En soumettant, vous acceptez notre{" "}
                      <a href="#" className="text-primary-600 hover:underline">
                        Politique de confidentialité
                      </a>{" "}
                      et nos{" "}
                      <a href="#" className="text-primary-600 hover:underline">
                        Conditions d'utilisation
                      </a>
                      .
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
