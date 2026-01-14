//File that might affect styling in production level if change 
//✅ Production-safe
//✅ Works with Next.js App Router
//✅ Compatible with Vercel
//✅ Fixes missing styles

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
