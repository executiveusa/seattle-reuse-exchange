import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

const heroImage = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80';

export default function Home() {
  const { items, offline, loading, refresh } = useMarketplaceData();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#05070d", "#0a1b1f", "#04121a"]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <GlassCard intensity={90}>
          <View style={styles.hero}>
            <View style={styles.heroText}>
              <Text style={styles.kicker}>Circular marketplace</Text>
              <Text style={styles.title}>The Last Collection</Text>
              <Text style={styles.subtitle}>
                Bid, donate, and celebrate sustainable finds. Built with liquid glass aesthetics and ready for mobile-first
                experiences.
              </Text>
              <View style={styles.ctaRow}>
                <Link href="/dashboard" style={styles.primaryCta}>
                  Manage workflows
                </Link>
                <Link href="/offline" style={styles.secondaryCta}>
                  Offline mode
                </Link>
              </View>
            </View>
            <Image source={{ uri: heroImage }} style={styles.heroImage} resizeMode="cover" />
          </View>
        </GlassCard>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured drops</Text>
          <Text style={styles.sectionSubtitle}>{offline ? 'Offline — showing cached items' : 'Live data ready'}</Text>
        </View>

        <View style={styles.grid}>
          {items.map((item) => (
            <GlassCard key={item.id}>
              <View style={styles.cardRow}>
                {item.image ? <Image source={{ uri: item.image }} style={styles.cardImage} /> : null}
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemMeta}>{item.category}</Text>
                  <Text style={styles.itemStatus}>{item.status.toUpperCase()}</Text>
                  {item.price ? <Text style={styles.itemPrice}>${item.price}</Text> : null}
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        <GlassCard>
          <Text style={styles.sectionTitle}>Automation ready</Text>
          <Text style={styles.subtitle}>
            Trigger AI agents, n8n workflows, and Encore APIs with a single tap. This starter ships with predictable hooks for
            Expo, web, and service workers.
          </Text>
          <Text style={styles.hint}>Use the dashboard to toggle workflows.</Text>
        </GlassCard>

        {loading ? <Text style={styles.loading}>Refreshing marketplace…</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070d',
  },
  scroll: {
    padding: 16,
    gap: 16,
  },
  hero: {
    flexDirection: 'column',
    gap: 12,
  },
  heroText: {
    gap: 8,
  },
  kicker: {
    color: '#7AD8CC',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#E6EDF3',
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9EB1C0',
    fontSize: 16,
    lineHeight: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  primaryCta: {
    backgroundColor: '#7AD8CC',
    color: '#04121a',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    fontWeight: '700',
  },
  secondaryCta: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#E6EDF3',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#E6EDF3',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#9EB1C0',
    fontSize: 14,
  },
  grid: {
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardImage: {
    width: 86,
    height: 86,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  itemTitle: {
    color: '#E6EDF3',
    fontWeight: '700',
    fontSize: 16,
  },
  itemMeta: {
    color: '#9EB1C0',
    marginTop: 2,
  },
  itemStatus: {
    color: '#7AD8CC',
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  itemPrice: {
    color: '#EBC017',
    fontWeight: '700',
    marginTop: 4,
  },
  loading: {
    color: '#9EB1C0',
    textAlign: 'center',
    marginBottom: 24,
  },
  hint: {
    color: '#7AD8CC',
    marginTop: 8,
  },
});
