import { Clock3, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface QuickInfoProps {
  restaurant: RestaurantConfig;
}
interface InfoItem {
  label: string;
  value: string;
  href?: string;
  Icon: LucideIcon;
}

function phoneHref(phone: string | null) {
  const digits = phone?.replace(/\D/g, '');
  return digits ? `tel:${digits}` : undefined;
}

function QuickInfo({ restaurant }: QuickInfoProps) {
  const { address, locationSection, openingHours, phone } = restaurant;
  const hours = openingHours.length
    ? `${openingHours[0].days} ${openingHours[0].time}`
    : locationSection.hoursFallback;
  const location = [address.city, address.state].filter(Boolean).join(' — ');
  const items: InfoItem[] = [
    { label: 'Horário de funcionamento', value: hours, Icon: Clock3 },
    { label: 'Nossa localização', value: location, Icon: MapPin },
    ...(phone
      ? [{ label: 'Fale com a gente', value: phone, href: phoneHref(phone), Icon: Phone }]
      : []),
  ];

  return (
    <section id="informacoes" className="quick-info" aria-label="Informações rápidas">
      <ul className="site-container quick-info__grid">
        {items.map(({ label, value, href, Icon }) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            <div>
              <span>{label}</span>
              {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuickInfo;
