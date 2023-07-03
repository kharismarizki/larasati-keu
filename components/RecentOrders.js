import React from "react";
import moment from "moment/moment";
import { FaShoppingBag } from "react-icons/fa";

const RecentOrders = ({ data }) => {
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Pelanggan Terbaru</h1>
      <ul>
        {data.slice(0, 10).map((value, id) => (
          <li
            key={id}
            className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
          >
            <div className="bg-purple-100 rounded-lg p-3">
              <FaShoppingBag className="text-slate-800" />
            </div>
            <div className="pl-4">
              <p className="text-gray-800 font-bold">{value.name}</p>
              <p className="text-gray-400 text-sm">Rp. {value.total}</p>
            </div>
            <p className="lg:flex hidden absolute right-6 text-sm">
              {moment(value.createdAt).startOf("hour").fromNow()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
