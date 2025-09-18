import { useTranslations } from 'next-intl';

export function FeaturedAuctions() {
  const t = useTranslations('Auctions');

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {t('title')}
        </h2>
        <div className="text-center text-muted-foreground">
          {t('noAuctions')}
        </div>
      </div>
    </section>
  );
}