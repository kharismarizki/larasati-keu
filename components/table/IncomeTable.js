import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
const columns = [
  {
    name: "Keterangan",
    selector: (row) => row.note,
  },
  {
    name: "Total",
    selector: (row) => row.total,
  },
  {
    name: "Bulan",
    selector: (row) => moment(row.date).format("MMMM YYYY"),
  },
  {
    name: "Nama",
    selector: (row) => row.name,
  },
];

export default function IncomeTable() {
  const [income, setIncome] = useState([]);
  async function fetch() {
    try {
      const session = await getSession();
      const resInc = await axios.get("/api/income", {
        params: { role: session.user.role },
      });
      setIncome(resInc.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return <DataTable columns={columns} data={income} pagination />;
}
