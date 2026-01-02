import { Icons } from "./Icons";
import { useInView } from "../hooks/useAnalytics";

interface JourneyStep {
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats?: { value: string; label: string };
}

const journeySteps: JourneyStep[] = [
  {
    phase: "The Problem",
    title: "Drowning in Paperwork",
    description:
      "Healthcare professionals spend up to 50% of their time on administrative tasks — scheduling, billing, documentation, and follow-ups. This means less time for patient care and more burnout.",
    icon: <Icons.FileText className="w-8 h-8" />,
    color: "bg-red-100 text-red-600",
    stats: { value: "50%", label: "time lost to admin tasks" },
  },
  {
    phase: "The Solution",
    title: "AI-Powered Automation",
    description:
      "MediCarePro automates your entire practice workflow. From AI-assisted documentation to smart scheduling, we handle the busywork so you can focus on what you trained for — healing patients.",
    icon: <Icons.Stethoscope className="w-8 h-8" />,
    color: "bg-primary-100 text-primary-600",
    stats: { value: "1 Click", label: "to complete documentation" },
  },
  {
    phase: "Real Results",
    title: "Transform Your Practice",
    description:
      "Our customers report dramatic improvements in efficiency, patient satisfaction, and work-life balance. See the numbers that speak for themselves.",
    icon: <Icons.Heart className="w-8 h-8" />,
    color: "bg-accent-100 text-accent-600",
    stats: { value: "40%", label: "more time with patients" },
  },
];

const impactStats = [
  { value: "2.5", suffix: "hrs", label: "Average time saved per day" },
  { value: "35", suffix: "%", label: "Reduction in no-shows" },
  { value: "98", suffix: "%", label: "Patient satisfaction rate" },
  { value: "60", suffix: "%", label: "Faster billing cycles" },
];

export const CustomerJourney = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="journey" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            From Overwhelmed to{" "}
            <span className="gradient-text">In Control</span>
          </h2>
          <p className="text-lg text-slate-600">
            See how MediCarePro transforms the daily challenges of practice
            management into streamlined, automated workflows.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-primary-200 to-accent-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {journeySteps.map((step, index) => (
              <div
                key={step.phase}
                className={`transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow h-full">
                  {/* Phase Badge */}
                  <div className="absolute -top-4 left-8">
                    <span
                      className={`inline-block px-4 py-1 ${step.color} rounded-full text-sm font-semibold`}
                    >
                      {step.phase}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 mt-4`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600 mb-6">{step.description}</p>

                  {/* Stats */}
                  {step.stats && (
                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold gradient-text">
                          {step.stats.value}
                        </span>
                        <span className="text-slate-500">
                          {step.stats.label}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mt-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-white text-center mb-10">
            The Numbers Don't Lie — Here's What Our Users Experience
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  <span className="text-primary-200">{stat.suffix}</span>
                </div>
                <p className="text-primary-100 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
