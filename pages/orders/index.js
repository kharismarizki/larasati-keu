import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Sidebar from "@/components/Sidebar.js";
import axios from "axios";
import moment from "moment/moment";
import Swal from "sweetalert2";
import { getSession } from "next-auth/react";
import { MdDelete, MdEdit } from "react-icons/md";

function TableCustomers() {
  const [cust, setCust] = useState([]);

  async function fetchCust() {
    try {
      const session = await getSession();
      // if (!session) throw new Error(session);
      const res = await axios.get("/api/customers", {
        params: { role: session.user.role, id: session.user.id },
      });
      setCust(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handlerDelete(id) {
    const getCust = cust.find((v) => v.id === id);
    Swal.fire({
      title: `Hapus customer ${getCust.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDel = cust.filter((v) => v.id !== id);
        setCust(afterDel);
        axios.delete("/api/customers/" + getCust.id);
      }
    });
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Total",
      selector: (row) => row.total,
      hide: "sm",
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      format: (row) => moment(row.createdAt).format("L"),
      hide: "md",
    },
    {
      name: "User",
      selector: (row) => row.user?.username,
      hide: "md",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex rounded-md shadow-sm" role="group">
            <Link href={`/orders/form/${row.id}`}>
              <button
                type="button"
                className="w-fit px-2 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
              >
                <MdEdit />
              </button>
            </Link>
            <button
              type="button"
              className="px-2 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
              onClick={() => handlerDelete(row.id)}
            >
              <MdDelete />
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchCust();
  }, []);
  return (
    <>
      <DataTable columns={columns} data={cust} pagination />
    </>
  );
}

export default function Order() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <Link href={"/orders/form"}>
          <button
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            Tambah Data
          </button>
        </Link>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <TableCustomers />
        </div>
      </div>
    </div>
  );
}

Order.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
