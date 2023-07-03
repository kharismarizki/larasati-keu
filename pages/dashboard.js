import Head from "next/head";
import TopCards from "../components/TopCards";
import BarChart from "../components/BarChart";
import RecentOrders from "../components/RecentOrders";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Dashboard() {
  const [cust, setCust] = useState([]);
  const [rec, setRec] = useState([]);
  async function fetchCust() {
    try {
      const session = await getSession();
      const res = await axios.get("/api/customers", {
        params: { role: session.user.role, id: session.user.id },
      });
      const resRecap = await axios.get("/api/others/recap", {
        params: { role: session.user.role, id: session.user.id },
      });
      setCust(res.data);
      setRec(resRecap.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCust();
  }, []);
  return (
    <>
      <Head>
        <title>Larasati Keu - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        {/* <Header /> */}
        <TopCards data={rec} />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders data={cust} />
        </div>
      </main>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
