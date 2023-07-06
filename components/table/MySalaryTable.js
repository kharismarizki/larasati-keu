import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MySalaryTable() {
  const [salary, setSalary] = useState([]);
  async function fetch() {
    try {
      const session = await getSession();
      const resSal = await axios.get("/api/salary", {
        params: { role: session.user.role, idUser: session.user.id },
      });
      setSalary(resSal.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  const columns = [
    {
      name: "Nama Penyiar",
      selector: (row) => row.user.username,
    },
    {
      name: "Total Gaji",
      selector: (row) => row.total,
    },
    {
      name: "Bulan",
      selector: (row) => moment(row.date).format("MMMM YYYY"),
    },
    {
      name: "Keterangan",
      selector: (row) => row.note,
    },
  ];
  return <DataTable columns={columns} data={salary} pagination />;
}
