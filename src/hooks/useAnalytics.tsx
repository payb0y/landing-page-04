import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";

// Analytics Context
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
}

interface AnalyticsContextType {
  trackEvent: (name: string, properties?: Record<string, unknown>) => void;
  trackPageView: (page: string) => void;
  events: AnalyticsEvent[];
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const trackEvent = (name: string, properties?: Record<string, unknown>) => {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    };
    setEvents((prev) => [...prev, event]);
    console.log("📊 Analytics Event:", event);
  };

  const trackPageView = (page: string) => {
    trackEvent("page_view", { page });
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView, events }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }
  return context;
};

// Scroll position hook
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setScrollPosition(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollPosition, scrollDirection };
};

// Section visibility hook for sticky CTA context
export const useSectionVisibility = () => {
  const [visibleSection, setVisibleSection] = useState<string>("hero");

  useEffect(() => {
    const sections = [
      "hero",
      "journey",
      "features",
      "ui-previews",
      "testimonials",
      "faq",
      "pricing",
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSection(sectionId);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return visibleSection;
};

// Get CTA text based on current section
export const getCTAText = (section: string): { text: string; href: string } => {
  const ctaMap: Record<string, { text: string; href: string }> = {
    hero: { text: "Start Free Trial", href: "#pricing" },
    journey: { text: "See How It Works", href: "#features" },
    features: { text: "View Pricing", href: "#pricing" },
    "ui-previews": { text: "Try It Free", href: "#pricing" },
    testimonials: { text: "Join Happy Doctors", href: "#pricing" },
    faq: { text: "Get Started Now", href: "#pricing" },
    pricing: { text: "Contact Sales", href: "#contact" },
  };
  return ctaMap[section] || { text: "Start Free Trial", href: "#pricing" };
};

// Intersection observer hook for animations
export const useInView = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, isInView };
};
