import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-[#15162c] font-kanit text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
