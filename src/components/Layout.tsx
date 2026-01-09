import { useState } from "react";
import { Icons } from "./Icons";
import {
  useScrollPosition,
  useSectionVisibility,
  getCTAText,
  useAnalytics,
} from "../hooks/useAnalytics";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const { trackEvent } = useAnalytics();
  const isScrolled = scrollPosition > 50;

  const navLinks = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Comment ça marche", href: "#journey" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Tarifs", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (label: string) => {
    trackEvent("nav_click", { label });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-2xl font-bold"
            onClick={() => trackEvent("logo_click")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Icons.Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span
              className={`${isScrolled ? "text-slate-900" : "text-slate-900"}`}
            >
              <span className="text-primary-600">SMC</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.label)}
                className={`font-medium transition-colors hover:text-primary-600 ${
                  isScrolled ? "text-slate-700" : "text-slate-700"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="font-medium text-slate-700 hover:text-primary-600 transition-colors"
              onClick={() => trackEvent("header_contact_click")}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="btn-primary"
              onClick={() => trackEvent("header_cta_click")}
            >
              Demander une démo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <Icons.X className="w-6 h-6" />
            ) : (
              <Icons.Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className="block py-2 font-medium text-slate-700 hover:text-primary-600"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <a
                  href="#contact"
                  className="block py-2 font-medium text-slate-700"
                >
                  Contact
                </a>
                <a href="#contact" className="btn-primary w-full text-center">
                  Demander une démo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export const StickyCTA = () => {
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const visibleSection = useSectionVisibility();
  const { trackEvent } = useAnalytics();
  const ctaInfo = getCTAText(visibleSection);

  const isVisible = scrollPosition > 600 && scrollDirection === "up";

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <a
        href={ctaInfo.href}
        onClick={() =>
          trackEvent("sticky_cta_click", {
            section: visibleSection,
            text: ctaInfo.text,
          })
        }
        className="btn-primary shadow-2xl shadow-primary-500/40 flex items-center gap-2"
      >
        {ctaInfo.text}
        <Icons.ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

export const Footer = () => {
  // const { trackEvent } = useAnalytics();

  // const footerLinks = {
  //   product: [
  //     { label: "Fonctionnalités", href: "#features" },
  //     { label: "Tarifs", href: "#pricing" },
  //     { label: "Intégrations", href: "#" },
  //     { label: "Mises à jour", href: "#" },
  //   ],
  //   company: [
  //     { label: "À propos", href: "#" },
  //     { label: "Carrières", href: "#" },
  //     { label: "Presse", href: "#" },
  //     { label: "Blog", href: "#" },
  //   ],
  //   support: [
  //     { label: "Centre d'aide", href: "#" },
  //     { label: "Documentation", href: "#" },
  //     { label: "Formation", href: "#" },
  //     { label: "Contact", href: "#contact" },
  //   ],
  //   legal: [
  //     { label: "Confidentialité", href: "#" },
  //     { label: "Conditions", href: "#" },
  //     { label: "Conformité RGPD", href: "#" },
  //     { label: "Sécurité des données", href: "#" },
  //   ],
  // };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a
              href="#"
              className="flex items-center gap-2 text-2xl font-bold mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center">
                <Icons.Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span>
                <span className="text-primary-400">SMC</span>
              </span>
            </a>
            <p className="text-slate-400 mb-6 max-w-xs">
              La plateforme intelligente pour gérer efficacement votre centre de
              kinésithérapie depuis 2020.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {/* <div>
            <h4 className="font-semibold mb-4 text-white">Produit</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                    onClick={() =>
                      trackEvent("footer_link_click", { label: link.label })
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2026 SMC - Smart Medical Centers. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-400" />
              Données sécurisées
            </span>
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-400" />
              Conforme RGPD
            </span>
            <span className="flex items-center gap-2">
              <Icons.Shield className="w-4 h-4 text-accent-400" />
              Hébergement sécurisé
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
