import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Two upstream React Compiler-flavored rules we intentionally relax:
    // - set-state-in-effect: we hydrate from localStorage and reset state when a
    //   parent prop (clipId, etc.) changes. Pre-Compiler patterns; the SSR-safe
    //   alternatives (lazy useState + hydration handling, or parent-side
    //   `key={prop}` plumbing) cost more code than they buy at our scale.
    // - exhaustive-deps: kept as warning so intentional omissions don't block CI.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

export default eslintConfig;
