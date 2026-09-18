import { Menu, X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
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

function Header({ restaurant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 bg-[rgba(21,18,15,0.22)] text-[var(--color-foreground)] backdrop-blur-[2px]">
      <div className="site-container flex h-20 items-center justify-between gap-6 lg:h-24">
        <a
          href="#inicio"
          className="inline-flex flex-col outline-offset-8 transition-colors hover:text-[var(--color-muted)]"
          aria-label={`${restaurant.name} - voltar ao início`}
          onClick={closeMenu}
        >
          <span className="font-display text-[1.65rem] font-semibold leading-none tracking-[0.12em] sm:text-[1.9rem]">
            {restaurant.shortName}
          </span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[var(--color-muted)]">
            {restaurant.footer.category}
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-9"
          aria-label="Navegação principal"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-semibold text-white/82 outline-offset-8 transition-colors hover:text-[var(--color-copper)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-12 items-center justify-center border border-white/20 text-[var(--color-foreground)] outline-offset-4 transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] lg:hidden"
          aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id={menuId}
        className={`site-container lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className="mb-5 border border-white/12 bg-[rgba(21,18,15,0.98)] p-5"
          aria-label="Navegação mobile"
        >
          <div className="grid gap-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-12 px-1 py-3 text-[1.0625rem] font-semibold text-[var(--color-muted)] outline-offset-4 transition-colors hover:text-[var(--color-foreground)]"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
