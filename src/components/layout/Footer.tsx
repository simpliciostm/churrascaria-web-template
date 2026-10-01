import { ArrowUp, AtSign } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface FooterProps {
  restaurant: RestaurantConfig;
}
const links = [
  ['Início', '#inicio'],
  ['Cardápio', '#cardapio'],
  ['A casa', '#a-casa'],
  ['Experiência', '#experiencia'],
  ['Galeria', '#galeria'],
  ['Localização', '#localizacao'],
];

function instagramHref(instagram: string | null) {
  if (!instagram) return null;
  if (instagram.startsWith('http')) return instagram;
  const handle = instagram.replace('@', '').trim();
  return handle ? `https://www.instagram.com/${handle}/` : null;
}

function Footer({ restaurant }: FooterProps) {
  const instagram = instagramHref(restaurant.socialLinks.instagram);
  const location = [restaurant.address.city, restaurant.address.state].filter(Boolean).join(', ');
  const goTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__main">
          <a
            href="#inicio"
            className="brand brand--footer"
            aria-label={`${restaurant.name} - voltar ao início`}
          >
            <span className="brand__name">{restaurant.shortName}</span>
            <span className="brand__category">{restaurant.footer.category}</span>
          </a>
          <nav aria-label="Navegação do rodapé">
            {links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="site-footer__actions">
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`AtSign ${restaurant.socialLinks.instagram}`}
              >
                <AtSign />
              </a>
            ) : null}
            <button type="button" onClick={goTop} aria-label="Voltar ao topo">
              <ArrowUp />
            </button>
          </div>
        </div>
        {restaurant.publication.status === 'demo' ? (
          <p className="site-footer__demo-notice">Projeto demonstrativo — site não oficial</p>
        ) : null}
        <div className="site-footer__bottom">
          <div>
            <p>
              © {new Date().getFullYear()} {restaurant.name}
            </p>
            <p>{restaurant.footer.disclaimer}</p>
          </div>
          {location ? <p>{location} — Feito para bons encontros.</p> : null}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
