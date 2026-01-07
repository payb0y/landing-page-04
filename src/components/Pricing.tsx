import { useState } from "react";
import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  highlight?: string;
  cta: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "solo",
    name: "Cabinet Individuel",
    description: "Idéal pour un kinésithérapeute indépendant.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "1 utilisateur",
      "Dossiers patients illimités",
      "Gestion des rendez-vous",
      "Facturation de base",
      "Portail patient",
      "Rappels SMS (100/mois)",
      "Support par email",
      "Accès application mobile",
    ],
    cta: "Essai gratuit",
  },
  {
    id: "clinic",
    name: "Centre de Kinésithérapie",
    description: "Pour les structures avec plusieurs praticiens.",
    monthlyPrice: 99,
    yearlyPrice: 79,
    popular: true,
    highlight: "Plus Populaire",
    features: [
      "Multi-utilisateurs",
      "Tout du Cabinet Individuel, plus :",
      "Gestion des salles et équipements",
      "Tableaux de bord avancés",
      "Suivi thérapeutique structuré",
      "Gestion d'équipe",
      "Rappels SMS (500/mois)",
      "Support prioritaire",
      "Modèles personnalisables",
      "Export comptable",
    ],
    cta: "Essai gratuit",
  },
  {
    id: "enterprise",
    name: "Réseau / Enterprise",
    description: "Pour les groupes et réseaux médicaux.",
    monthlyPrice: 249,
    yearlyPrice: 199,
    features: [
      "Multi-centres",
      "Tout du Centre de Kinésithérapie, plus :",
      "Accès API",
      "Personnalisation avancée",
      "Accompagnement dédié",
      "Intégrations personnalisées",
      "Contrôles de sécurité avancés",
      "Rappels SMS illimités",
      "Support 24/7",
      "Formation & accompagnement inclus",
      "Garantie SLA",
    ],
    cta: "Contacter l'équipe",
  },
];

const comparisonFeatures = [
  {
    name: "Patient Records",
    solo: "Unlimited",
    clinic: "Unlimited",
    enterprise: "Unlimited",
  },
  { name: "Providers", solo: "1", clinic: "Up to 5", enterprise: "Unlimited" },
  { name: "Locations", solo: "1", clinic: "Up to 3", enterprise: "Unlimited" },
  {
    name: "Appointment Scheduling",
    solo: true,
    clinic: true,
    enterprise: true,
  },
  { name: "AI Documentation", solo: false, clinic: true, enterprise: true },
  { name: "Teleconsultation", solo: false, clinic: true, enterprise: true },
  {
    name: "Analytics Dashboard",
    solo: "Basic",
    clinic: "Advanced",
    enterprise: "Custom",
  },
  { name: "API Access", solo: false, clinic: false, enterprise: true },
  {
    name: "Support",
    solo: "Email",
    clinic: "Priority",
    enterprise: "24/7 Dedicated",
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  const handlePlanClick = (planId: string) => {
    trackEvent("pricing_plan_click", {
      plan: planId,
      billing: isYearly ? "yearly" : "monthly",
    });
  };

  return (
    <section id="pricing" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-4">
            💰 Tarification Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Des offres{" "}
            <span className="gradient-text">adaptées à votre centre</span>
          </h2>
          <p className="text-lg text-slate-600">
            Pas de frais cachés. Pas de surprises. Choisissez l'offre qui
            correspond à la taille de votre centre.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span
            className={`text-sm font-medium ${
              !isYearly ? "text-slate-900" : "text-slate-500"
            }`}
          >
            Mensuel
          </span>
          <button
            onClick={() => {
              setIsYearly(!isYearly);
              trackEvent("pricing_toggle", { yearly: !isYearly });
            }}
            className="relative w-14 h-7 bg-primary-600 rounded-full p-1 transition-colors"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                isYearly ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              isYearly ? "text-slate-900" : "text-slate-500"
            }`}
          >
            Annuel
            <span className="ml-2 px-2 py-0.5 bg-accent-100 text-accent-700 text-xs rounded-full">
              Économisez 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-8 transition-all duration-500 
                         ${
                           plan.popular
                             ? "border-2 border-primary-500 shadow-xl shadow-primary-500/10 scale-105 z-10"
                             : "border border-slate-200 shadow-lg hover:shadow-xl"
                         }
                         ${
                           isInView
                             ? "opacity-100 translate-y-0"
                             : "opacity-0 translate-y-10"
                         }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {plan.highlight}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-500">/month</span>
                </div>
                {isYearly && (
                  <p className="text-sm text-accent-600 mt-2">
                    Billed annually (${plan.yearlyPrice * 12}/year)
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Icons.CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handlePlanClick(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">
            All plans include: Free setup • Free data migration • Free training
            • Cancel anytime
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-500" />
              14-day free trial
            </span>
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-500" />
              Money-back guarantee
            </span>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">
            Compare Plans
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">
                    Solo
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-primary-600">
                    Clinic
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr
                    key={feature.name}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="py-4 px-4 text-slate-700">{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.solo === "boolean" ? (
                        feature.solo ? (
                          <Icons.CheckCircle2 className="w-5 h-5 text-accent-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-slate-600">{feature.solo}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center bg-primary-50/50">
                      {typeof feature.clinic === "boolean" ? (
                        feature.clinic ? (
                          <Icons.CheckCircle2 className="w-5 h-5 text-accent-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-slate-600">{feature.clinic}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Icons.CheckCircle2 className="w-5 h-5 text-accent-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )
                      ) : (
                        <span className="text-slate-600">
                          {feature.enterprise}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
