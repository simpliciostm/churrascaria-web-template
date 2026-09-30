import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection';
import type { RestaurantConfig } from '../../types/restaurant';

interface HeaderProps {
  restaurant: RestaurantConfig;
}

const navigationItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'A casa', href: '#a-casa' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Localização', href: '#localizacao' },
];

const navigationSectionIds = navigationItems.map((item) => item.href.slice(1));

function Header({ restaurant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const activeSection = useActiveSection(navigationSectionIds);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 56);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled || isMenuOpen ? 'site-header--scrolled' : ''}`}>
      <div className="site-container site-header__inner">
        <a
          href="#inicio"
          className="brand"
          aria-label={`${restaurant.name} - voltar ao início`}
          onClick={closeMenu}
        >
          <span className="brand__name">{restaurant.shortName}</span>
          <span className="brand__category">{restaurant.footer.category}</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
              aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        id={menuId}
        className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
        hidden={!isMenuOpen}
      >
        <nav className="site-container" aria-label="Navegação mobile">
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
              aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              onClick={closeMenu}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
