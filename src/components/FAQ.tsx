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
    question: "How long does it take to get started?",
    answer:
      "Most practices are up and running within 24-48 hours. Our onboarding team handles the initial setup, data migration from your existing system, and provides personalized training for you and your staff. We've designed the interface to be intuitive enough that most users feel comfortable within their first day.",
    category: "Getting Started",
  },
  {
    id: "2",
    question: "Is my patient data secure and compliant?",
    answer:
      "Absolutely. Security is our top priority. MediCarePro is fully HIPAA compliant, GDPR ready, and SOC 2 certified. We use bank-level encryption (AES-256) for all data, both in transit and at rest. Our servers are hosted in certified data centers with 24/7 monitoring, automatic backups, and disaster recovery protocols. We're also approved by the CNDP (National Commission for the Control of Personal Data Protection).",
    category: "Security",
  },
  {
    id: "3",
    question: "Can I migrate data from my current system?",
    answer:
      "Yes! We have automated migration tools for most popular practice management systems. Our team will work with you to export your existing patient records, appointment history, and financial data. The migration process is supervised by our data specialists to ensure nothing is lost. Best of all, migration is included free with all plans.",
    category: "Getting Started",
  },
  {
    id: "4",
    question: "What if I have multiple locations or providers?",
    answer:
      "MediCarePro is built for practices of all sizes. Our multi-location feature lets you manage multiple clinics from a single dashboard while keeping data organized by location. Each provider gets their own calendar and patient load view. You can also set custom permissions so staff only see what they need for their role.",
    category: "Features",
  },
  {
    id: "5",
    question: "How does the AI documentation feature work?",
    answer:
      "Our AI assistant listens to your consultation (with patient consent) or takes your voice notes, then generates structured clinical documentation in real-time. You review and approve with one click. It learns your preferences over time — your commonly used phrases, diagnosis patterns, and prescription habits — making it faster and more accurate the more you use it.",
    category: "Features",
  },
  {
    id: "6",
    question: "What kind of support do you offer?",
    answer:
      "We offer unlimited support included in every plan. This includes phone, email, and live chat support during business hours, plus 24/7 emergency support for critical issues. You'll also have access to our comprehensive help center, video tutorials, and regular webinars. Enterprise customers get a dedicated account manager.",
    category: "Support",
  },
  {
    id: "7",
    question: "Can patients book appointments online?",
    answer:
      "Yes! MediCarePro includes a patient portal where patients can view available slots and book appointments 24/7. You control which time slots are available for online booking, and you can set buffer times, appointment types, and maximum daily bookings. Patients receive automatic confirmations and reminders via SMS or WhatsApp.",
    category: "Features",
  },
  {
    id: "8",
    question: "Is there a mobile app?",
    answer:
      "Yes, we have native mobile apps for both iOS and Android. The apps give you secure access to your patient records, appointment calendar, and notifications wherever you are. You can even conduct video consultations directly from the app. Your staff can use the app too with role-appropriate access.",
    category: "Features",
  },
  {
    id: "9",
    question: "What happens if I want to cancel?",
    answer:
      "We don't believe in locking you in. You can cancel your subscription at any time, and you'll continue to have access until the end of your billing period. When you leave, we provide a complete export of all your data in standard formats. No cancellation fees, no hassles.",
    category: "Billing",
  },
  {
    id: "10",
    question: "Do you offer training for my staff?",
    answer:
      "Absolutely! Every plan includes initial training sessions for your entire team. We offer both remote and on-site training options. Plus, you get unlimited access to our online learning center with step-by-step video tutorials. For Enterprise customers, we provide ongoing training sessions as your team grows.",
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
            Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-slate-600">
            Plain answers to the questions we hear most. Can't find what you're
            looking for? Our team is just a click away.
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
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="btn-secondary"
              onClick={() => trackEvent("faq_contact_click")}
            >
              <Icons.MessageSquare className="w-5 h-5" />
              Chat with us
            </a>
            <a
              href="tel:+1234567890"
              className="btn-secondary"
              onClick={() => trackEvent("faq_phone_click")}
            >
              <Icons.Phone className="w-5 h-5" />
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
