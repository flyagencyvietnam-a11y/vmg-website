import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Quiz } from "./components/Quiz";
import { Footer } from "./components/Footer";
import {
  FeatureStrip,
  ProgramsSection,
  OnlineCoursesSection,
  ValuesSection,
  Testimonials,
  StatsBar,
  Partners,
  NewsSection,
  Newsletter,
} from "./components/Sections";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Quiz />
        <FeatureStrip />
        <ProgramsSection />
        <OnlineCoursesSection />
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

export default App;
