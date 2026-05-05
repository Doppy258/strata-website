import { HeroSequence } from "@/components/HeroSequence";
import { StatsStrip } from "@/components/StatsStrip";
import { InfoSections } from "@/components/InfoSections";
import { TimelineSection } from "@/components/TimelineSection";
import { CTASection } from "@/components/CTASection";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSequence />
        <StatsStrip />
        <InfoSections />
        <TimelineSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
