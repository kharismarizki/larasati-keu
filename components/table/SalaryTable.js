import moment from "moment/moment";
import DataTable from "react-data-table-component";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SalaryTable() {
  const [salary, setSalary] = useState([]);
  async function fetch() {
    try {
      const session = await getSession();
      const resSal = await axios.get("/api/salary", {
        params: { role: session.user.role },
      });
      setSalary(resSal.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlerDelete(id) {
    const getSal = salary.find((v) => v.id === id);
    Swal.fire({
      title: `Hapus gaji ${getSal.user.username}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDel = salary.filter((v) => v.id !== id);
        setSalary(afterDel);
        axios.delete("/api/salary/" + getSal.id);
      }
    });
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
  return <DataTable columns={columns} data={salary} pagination />;
}
