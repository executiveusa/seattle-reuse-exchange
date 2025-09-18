import { useTranslations } from 'next-intl';

export function ImpactStats() {
  const t = useTranslations('HomePage');

  const stats = [
    { number: '10,000+', label: 'Items Diverted from Landfills' },
    { number: '$500K+', label: 'Raised for Nonprofits' },
    { number: '50 Tons', label: 'CO2 Emissions Prevented' },
    { number: '2,500+', label: 'Happy Bidders' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {t('impactTitle')}
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}