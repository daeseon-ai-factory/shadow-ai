import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * Pulsing gray placeholder for loading states — replaces raw spinners so screens feel like they're
 * "filling in" instead of frozen. Theme-agnostic translucent gray works on light and dark.
 */
export function Skeleton({ style }: { style?: ViewStyle }) {
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 650, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return <Animated.View style={[styles.base, { opacity }, style]} />;
}

/** A list of card-shaped skeletons — for video/clip/review lists while they load. */
export function SkeletonCards({ count = 4, height = 80 }: { count?: number; height?: number }) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} style={{ height, borderRadius: 16 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: 'rgba(130,130,130,0.18)', borderRadius: 10, width: '100%' },
  list: { gap: 12, padding: 16 },
});
