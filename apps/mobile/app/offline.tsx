import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { useMarketplaceData } from '../hooks/useMarketplaceData';

export default function Offline() {
  const { items, offline } = useMarketplaceData();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#05070d", "#0a1b1f", "#04121a"]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <GlassCard intensity={80}>
          <Text style={styles.title}>Offline-first experience</Text>
          <Text style={styles.subtitle}>
            Cached marketplace items remain available when the network drops. Service worker support comes from Expo web, and
            AsyncStorage keeps your latest items ready on device.
          </Text>
          <Text style={styles.status}>{offline ? 'Offline cache active' : 'Online and caching'}</Text>
          <Link href="/" style={styles.link}>
            ← Back home
          </Link>
        </GlassCard>

        <GlassCard>
          <Text style={styles.sectionTitle}>Cached previews</Text>
          {items.map((item) => (
            <Text key={item.id} style={styles.cachedItem}>
              • {item.title} — {item.category}
            </Text>
          ))}
        </GlassCard>
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
  title: {
    color: '#E6EDF3',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#9EB1C0',
    marginTop: 8,
    lineHeight: 20,
  },
  status: {
    marginTop: 10,
    color: '#7AD8CC',
    fontWeight: '700',
  },
  link: {
    marginTop: 14,
    color: '#7AD8CC',
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#E6EDF3',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  cachedItem: {
    color: '#9EB1C0',
    marginTop: 4,
  },
});
