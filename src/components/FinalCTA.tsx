import { useState } from "react";
import { Icons } from "./Icons";
import { useInView, useAnalytics } from "../hooks/useAnalytics";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  practiceName: z.string().min(2, "Practice name is required"),
  practiceSize: z.string().min(1, "Please select practice size"),
  specialty: z.string().min(1, "Please select your specialty"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const specialties = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Gynecology",
  "Orthopedics",
  "Psychiatry",
  "Dentistry",
  "Physiotherapy",
  "Other",
];

const practiceSizes = [
  "Solo Practice (1 provider)",
  "Small Clinic (2-5 providers)",
  "Medium Clinic (6-15 providers)",
  "Large Practice (16-50 providers)",
  "Hospital/Enterprise (50+ providers)",
];

export const FinalCTA = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isInView } = useInView();
  const { trackEvent } = useAnalytics();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    trackEvent("contact_form_submit", {
      specialty: data.specialty,
      practiceSize: data.practiceSize,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`text-white transition-all duration-700 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of healthcare professionals who've reclaimed their
              time and improved patient care with MediCarePro. Start your free
              trial today — no credit card required.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                "Set up in less than 24 hours",
                "Free data migration from your current system",
                "Personalized onboarding and training",
                "Dedicated support throughout your journey",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <Icons.CheckCircle2 className="w-6 h-6 text-accent-400" />
                  <span className="text-primary-50">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-8 border-t border-white/10">
              <p className="text-primary-200 text-sm">Or reach us directly:</p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors"
                >
                  <Icons.Phone className="w-5 h-5" />
                  +1 (234) 567-890
                </a>
                <a
                  href="mailto:hello@medicarepro.com"
                  className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors"
                >
                  <Icons.Mail className="w-5 h-5" />
                  hello@medicarepro.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.CheckCircle2 className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                  <p className="text-slate-600 mb-6">
                    We've received your request. One of our team members will
                    contact you within 24 hours to schedule your personalized
                    demo.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 font-semibold hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">
                    Request a Free Demo
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          {...register("firstName")}
                          placeholder="First Name *"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          {...register("lastName")}
                          placeholder="Last Name *"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Work Email *"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <input
                        {...register("practiceName")}
                        placeholder="Practice/Clinic Name *"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      />
                      {errors.practiceName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.practiceName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <select
                          {...register("specialty")}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-700"
                        >
                          <option value="">Select Specialty *</option>
                          {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>
                              {specialty}
                            </option>
                          ))}
                        </select>
                        {errors.specialty && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.specialty.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <select
                          {...register("practiceSize")}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-700"
                        >
                          <option value="">Practice Size *</option>
                          {practiceSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        {errors.practiceSize && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.practiceSize.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <textarea
                        {...register("message")}
                        placeholder="Tell us about your needs (optional)"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Request Free Demo"
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-primary-600 hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary-600 hover:underline">
                        Terms of Service
                      </a>
                      .
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
