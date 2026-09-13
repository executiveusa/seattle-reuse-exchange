import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
  intensity?: number;
}

export function GlassCard({ children, intensity = 60 }: Props) {
  return (
    <BlurView intensity={intensity} tint="dark" style={styles.card} experimentalBlurMethod="dimezisBlurView">
      <LinearGradient
        colors={["rgba(255,255,255,0.08)", "rgba(122, 216, 204, 0.12)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  content: {
    padding: 16,
  },
});
