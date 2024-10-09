import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';

export default defineConfig(({ mode }) => ({
  publicDir: 'assets',
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.BUILD': JSON.stringify('web'),
    }),
    tsconfigPaths(),
  ],
  build: {
    outDir: 'build',
    lib: {
      entry: 'src/index.tsx',
      fileName: 'index',
      formats: ['cjs'],
    },
  },
}));
