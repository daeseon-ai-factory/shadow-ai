/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#102033',
    background: '#F6FAFF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E5F0FF',
    textSecondary: '#66758A',
    border: '#D7E4F2',
    primary: '#096AE8',
    primaryStrong: '#034EBC',
    primarySoft: '#E1EFFF',
    accent: '#12BFB9',
    accentSoft: '#DDF8F6',
    coral: '#FF744D',
    surfaceRaised: '#FFFFFF',
  },
  dark: {
    text: '#F8FBFF',
    background: '#07111F',
    backgroundElement: '#111D2D',
    backgroundSelected: '#183455',
    textSecondary: '#AAB8C9',
    border: '#26394F',
    primary: '#52A0FF',
    primaryStrong: '#7EBDFF',
    primarySoft: '#102C4F',
    accent: '#25D3CD',
    accentSoft: '#0F3A3C',
    coral: '#FF8A64',
    surfaceRaised: '#101A28',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
