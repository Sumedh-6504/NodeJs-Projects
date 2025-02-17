import autoprefixer from "autoprefixer";

export default {
  plugins: [
    async () => {
      const tailwindcss = await import("tailwindcss");
      return tailwindcss.default; // Access the default export
    },
    autoprefixer,
  ],
};
