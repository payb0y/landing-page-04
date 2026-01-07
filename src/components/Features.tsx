import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";

interface Feature {
  id: string;
  title: string;
  description: string;
  useCase: string;
  icon: React.ReactNode;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: "scheduling",
    title: "Planification Intelligente des Rendez-vous",
    description:
      "Une gestion des rendez-vous pensée pour les centres de kinésithérapie, qui réduit les absences et maximise votre taux d'occupation.",
    useCase:
      "Un centre partenaire a réduit les rendez-vous manqués de 40 % grâce aux rappels automatiques et à la liste d'attente intelligente.",
    icon: <Icons.Calendar className="w-6 h-6" />,
    benefits: [
      "Rappels automatiques par SMS & WhatsApp",
      "Liste d'attente intelligente pour combler les créneaux annulés",
      "Calendrier par kinésithérapeute, salle ou équipement",
      "Prise de rendez-vous assistée",
    ],
  },
  {
    id: "records",
    title: "Dossiers Patients Complets et Sécurisés",
    description:
      "Toutes les informations du patient, centralisées et accessibles en quelques secondes.",
    useCase:
      "Les centres utilisant SMC ont réduit le temps administratif à l'accueil de 65 %.",
    icon: <Icons.Users className="w-6 h-6" />,
    benefits: [
      "Historique médical et thérapeutique complet",
      "Stockage sécurisé des documents et images (avant / après)",
      "Modèles de fiches et comptes rendus personnalisables",
      "Synchronisation en temps réel",
    ],
  },
  {
    id: "documentation",
    title: "Suivi Thérapeutique Structuré",
    description: "Un suivi clair et précis de l'évolution de chaque patient.",
    useCase:
      "Plans de traitement par séance avec objectifs thérapeutiques et suivi de progression.",
    icon: <Icons.FileText className="w-6 h-6" />,
    benefits: [
      "Plans de traitement par séance",
      "Objectifs thérapeutiques et progression",
      "Notes cliniques par kinésithérapeute",
      "Comparaison visuelle avant / après",
    ],
  },
  {
    id: "billing",
    title: "Facturation & Gestion Financière Simplifiées",
    description: "Une facturation fluide, conforme et sans erreurs.",
    useCase:
      "Les centres équipés de SMC ont réduit leur cycle de facturation de 60 %.",
    icon: <Icons.CreditCard className="w-6 h-6" />,
    benefits: [
      "Génération automatique des factures",
      "Gestion des paiements et des impayés",
      "Tarifs par acte ou par séance",
      "Tableaux de bord financiers en temps réel",
    ],
  },
  {
    id: "team",
    title: "Gestion d'Équipe et des Accès",
    description:
      "Une collaboration fluide entre kinésithérapeutes, secrétaires et responsables.",
    useCase:
      "Accès multi-utilisateurs avec rôles et permissions personnalisés.",
    icon: <Icons.Users className="w-6 h-6" />,
    benefits: [
      "Accès multi-utilisateurs avec rôles et permissions",
      "Gestion des congés et absences",
      "Planning du personnel",
      "Centres multi-sites",
    ],
  },
  {
    id: "analytics",
    title: "Tableaux de Bord & Analytique",
    description:
      "Pilotez votre centre avec des données claires et exploitables.",
    useCase:
      "Suivez le chiffre d'affaires, le taux d'occupation et la performance par praticien.",
    icon: <Icons.BarChart3 className="w-6 h-6" />,
    benefits: [
      "Chiffre d'affaires et rentabilité",
      "Taux d'occupation des kinésithérapeutes",
      "Analyse des absences et annulations",
      "Performance par praticien et par salle",
    ],
  },
];

export const Features = () => {
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  return (
    <section id="features" className="section-padding bg-slate-50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            Fonctionnalités Puissantes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Tout ce dont vous avez besoin pour{" "}
            <span className="gradient-text">gérer votre centre</span>
          </h2>
          <p className="text-lg text-slate-600">
            Des solutions réelles pour des défis réels. Découvrez comment chaque
            fonctionnalité transforme votre quotidien.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group bg-white rounded-2xl p-8 shadow-lg border border-slate-100 
                         hover:shadow-xl hover:border-primary-200 transition-all duration-300
                         ${
                           isInView
                             ? "opacity-100 translate-y-0"
                             : "opacity-0 translate-y-10"
                         }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() =>
                trackEvent("feature_click", { feature: feature.id })
              }
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>

              {/* Use Case */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-600 italic">
                  <Icons.Quote className="w-4 h-4 inline-block mr-1 text-primary-400" />
                  {feature.useCase}
                </p>
              </div>

              {/* Benefits List */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <Icons.CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features Banner */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Et Bien Plus Encore</h3>
              <p className="text-slate-600 mb-6">
                Smart Medical Centers s'adapte à votre cabinet avec des modules
                personnalisables, une gestion multi-sites et des intégrations
                avec vos partenaires.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Multi-user Access",
                  "Mobile App",
                  "Data Export",
                  "API Access",
                  "Custom Forms",
                  "E-signatures",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* HIDDEN - Pricing CTA
            <div className="flex justify-center">
              <a
                href="#pricing"
                className="btn-primary text-lg"
                onClick={() => trackEvent("features_cta_click")}
              >
                See All Features
                <Icons.ArrowRight className="w-5 h-5" />
              </a>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};
