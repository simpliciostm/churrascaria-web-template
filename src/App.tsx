import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Gallery from './components/sections/Gallery';
import Hero from './components/sections/Hero';
import Location from './components/sections/Location';
import Reviews from './components/sections/Reviews';
import { restaurant } from './data/restaurant';

function App() {
  return (
    <>
      <Header restaurant={restaurant} />
      <main>
        <Hero restaurant={restaurant} />
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
