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
  StatsBar,
  Partners,
  NewsSection,
  Newsletter,
} from "../components/Sections";

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
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
        <StatsBar />
        <Partners />
        <NewsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
import { useEffect } from "react";
