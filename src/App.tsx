import "./index.css";
import { AnalyticsProvider } from "./hooks/useAnalytics";
import { Header, StickyCTA, Footer } from "./components/Layout";
import { Hero } from "./components/Hero";
import { CustomerJourney } from "./components/CustomerJourney";
import { Features } from "./components/Features";
import { UIPreviews } from "./components/UIPreviews";
import { VideoSection } from "./components/VideoSection";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";

function App() {
  return (
    <AnalyticsProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <CustomerJourney />
          <Features />
          <UIPreviews />
          <VideoSection />
          {/* <Testimonials /> */}
          <FAQ />
          {/* <Pricing /> */}
          <FinalCTA />
        </main>
        <Footer />
        <StickyCTA />
      </div>
    </AnalyticsProvider>
  );
}

export default App;
