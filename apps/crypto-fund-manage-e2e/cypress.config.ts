import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run crypto-fund-manage:serve',
        production: 'nx run crypto-fund-manage:preview',
      },
      ciWebServerCommand: 'nx run crypto-fund-manage:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
