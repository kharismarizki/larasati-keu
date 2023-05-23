import React, { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { MdDelete, MdSettings } from "react-icons/md";
import Sidebar from "@/components/Sidebar.js";
import Link from "next/link.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";

const users = () => {
  const { data: session, status } = useSession();
  // console.log(session?.user, status);
  // if (status === "unauthenticated") {
  //   Router.push("/");
  // }
  const [users, setUsers] = useState([]);
  const [refreshToken, setRefreshToken] = useState(Math.random());

  async function handlerDelete(id) {
    const user = users.find((v) => v.id === id);
    Swal.fire({
      title: `Hapus user ${user.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#0f172a",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const afterDel = users.filter((v) => v.id === id);
        setUsers(afterDel);
        axios.delete("/api/users/" + user.id);
        Swal.fire({
          title: "Data berhasil dihapus",
          confirmButtonColor: "#0f172a",
        });
      }
    });
  }

  useEffect(() => {
    axios
      .get("/api/users")
      .then((r) => setUsers(r.data))
      .catch((e) => console.log(e))
      .finally(() => setTimeout(() => setRefreshToken(Math.random()), 3000));
  }, [refreshToken]);

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
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Username</span>
            <span className="hidden md:grid">Role</span>
            <span className="hidden sm:grid">Action</span>
          </div>
          <ul>
            {users.map((user, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <BsPersonFill className="text-slate-800" />
                  </div>
                  <p className="pl-4">{user.name}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {user.username}
                </p>
                <p className="hidden md:flex">{user.role}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <Link href={"/users/form/" + user.id}>
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                      onClick={handlerDelete.bind(this, user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default users;

users.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
