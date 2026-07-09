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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProgramsSection />
        <OnlineCoursesSection />
        <DuHocSection />
        <Quiz />
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
