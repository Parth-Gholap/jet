import Preloader from "../components/Preloader";
import Hero from "../components/sections/Hero";
import AircraftDeconstruction from "../components/sections/AircraftDeconstruction";
import TechnologyGrid from "../components/sections/TechnologyGrid";
import CinematicShowcase from "../components/sections/CinematicShowcase";
import ImmersiveStory from "../components/sections/ImmersiveStory";
import FinalCTA from "../components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="relative bg-transparent w-full">
      <Preloader />
      <Hero />
      <AircraftDeconstruction />
      <TechnologyGrid />
      <CinematicShowcase />
      <ImmersiveStory />
      <FinalCTA />
    </main>
  );
}
