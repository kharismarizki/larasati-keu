import React from "react";
import { RiUserVoiceFill } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import { MdDelete, MdSettings } from "react-icons/md";
import { data } from "../../data/data.js";
import Link from "next/link";
import Sidebar from "@/components/Sidebar.js";

const orders = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <div className="flex justify-between p-4">
        <h2>Orders</h2>
        <h2>Selamat Datang, Admin</h2>
      </div> */}

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
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Time</span>
            <span className="hidden sm:grid">Action</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <RiUserVoiceFill className="text-slate-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      Rp. {order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{order.name.first}</p>
                  </div>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  <span
                    className={
                      order.status == "Proses"
                        ? "bg-yellow-200 p-2 rounded-lg"
                        : order.status == "Selesai"
                        ? "bg-green-200 p-2 rounded-lg"
                        : "bg-orange-200 p-2 rounded-lg"
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <p className="hidden md:flex">{order.date}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <Link href={`/orders/details/${order.id}`}>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                      >
                        <BiDetail
                          className="w-4 h-4 mr-2 fill-current"
                          aria-hidden="true"
                        />
                        Details
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    >
                      <MdSettings
                        className="w-4 h-4 mr-2 fill-current"
                        aria-hidden="true"
                      />
                      Update
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    >
                      <MdDelete
                        className="w-4 h-4 mr-2 fill-current"
                        aria-hidden="true"
                      />
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

export default orders;

orders.getLayout = function getLayout(page) {
  return <Sidebar>{page}</Sidebar>;
};
