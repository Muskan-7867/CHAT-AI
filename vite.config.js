import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({

  build:{
    outDir : "build",
  },
  envPrefix: "REACT_APP",
  plugins: [react(),envCompatible()
  ],
})
