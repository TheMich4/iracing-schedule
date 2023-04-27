import { type NextPage } from "next";
import Head from "next/head";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>iRacing Schedule</title>
        <meta content="Plan your iRacing Schedule!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="h-full">Settings page</main>
    </>
  );
};

export default Settings;
