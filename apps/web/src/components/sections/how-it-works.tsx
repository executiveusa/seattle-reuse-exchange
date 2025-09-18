import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('HomePage');

  const steps = [
    {
      number: '01',
      title: 'Browse Auctions',
      description: 'Discover office furniture and equipment saved from landfills',
    },
    {
      number: '02',
      title: 'Place Your Bid',
      description: 'Use our AI assistant for bidding strategy and item insights',
    },
    {
      number: '03',
      title: 'Win & Pickup',
      description: 'Collect your items and see your environmental impact',
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {t('featuresTitle')}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}