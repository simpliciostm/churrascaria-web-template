import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Gallery from './components/sections/Gallery';
import Hero from './components/sections/Hero';
import Location from './components/sections/Location';
import Menu from './components/sections/Menu';
import MenuShowcase from './components/sections/MenuShowcase';
import QuickInfo from './components/sections/QuickInfo';
import Reviews from './components/sections/Reviews';
import { restaurant } from './data/restaurant';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <>
      <Header restaurant={restaurant} />
      <main>
        <Hero restaurant={restaurant} />
        <QuickInfo restaurant={restaurant} />
        <Menu restaurant={restaurant} />
        <MenuShowcase restaurant={restaurant} />
        <About restaurant={restaurant} />
        <Experience restaurant={restaurant} />
        <Gallery restaurant={restaurant} />
        <Reviews restaurant={restaurant} />
        <Location restaurant={restaurant} />
      </main>
      <Footer restaurant={restaurant} />
    </>
  );
}

export default App;
