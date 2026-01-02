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
    title: "Smart Appointment Scheduling",
    description:
      "AI-optimized scheduling that reduces no-shows and maximizes your practice efficiency.",
    useCase:
      "Dr. Amara reduced no-shows by 40% using automated SMS/WhatsApp reminders and intelligent waitlist management.",
    icon: <Icons.Calendar className="w-6 h-6" />,
    benefits: [
      "Automated appointment reminders via SMS & WhatsApp",
      "Smart waitlist fills cancelled slots instantly",
      "Multi-provider calendar synchronization",
      "Patient self-booking portal",
    ],
  },
  {
    id: "records",
    title: "Comprehensive Patient Records",
    description:
      "Centralized, secure patient files with instant access to complete medical history.",
    useCase:
      "The Wellness Clinic cut patient intake time by 65% with digital forms and automatic data population.",
    icon: <Icons.Users className="w-6 h-6" />,
    benefits: [
      "Complete medical history at your fingertips",
      "Secure document and image storage",
      "Customizable consultation templates",
      "Real-time data synchronization",
    ],
  },
  {
    id: "documentation",
    title: "AI-Powered Documentation",
    description:
      "Voice-to-text notes and AI-assisted report writing that saves hours daily.",
    useCase:
      "Dr. Chen now completes consultation notes in 30 seconds instead of 10 minutes using AI dictation.",
    icon: <Icons.FileText className="w-6 h-6" />,
    benefits: [
      "Voice-to-text medical dictation",
      "AI generates reports in one click",
      "Smart prescription suggestions",
      "Template library for all specialties",
    ],
  },
  {
    id: "billing",
    title: "Simplified Billing & Payments",
    description:
      "Streamlined invoicing, insurance processing, and payment tracking.",
    useCase:
      "Family Health Partners reduced billing cycle time by 60% and cut unpaid invoices by half.",
    icon: <Icons.CreditCard className="w-6 h-6" />,
    benefits: [
      "Automated invoice generation",
      "Insurance claim management",
      "Multiple payment methods",
      "Real-time financial dashboards",
    ],
  },
  {
    id: "teleconsult",
    title: "Integrated Teleconsultation",
    description:
      "HIPAA-compliant video consultations built right into your workflow.",
    useCase:
      "Metro Dermatology expanded their reach by 300% offering video consultations to rural patients.",
    icon: <Icons.Video className="w-6 h-6" />,
    benefits: [
      "One-click video consultations",
      "Screen sharing for lab results",
      "Secure messaging with patients",
      "Virtual waiting room",
    ],
  },
  {
    id: "analytics",
    title: "Practice Analytics Dashboard",
    description:
      "Actionable insights into your practice performance, patient trends, and revenue.",
    useCase:
      "Sunrise Medical identified peak hours and optimized staffing, increasing daily patients by 25%.",
    icon: <Icons.BarChart3 className="w-6 h-6" />,
    benefits: [
      "Revenue and profitability tracking",
      "Patient flow analytics",
      "Staff productivity metrics",
      "Custom report generation",
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
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Run Your Practice</span>
          </h2>
          <p className="text-lg text-slate-600">
            Real solutions for real challenges. See how each feature transforms
            the way healthcare professionals work every day.
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
              <h3 className="text-2xl font-bold mb-4">
                Plus Many More Features
              </h3>
              <p className="text-slate-600 mb-6">
                MediCarePro adapts to your specialty with customizable modules,
                multi-location support, and integrations with labs, pharmacies,
                and insurance providers.
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
          </div>
        </div>
      </div>
    </section>
  );
};
