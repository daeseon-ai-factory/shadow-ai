import * as SecureStore from 'expo-secure-store';

// First-run onboarding state. Kept local (per device) — a returning login skips it, only a fresh
// signup is routed through it. v1 in the key so we can re-run onboarding after a redesign if needed.
const DONE_KEY = 'onboarding.v1.done';
const GOAL_KEY = 'onboarding.v1.goalMinutes';

export async function isOnboardingDone(): Promise<boolean> {
  return (await SecureStore.getItemAsync(DONE_KEY)) === 'done';
}

export async function completeOnboarding(goalMinutes?: number): Promise<void> {
  if (goalMinutes) await SecureStore.setItemAsync(GOAL_KEY, String(goalMinutes));
  await SecureStore.setItemAsync(DONE_KEY, 'done');
}

/** The learner's chosen daily target in minutes, or null if not set. */
export async function getGoalMinutes(): Promise<number | null> {
  const v = await SecureStore.getItemAsync(GOAL_KEY);
  return v ? Number(v) : null;
}
