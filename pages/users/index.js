import React, { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import Sidebar from "@/components/Sidebar.js";
import Link from "next/link.js";
import axios from "axios";
import Swal from "sweetalert2";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { MdDelete, MdEdit } from "react-icons/md";

function TableUsers() {
  const [users, setUsers] = useState([]);

  async function handlerDelete(id) {
    const user = users.find((v) => v.id === id);
    Swal.fire({
      title: `Hapus user ${user.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f172a",
    }).then((result) => {
      if (result.isConfirmed) {
        const afterDel = users.filter((v) => v.id !== id);
        setUsers(afterDel);
        axios.delete("/api/users/" + user.id);
      }
    });
  }

  async function fetchUsers() {
    try {
      const session = await getSession();
      if (!session) throw new Error(session);
      const res = await axios.get("/api/users", {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      hide: "sm",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      hide: "md",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex rounded-md shadow-sm" role="group">
            <Link href={`/users/form/${row.id}`}>
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
    fetchUsers();
  }, []);
  return (
    <>
      <DataTable columns={columns} data={users} pagination />
    </>
  );
}

export default function Users() {
  const router = useRouter();

  async function checkRole() {
    try {
      const session = await getSession();
      if (!session) throw new Error(session);
      if (session.user.role === "penyiar") {
        toast.error("Unauthorized", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        return router.replace("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkRole();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <Link href={"/users/form"}>
          <button
            type="button"
            className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Buat Pengguna
          </button>
        </Link>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <TableUsers />
        </div>
      </div>
    </div>
  );
}

Users.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
