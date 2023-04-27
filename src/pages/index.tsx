import { type NextPage } from "next";
import Head from "next/head";
import ScheduleTable from "~/components/schedule-table";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>iRacing Schedule</title>
        <meta content="Plan your iRacing Schedule!" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className="h-full">
        <ScheduleTable />
      </main>
    </>
  );
};

export default Home;
