import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import { GlassCard } from '../components/GlassCard';

const workflows = [
  { key: 'ai-assistant', label: 'AI listing assistant', description: 'Draft descriptions and condition notes automatically.' },
  { key: 'fraud-scoring', label: 'Fraud scoring', description: 'Score risky payments and block stolen cards.' },
  { key: 'n8n-sync', label: 'n8n data sync', description: 'Sync donations and auctions to data warehouse.' },
  { key: 'webhooks', label: 'Encore webhooks', description: 'Dispatch events to Encore service webhooks for analytics.' },
];

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#05070d", "#0a1b1f", "#04121a"]} style={StyleSheet.absoluteFill} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <GlassCard intensity={80}>
          <Text style={styles.kicker}>Internal console</Text>
          <Text style={styles.title}>Automation dashboard</Text>
          <Text style={styles.subtitle}>
            Toggle workflows, AI agents, and integrations. This module is shared across mobile and web so the control plane stays
            consistent.
          </Text>
          <Link href="/" style={styles.link}>
            ← Back to home
          </Link>
        </GlassCard>

        {workflows.map((workflow) => (
          <GlassCard key={workflow.key}>
            <View style={styles.workflowRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.workflowLabel}>{workflow.label}</Text>
                <Text style={styles.workflowDescription}>{workflow.description}</Text>
              </View>
              <Switch value onValueChange={() => {}} thumbColor="#7AD8CC" trackColor={{ true: '#16332f', false: '#1f2937' }} />
            </View>
          </GlassCard>
        ))}

        <GlassCard>
          <Text style={styles.subtitle}>
            Need to connect new agents? Wire your N8N or Encore endpoints via `EXPO_PUBLIC_API_BASE_URL` and reuse this dashboard
            to toggle availability.
          </Text>
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
  kicker: {
    color: '#7AD8CC',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#E6EDF3',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 8,
  },
  subtitle: {
    color: '#9EB1C0',
    marginTop: 8,
    lineHeight: 20,
  },
  link: {
    marginTop: 12,
    color: '#7AD8CC',
    fontWeight: '700',
  },
  workflowRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  workflowLabel: {
    color: '#E6EDF3',
    fontWeight: '700',
    fontSize: 16,
  },
  workflowDescription: {
    color: '#9EB1C0',
    marginTop: 4,
  },
});
