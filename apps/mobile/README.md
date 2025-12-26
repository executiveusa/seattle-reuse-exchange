# The Last Collection Mobile (Expo)

An Expo-managed YAPP experience for The Last Collection with mobile-first UI, glassmorphism styling, and a built-in automation dashboard.

## Commands

```bash
pnpm install
pnpm --filter @seattle-reuse-exchange/mobile start   # Metro bundler
pnpm --filter @seattle-reuse-exchange/mobile web     # Expo web preview / PWA
pnpm --filter @seattle-reuse-exchange/mobile ios     # iOS simulator
pnpm --filter @seattle-reuse-exchange/mobile android # Android emulator
```

## Configuration

- **API base**: set `EXPO_PUBLIC_API_BASE_URL` to reuse the Encore/Next.js APIs. When absent, the app falls back to cached data.
- **Build**: `app.json` and `eas.json` are provided for iOS/Android packaging via EAS.
- **Offline**: featured listings are cached with AsyncStorage and mirrored on Expo web for PWA-style resilience.
- **Assets**: icon and splash images are generated from embedded base64 via `prepare:assets` and run automatically before each Expo command. If needed, run `pnpm --filter @seattle-reuse-exchange/mobile prepare:assets` to recreate them.
