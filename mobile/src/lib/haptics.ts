import * as Haptics from 'expo-haptics';

/**
 * Tiny haptic wrapper so the app feels physical: a tick on taps, a buzz on right/wrong, a pop on
 * completion. All calls are fire-and-forget and swallow errors (no-op on web / unsupported devices).
 */
export const haptic = {
  tap: () => Haptics.selectionAsync().catch(() => {}),
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {}),
};
