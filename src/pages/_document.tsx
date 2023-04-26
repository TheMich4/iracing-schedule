import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="min-w-screen flex min-h-screen flex-col items-center justify-center font-kanit dark:bg-gradient-to-br dark:from-slate-800 dark:to-[#15162c] dark:text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
