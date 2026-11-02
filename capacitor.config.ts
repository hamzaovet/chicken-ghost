import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chickenghost.app',
  appName: 'تشيكن جوست',
  webDir: 'public',
  server: {
    url: 'https://chicken-ghost.vercel.app',
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#0b0914',
  },
};

export default config;
