import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "@/assets/car-top-view.png";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ".split("");

const stats = [
  { value: "58%", label: "Increase in pick up point use" },
  { value: "23%", label: "Decreased in customer phone calls" },
  { value: "27%", label: "Increase in pick up point use" },
  { value: "40%", label: "Decreased in customer phone calls" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro: staggered headline letters
      const letters = headlineRef.current?.querySelectorAll(".letter");
      if (letters) {
        gsap.from(letters, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        });
      }

      // Intro: stats fade in
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      if (statCards) {
        gsap.from(statCards, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          delay: 0.6,
          ease: "power2.out",
        });
      }

      // Scroll-driven car animation
      if (carRef.current && sectionRef.current) {
        gsap.to(carRef.current, {
          x: () => window.innerWidth + 200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            pin: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden bg-background flex flex-col"
      >
        {/* Headline */}
        <div
          ref={headlineRef}
          className="flex-1 flex items-end justify-center pb-8 md:pb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-[0.3em] md:tracking-[0.4em] select-none">
            {HEADLINE.map((char, i) => (
              <span key={i} className="letter inline-block text-foreground">
                {char === " " ? "\u00A0\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Road + Car */}
        <div ref={roadRef} className="relative w-full">
          {/* Road */}
          <div className="road-section w-full h-28 md:h-36 relative flex items-center">
            {/* Road stripe */}
            <div className="road-stripe absolute left-0 w-8 md:w-12 h-full" />

            {/* Car */}
            <img
              ref={carRef}
              src={carImage}
              alt="McLaren 720S top view"
              className="absolute -top-16 md:-top-24 left-0 w-32 md:w-48 lg:w-56 -rotate-90 z-10 will-change-transform"
              width={512}
              height={1024}
            />
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex-1 flex items-start justify-center pt-8 md:pt-12 px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card text-center">
                <p className="text-2xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra scroll space for the scroll-driven animation */}
      <div className="h-[200vh] bg-background" />
    </>
  );
};

export default HeroSection;
