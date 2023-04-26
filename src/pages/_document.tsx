import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body className="min-w-screen flex min-h-screen flex-col items-center justify-center font-kanit">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
