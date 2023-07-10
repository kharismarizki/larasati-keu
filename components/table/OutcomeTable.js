import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  async function handlerDelete(id) {
    const getOut = outcome.find((v) => v.id === id);
    Swal.fire({
      title: `Hapus pengeluaran ${getOut.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDel = outcome.filter((v) => v.id !== id);
        setOutcome(afterDel);
        axios.delete("/api/outcome/" + getOut.id);
      }
    });
  }
  useEffect(() => {
    fetch();
  }, []);

  // format rupiah
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      // currency: "IDR",
    }).format(number);
  };

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Total",
      selector: (row) => "Rp. -" + rupiah(row.total),
    },
    {
      name: "Bulan",
      selector: (row) => moment(row.date).format("MMMM YYYY"),
    },
    {
      name: "Keterangan",
      selector: (row) => row.note,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <button
            className="text-slate-700 hover:text-white border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm p-1 text-center mr-2 mb-2"
            type="button"
            onClick={() => handlerDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={outcome} pagination />;
}
