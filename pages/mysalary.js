import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import MySalaryTable from "@/components/table/MySalaryTable";

export default function Report() {
  const [allSal, setAllSal] = useState(0);
  async function fetchCust() {
    try {
      const session = await getSession();

      const resSal = await axios.get("/api/salary", {
        params: { role: session.user.role, idUser: session.user.id },
      });
      let count = 0;
      resSal.data.map((v) => (count += v.total));
      setAllSal(count);
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
        <title>Larasati Keu - My Salary</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="w-full md:col-span-2 col-span-3 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
            <h1 className="font-medium text-gray-900 mb-2">
              Catatan Semua Gaji
            </h1>
            {<MySalaryTable />}
          </div>

          <div className="md:col-span-1 col-span-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Total Seluruh Gaji
            </h5>
            <p className="my-2 font-medium italic text-lg">Rp. {allSal}</p>
            <p className="font-normal text-gray-700">
              Nominal diatas adalah total seluruh gaji yang anda dapatkan selama
              bekerja di Radio Larasati FM
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

Report.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};