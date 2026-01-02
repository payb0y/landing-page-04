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
    name: "Dr. Sarah Okonkwo",
    role: "Pediatric Surgeon",
    specialty: "Pediatrics",
    location: "Lagos, Nigeria",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    quote: "MediCarePro transformed my practice completely.",
    fullQuote:
      "Before MediCarePro, I was drowning in paperwork. Now I spend my evenings with my family instead of catching up on documentation. The AI-assisted notes feature alone saves me 2 hours every day. My patient satisfaction scores have never been higher.",
    rating: 5,
    videoUrl: "#",
    metrics: [
      { value: "2 hrs", label: "saved daily" },
      { value: "40%", label: "more patients" },
    ],
  },
  {
    id: "2",
    name: "Dr. Ahmed Benali",
    role: "Cardiologist",
    specialty: "Cardiology",
    location: "Casablanca, Morocco",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    quote: "The best investment I've made for my clinic.",
    fullQuote:
      "As a cardiologist, I need to track complex patient data over time. MediCarePro's patient timeline and the integration with my diagnostic equipment is seamless. The automated reminders cut our no-show rate from 25% to just 8%.",
    rating: 5,
    metrics: [
      { value: "17%", label: "fewer no-shows" },
      { value: "60%", label: "faster billing" },
    ],
  },
  {
    id: "3",
    name: "Dr. Fatima El Mansouri",
    role: "Dermatologist",
    specialty: "Dermatology",
    location: "Rabat, Morocco",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    quote: "Finally, software that understands dermatology.",
    fullQuote:
      "The clinical photo management feature is a game-changer for my dermatology practice. I can track skin conditions over time with before/after comparisons, and patients love seeing their progress. The teleconsultation feature helped me expand to rural areas.",
    rating: 5,
    videoUrl: "#",
    metrics: [
      { value: "3x", label: "patient reach" },
      { value: "98%", label: "satisfaction" },
    ],
  },
  {
    id: "4",
    name: "Dr. Jean-Pierre Dubois",
    role: "Physiotherapist",
    specialty: "Physical Therapy",
    location: "Nancy, France",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    quote: "Session tracking has never been easier.",
    fullQuote:
      "Managing multiple treatment plans used to be a nightmare. Now I can track each patient's progress, schedule follow-ups automatically, and even share exercise videos through the patient portal. My administrative time dropped by 65%.",
    rating: 5,
    metrics: [
      { value: "65%", label: "less admin" },
      { value: "25%", label: "more sessions" },
    ],
  },
  {
    id: "5",
    name: "Dr. Amina Diallo",
    role: "General Practitioner",
    specialty: "General Medicine",
    location: "Dakar, Senegal",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
    quote: "My entire staff loves it.",
    fullQuote:
      "The multi-user feature lets my nurses and receptionist work together seamlessly. Everyone knows exactly what's happening with each patient. The training was quick — my team was productive within a day.",
    rating: 5,
    metrics: [
      { value: "1 day", label: "to onboard" },
      { value: "100%", label: "team adoption" },
    ],
  },
  {
    id: "6",
    name: "Dr. Youssef Haddad",
    role: "Gynecologist",
    specialty: "Gynecology",
    location: "Tunis, Tunisia",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    quote: "Perfect for complex patient journeys.",
    fullQuote:
      "Pregnancy follow-ups require detailed tracking across many visits. MediCarePro's timeline view and automated reminders ensure no patient falls through the cracks. The mobile app lets me check on urgent cases even when I'm away.",
    rating: 5,
    videoUrl: "#",
    metrics: [
      { value: "0", label: "missed follow-ups" },
      { value: "35%", label: "time saved" },
    ],
  },
];

const trustBadges = [
  { name: "HIPAA Compliant", icon: "🔒" },
  { name: "GDPR Ready", icon: "🇪🇺" },
  { name: "SOC 2 Certified", icon: "✓" },
  { name: "ISO 27001", icon: "🏆" },
  { name: "CNDP Approved", icon: "✓" },
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
            ⭐ Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Trusted by <span className="gradient-text">10,000+ Doctors</span>
          </h2>
          <p className="text-lg text-slate-600">
            Real stories from healthcare professionals who transformed their
            practice with MediCarePro.
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
