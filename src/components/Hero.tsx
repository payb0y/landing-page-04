import { Icons } from "./Icons";
import { useAnalytics, useInView } from "../hooks/useAnalytics";

export const Hero = () => {
  const { trackEvent } = useAnalytics();
  const { ref, isInView } = useInView();

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center gradient-bg overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`text-center lg:text-left transition-all duration-1000 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              Trusted by 10,000+ Healthcare Professionals
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Reclaim Time With Patients —{" "}
              <span className="gradient-text">Let Tech Handle the Rest</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              AI-powered practice management that automates paperwork,
              streamlines scheduling, and lets you focus on what matters most —
              your patients.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#pricing"
                className="btn-primary text-lg px-8 py-4"
                onClick={() => trackEvent("hero_cta_primary")}
              >
                Start Free Trial
                <Icons.ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#testimonials"
                className="btn-secondary text-lg px-8 py-4"
                onClick={() => trackEvent("hero_cta_demo")}
              >
                <Icons.Play className="w-5 h-5" />
                Watch Demo
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Icons.CheckCircle2 className="w-5 h-5 text-accent-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <Icons.CheckCircle2 className="w-5 h-5 text-accent-500" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <Icons.CheckCircle2 className="w-5 h-5 text-accent-500" />
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Hero Image / UI Preview */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              {/* Main Dashboard Preview */}
              <div className="glass-card p-4 rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop"
                  alt="Medical Dashboard Interface"
                  className="w-full rounded-2xl"
                />
                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -right-4 glass-card p-4 rounded-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Icons.Activity className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Today's Patients</p>
                      <p className="text-lg font-bold text-slate-900">24</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-xl animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icons.Clock className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Time Saved</p>
                      <p className="text-lg font-bold text-slate-900">
                        2.5 hrs/day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Logos */}
        <div className="mt-16 pt-12 border-t border-slate-200/50">
          <p className="text-center text-sm text-slate-500 mb-8">
            Trusted by leading healthcare institutions worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {[
              "Cleveland Clinic",
              "Mayo Clinic",
              "Johns Hopkins",
              "Mass General",
              "UCSF Health",
            ].map((name) => (
              <div key={name} className="text-xl font-bold text-slate-400">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
