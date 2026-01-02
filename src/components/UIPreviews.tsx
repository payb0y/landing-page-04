import { useInView } from "../hooks/useAnalytics";

interface UIPreview {
  title: string;
  caption: string;
  image: string;
  reverse?: boolean;
  features: string[];
}

const uiPreviews: UIPreview[] = [
  {
    title: "Intuitive Dashboard",
    caption:
      "Get a complete overview of your day at a glance. See upcoming appointments, patient alerts, and practice metrics all in one place.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    features: [
      "Daily schedule overview",
      "Patient waiting list",
      "Revenue snapshot",
      "Task reminders",
    ],
  },
  {
    title: "Patient Records Made Simple",
    caption:
      "Everything about your patient in one comprehensive view. Medical history, documents, prescriptions, and billing — all connected.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
    reverse: true,
    features: [
      "Complete medical timeline",
      "Document attachments",
      "Prescription history",
      "Visit notes",
    ],
  },
  {
    title: "Smart Scheduling Calendar",
    caption:
      "A calendar that works as hard as you do. Color-coded appointments, drag-and-drop rescheduling, and intelligent conflict detection.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
    features: [
      "Multi-provider view",
      "Drag & drop booking",
      "Automated reminders",
      "Waitlist management",
    ],
  },
  {
    title: "Billing & Financial Reports",
    caption:
      "Track every payment, manage invoices, and get real-time insights into your practice's financial health.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    reverse: true,
    features: [
      "Automated invoicing",
      "Payment tracking",
      "Insurance claims",
      "Financial reports",
    ],
  },
];

export const UIPreviews = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="ui-previews" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Product Preview
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            See It in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-lg text-slate-600">
            Designed by doctors, for doctors. Every screen is optimized for
            speed, clarity, and ease of use.
          </p>
        </div>

        {/* UI Preview Sections */}
        <div className="space-y-24">
          {uiPreviews.map((preview, index) => (
            <div
              key={preview.title}
              className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Content */}
              <div className={`${preview.reverse ? "lg:order-2" : ""}`}>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  {preview.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6">{preview.caption}</p>
                <div className="grid grid-cols-2 gap-4">
                  {preview.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-slate-700"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={`${preview.reverse ? "lg:order-1" : ""}`}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative glass-card p-4 rounded-2xl overflow-hidden">
                    <img
                      src={preview.image}
                      alt={preview.title}
                      className="w-full rounded-xl shadow-lg"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-xl pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile App Preview */}
        <div className="mt-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                📱 Mobile App
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Your Practice in Your Pocket
              </h3>
              <p className="text-lg text-slate-300 mb-8">
                Access patient records, manage appointments, and stay connected
                with your team — all from your smartphone. Available on iOS and
                Android.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop"
                  alt="Mobile App"
                  className="w-64 rounded-[2.5rem] shadow-2xl border-8 border-slate-700"
                />
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary-500/30 rounded-full blur-3xl" />
                <div className="absolute -left-8 -top-8 w-48 h-48 bg-accent-500/30 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
