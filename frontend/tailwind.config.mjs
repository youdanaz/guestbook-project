/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app 폴더 내 모든 파일 스캔
    "./components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 폴더가 있으면 포함
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // 필요하면 커스텀 색상
        secondary: "#F59E0B",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
