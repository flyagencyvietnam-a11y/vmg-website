import { useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Quiz } from "../components/Quiz";
import { Footer } from "../components/Footer";
import {
  ProgramsSection,
  OnlineCoursesSection,
  DuHocSection,
  ValuesSection,
  Testimonials,
  Partners,
  NewsSection,
  Newsletter,
} from "../components/Sections";

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(#top)"));
    sections.forEach((section, index) => {
      section.classList.add("page-reveal");
      section.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 55}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7%" });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Quiz />
        <ProgramsSection />
        <OnlineCoursesSection />
        <DuHocSection />
        <ValuesSection />
        <Testimonials />
        <Partners />
        <NewsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
