import { useState } from "react";
import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";
import * as Accordion from "@radix-ui/react-accordion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Combien de temps faut-il pour démarrer ?",
    answer:
      "La plupart des centres sont opérationnels en 24 à 48 heures. Notre équipe gère la configuration initiale, la migration des données depuis votre système existant, et fournit une formation personnalisée pour vous et votre personnel. L'interface est intuitive : la plupart des utilisateurs sont à l'aise dès le premier jour.",
    category: "Démarrage",
  },
  {
    id: "2",
    question: "Mes données patients sont-elles sécurisées et conformes ?",
    answer:
      "Absolument. La sécurité est notre priorité. SMC est conforme RGPD. Nous utilisons un chiffrement de niveau bancaire (AES-256) pour toutes les données. Nos serveurs sont hébergés dans des centres de données certifiés avec surveillance 24/7, sauvegardes automatiques et protocoles de récupération.",
    category: "Sécurité",
  },
  {
    id: "3",
    question: "Puis-je migrer les données de mon système actuel ?",
    answer:
      "Oui ! Nous avons des outils de migration automatisés pour la plupart des systèmes de gestion. Notre équipe travaillera avec vous pour exporter vos dossiers patients existants, l'historique des rendez-vous et les données financières. La migration est supervisée par nos spécialistes et est incluse gratuitement dans tous les forfaits.",
    category: "Démarrage",
  },
  /* HIDDEN FAQ ITEMS
  {
    id: "4",
    question: "Et si j'ai plusieurs sites ou praticiens ?",
    answer:
      "SMC est conçu pour les centres de toutes tailles. Notre fonctionnalité multi-sites vous permet de gérer plusieurs centres depuis un seul tableau de bord. Chaque praticien dispose de son propre calendrier. Vous pouvez définir des permissions personnalisées pour que le personnel ne voie que ce dont il a besoin.",
    category: "Fonctionnalités",
  },
  */
  {
    id: "5",
    question: "Comment fonctionne la gestion des rendez-vous ?",
    answer:
      "Notre système de planification intelligente inclut des rappels automatiques par SMS et WhatsApp, une liste d'attente qui comble automatiquement les créneaux annulés, et une vue multi-praticiens.",
    category: "Fonctionnalités",
  },
  {
    id: "6",
    question: "Quel type de support offrez-vous ?",
    answer:
      "Nous offrons un support illimité inclus dans chaque forfait. Cela comprend le support téléphonique, email et chat en direct pendant les heures ouvrables, plus un support d'urgence 24/7 pour les problèmes critiques. Vous aurez également accès à notre centre d'aide complet, tutoriels vidéo et webinaires réguliers.",
    category: "Support",
  },
  /* HIDDEN FAQ ITEMS
  {
    id: "7",
    question: "Les patients peuvent-ils prendre rendez-vous en ligne ?",
    answer:
      "Oui ! SMC inclut un portail patient où les patients peuvent consulter les créneaux disponibles et prendre rendez-vous 24/7. Vous contrôlez quels créneaux sont disponibles pour la réservation en ligne. Les patients reçoivent des confirmations et rappels automatiques par SMS ou WhatsApp.",
    category: "Fonctionnalités",
  },
  {
    id: "8",
    question: "Y a-t-il une application mobile ?",
    answer:
      "Oui, nous avons des applications natives pour iOS et Android. Les applications vous donnent un accès sécurisé à vos dossiers patients, calendrier de rendez-vous et notifications où que vous soyez. Votre personnel peut également utiliser l'application avec des accès adaptés à leur rôle.",
    category: "Fonctionnalités",
  },
  */
  {
    id: "9",
    question: "Que se passe-t-il si je veux annuler ?",
    answer:
      "Nous ne croyons pas aux engagements forcés. Vous pouvez annuler votre abonnement à tout moment, et vous conserverez l'accès jusqu'à la fin de votre période de facturation. Lorsque vous partez, nous fournissons une exportation complète de toutes vos données dans des formats standard. Pas de frais d'annulation.",
    category: "Facturation",
  },
  {
    id: "10",
    question: "Proposez-vous une formation pour mon personnel ?",
    answer:
      "Absolument ! Chaque forfait inclut des sessions de formation initiales pour toute votre équipe. Nous proposons des options de formation à distance et sur site. De plus, vous avez un accès illimité à notre centre d'apprentissage en ligne avec des tutoriels vidéo étape par étape.",
    category: "Support",
  },
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
    trackEvent("faq_toggle", { openCount: value.length });
  };

  return (
    <section id="faq" className="section-padding bg-slate-50" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Des Questions ?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Questions <span className="gradient-text">Fréquentes</span>
          </h2>
          <p className="text-lg text-slate-600">
            Des réponses claires aux questions les plus posées. Vous ne trouvez
            pas ce que vous cherchez ? Notre équipe est à votre disposition.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion.Root
            type="multiple"
            value={openItems}
            onValueChange={handleValueChange}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden 
                           transition-all duration-500 ${
                             isInView
                               ? "opacity-100 translate-y-0"
                               : "opacity-0 translate-y-10"
                           }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors group">
                    <span className="font-semibold text-slate-900 pr-4">
                      {item.question}
                    </span>
                    <Icons.ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        openItems.includes(item.id) ? "rotate-180" : ""
                      }`}
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                    <span className="inline-block mt-4 px-3 py-1 bg-slate-100 text-slate-500 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Vous avez encore des questions ?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="btn-secondary"
              onClick={() => trackEvent("faq_contact_click")}
            >
              <Icons.MessageSquare className="w-5 h-5" />
              Discuter avec nous
            </a>
            <a
              href="tel:+1234567890"
              className="btn-secondary"
              onClick={() => trackEvent("faq_phone_click")}
            >
              <Icons.Phone className="w-5 h-5" />
              Nous appeler
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
