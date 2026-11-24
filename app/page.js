import HeroCarousel from "./components/HeroCarousel";
import HomeSections from "./components/HomeSections";

export default function HomePage() {
  return (
    <main id="main-content" className="church-home">
      <HeroCarousel />
      <HomeSections />
    </main>
  );
}
