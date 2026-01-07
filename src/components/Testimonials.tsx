import { useState } from "react";
import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  specialty: string;
  location: string;
  image: string;
  quote: string;
  fullQuote: string;
  rating: number;
  videoUrl?: string;
  metrics?: { value: string; label: string }[];
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Claire Moreau",
    role: "Kinésithérapeute",
    specialty: "Kinésithérapie du sport",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    quote: "SMC a transformé la gestion de mon cabinet.",
    fullQuote:
      "Avant SMC, je passais des heures à gérer les rendez-vous et la facturation. Maintenant, tout est automatisé et je peux me concentrer sur mes patients. Les rappels automatiques ont réduit les absences de 40%.",
    rating: 5,
    videoUrl: "#",
    metrics: [
      { value: "40%", label: "d'absences en moins" },
      { value: "2h", label: "économisées par jour" },
    ],
  },
  {
    id: "2",
    name: "Marc Dubois",
    role: "Kinésithérapeute",
    specialty: "Rééducation",
    location: "Lyon, France",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    quote: "Le meilleur investissement pour mon centre.",
    fullQuote:
      "La gestion des dossiers patients est devenue tellement plus simple. Le suivi thérapeutique structuré me permet de voir la progression de chaque patient en un coup d'œil. Mes patients apprécient le professionnalisme.",
    rating: 5,
    metrics: [
      { value: "65%", label: "de temps admin en moins" },
      { value: "60%", label: "facturation plus rapide" },
    ],
  },
  {
    id: "3",
    name: "Sophie Martin",
    role: "Directrice de centre",
    specialty: "Gestion",
    location: "Marseille, France",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    quote: "Enfin une solution pensée pour la kinésithérapie.",
    fullQuote:
      "Avec 5 kinésithérapeutes dans notre centre, la coordination était complexe. SMC nous permet de gérer tous les plannings, les salles et les équipements facilement. Les tableaux de bord nous aident à optimiser notre activité.",
    rating: 5,
    videoUrl: "#",
    metrics: [
      { value: "5", label: "praticiens" },
      { value: "98%", label: "de satisfaction" },
    ],
  },
];

const trustBadges = [
  { name: "Données sécurisées", icon: "🔒" },
  { name: "Conforme RGPD", icon: "🇪🇺" },
  { name: "Sauvegardes auto", icon: "✓" },
  { name: "Hébergement sécurisé", icon: "🏆" },
];

export const Testimonials = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  const handleVideoClick = (testimonialId: string) => {
    setActiveVideo(testimonialId);
    trackEvent("video_testimonial_click", { testimonialId });
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-gradient-to-b from-slate-50 to-white"
      ref={ref}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 text-warm-700 rounded-full text-sm font-medium mb-4">
            ⭐ Témoignages Clients
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Déjà adopté par{" "}
            <span className="gradient-text">des centres de kinésithérapie</span>
          </h2>
          <p className="text-lg text-slate-600">
            Des histoires réelles de professionnels de santé qui ont transformé
            leur pratique avec SMC.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {trustBadges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100"
            >
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm font-medium text-slate-700">
                {badge.name}
              </span>
            </div>
          ))}
        </div>

        {/* Featured Video Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials
            .filter((t) => t.videoUrl)
            .slice(0, 3)
            .map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl overflow-hidden cursor-pointer 
                           transition-all duration-500 hover:scale-[1.02] ${
                             isInView
                               ? "opacity-100 translate-y-0"
                               : "opacity-0 translate-y-10"
                           }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleVideoClick(testimonial.id)}
              >
                <div className="aspect-video relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Icons.Play className="w-8 h-8 text-primary-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-white/80 text-sm">
                      {testimonial.specialty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Written Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-100 
                         hover:shadow-xl transition-all duration-300 ${
                           isInView
                             ? "opacity-100 translate-y-0"
                             : "opacity-0 translate-y-10"
                         }`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Icons.Star
                    key={i}
                    className="w-5 h-5 fill-warm-400 text-warm-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 mb-6 leading-relaxed">
                "{testimonial.fullQuote}"
              </p>

              {/* Metrics */}
              {testimonial.metrics && (
                <div className="flex gap-6 mb-6 pb-6 border-b border-slate-100">
                  {testimonial.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-2xl font-bold text-primary-600">
                        {metric.value}
                      </p>
                      <p className="text-xs text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-slate-100">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icons.Star
                  key={i}
                  className="w-6 h-6 fill-warm-400 text-warm-400"
                />
              ))}
            </div>
            <span className="text-lg font-bold text-slate-900">4.9/5</span>
            <span className="text-slate-500">from 2,500+ reviews</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden">
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10"
              onClick={() => setActiveVideo(null)}
            >
              <Icons.X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center text-white">
              <p className="text-center">
                Video testimonial player
                <br />
                <span className="text-sm text-slate-400">
                  (Video would load here in production)
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
