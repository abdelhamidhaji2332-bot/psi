import type { Config } from "tailwindcss";
export default { 
  darkMode: 'class',
  content: ["./app/**/*.tsx","./components/**/*.tsx"], 
  theme:{
    extend:{
      colors:{ink:"#09090B",mute:"#71717A",act:"#27272A"},
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    }
  }, 
  plugins:[] 
} satisfies Config;
