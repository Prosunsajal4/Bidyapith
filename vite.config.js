import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split large libraries
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-firebase": ["firebase/app", "firebase/auth"],
          "vendor-charts": ["recharts"],
          "vendor-ui": ["react-icons", "aos", "swiper", "react-hot-toast"],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly
  },
});
