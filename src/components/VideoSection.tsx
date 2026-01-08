import { useInView } from "../hooks/useAnalytics";

export const VideoSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section
      id="video"
      ref={ref}
      className="section-padding bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Découvrez Smart Medical Centers en Action
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Voyez comment notre plateforme simplifie la gestion de votre centre
            de kinésithérapie
          </p>
        </div>

        <div
          className={`relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <video controls className="w-full">
            <source src="/Video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>
    </section>
  );
};
