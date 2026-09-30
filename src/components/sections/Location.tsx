import { ArrowUpRight, Clock3, AtSign, MapPin, Phone } from 'lucide-react';
import type { RestaurantConfig } from '../../types/restaurant';

interface LocationProps {
  restaurant: RestaurantConfig;
}

const externalHref = (value: string | null, type: 'phone' | 'instagram') => {
  if (!value) return null;
  if (value.startsWith('http')) return value;
  if (type === 'phone') {
    const digits = value.replace(/\D/g, '');
    return digits ? `tel:${digits}` : null;
  }
  const handle = value.replace('@', '').trim();
  return handle ? `https://www.instagram.com/${handle}/` : null;
};

function Location({ restaurant }: LocationProps) {
  const { address, locationSection, openingHours, phone, socialLinks } = restaurant;
  const addressLines = [
    [address.street, address.number].filter(Boolean).join(', '),
    [address.district, address.postalCode].filter(Boolean).join(' • '),
    [address.city, address.state].filter(Boolean).join(' — '),
    address.country,
  ].filter(Boolean);
  const hours = openingHours.length
    ? openingHours.map((item) => `${item.days} ${item.time}`).join(' | ')
    : locationSection.hoursFallback;
  const phoneUrl = externalHref(phone, 'phone');
  const instagramUrl = externalHref(socialLinks.instagram, 'instagram');

  return (
    <section id="localizacao" className="location-section section-light">
      <div className="site-container location-section__layout">
        <div className="location-section__intro" data-reveal>
          <p className="eyebrow">{locationSection.eyebrow}</p>
          <h2>{locationSection.title}</h2>
          <p>{locationSection.description}</p>
          <div className="location-details">
            <div>
              <MapPin aria-hidden="true" />
              <div>
                <span>Endereço</span>
                <address>
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </div>
            <div>
              <Clock3 aria-hidden="true" />
              <div>
                <span>Funcionamento</span>
                <strong>{hours}</strong>
              </div>
            </div>
            {phone && phoneUrl ? (
              <div>
                <Phone aria-hidden="true" />
                <div>
                  <span>Contato</span>
                  <a href={phoneUrl}>{phone}</a>
                </div>
              </div>
            ) : null}
            {socialLinks.instagram && instagramUrl ? (
              <div>
                <AtSign aria-hidden="true" />
                <div>
                  <span>AtSign</span>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    {socialLinks.instagram}
                  </a>
                </div>
              </div>
            ) : null}
          </div>
          {address.googleMapsUrl ? (
            <a
              className="button button--gold"
              href={address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Como chegar <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="location-section__visual" data-reveal>
          {address.googleMapsEmbedUrl ? (
            <iframe
              src={address.googleMapsEmbedUrl}
              title="Mapa de localização da churrascaria"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div
              className="location-placeholder"
              aria-label={`Localização demonstrativa em ${address.city}, ${address.state}`}
            >
              <span className="location-placeholder__rings" aria-hidden="true" />
              <MapPin aria-hidden="true" />
              <p>Onde nos encontrar</p>
              <strong>{address.city}</strong>
              <span>
                {address.state} · {address.country}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Location;
