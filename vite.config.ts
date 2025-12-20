import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    'import.meta.env.VITE_CONTENTFUL_SPACE_ID': JSON.stringify('ys0eif43qt33'),
    'import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN': JSON.stringify('i8FFszRPBJHiDoBBl51cGXD9yRbDLSuKXW8KLQDpmi8'),
  },
});
