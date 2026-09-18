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

function createWhatsappHref(whatsapp: string | null) {
  if (!whatsapp) {
    return null;
  }

  const digits = whatsapp.replace(/\D/g, '');

  return digits ? `https://wa.me/${digits}` : null;
}

function Header({ restaurant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const whatsappHref = createWhatsappHref(restaurant.whatsapp);

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
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-[linear-gradient(180deg,rgba(23,21,18,0.78),rgba(23,21,18,0))]">
      <div className="site-container flex h-[5.5rem] items-center justify-between gap-6 sm:h-24">
        <a
          href="#inicio"
          className="font-display text-[1.85rem] font-semibold tracking-[0.08em] text-[var(--color-foreground)] outline-offset-8 transition-colors hover:text-[var(--color-muted)] sm:text-3xl lg:text-[2rem]"
          aria-label={`${restaurant.name} - voltar ao início`}
          onClick={closeMenu}
        >
          {restaurant.shortName}
        </a>

        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-9"
          aria-label="Navegação principal"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.92rem] font-semibold text-[var(--color-muted)] outline-offset-8 transition-colors hover:text-[var(--color-foreground)] xl:text-[0.95rem]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className="border border-[var(--color-copper)] px-5 py-2.5 text-[0.95rem] font-semibold text-[var(--color-foreground)] outline-offset-8 transition-colors hover:bg-[var(--color-copper)] hover:text-[var(--color-background)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          ) : null}
        </div>

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
          className="mb-5 border border-white/12 bg-[rgba(23,21,18,0.96)] p-6"
          aria-label="Navegação mobile"
        >
          <div className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-1 py-4 text-[1.0625rem] font-semibold text-[var(--color-muted)] outline-offset-4 transition-colors hover:text-[var(--color-foreground)]"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>

          {whatsappHref ? (
            <a
              href={whatsappHref}
              className="mt-5 block border border-[var(--color-copper)] px-5 py-3 text-center text-sm font-semibold text-[var(--color-foreground)] outline-offset-4 transition-colors hover:bg-[var(--color-copper)] hover:text-[var(--color-background)]"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              WhatsApp
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
