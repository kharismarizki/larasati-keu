import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Total",
    selector: (row) => -row.total,
  },
  {
    name: "Month",
    selector: (row) => moment(row.date).format("MMMM YYYY"),
  },
  {
    name: "Note",
    selector: (row) => row.note,
  },
];

export default function OutcomeTable() {
  const [outcome, setOutcome] = useState([]);
  async function fetch() {
    try {
      const session = await getSession();
      const resOut = await axios.get("/api/outcome", {
        params: { role: session.user.role },
      });
      setOutcome(resOut.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return <DataTable columns={columns} data={outcome} pagination />;
}
