import React from "react";
import Link from "next/link";
import { RxDashboard, RxPerson } from "react-icons/rx";
import { RiVoiceprintFill, RiLogoutBoxLine } from "react-icons/ri";
import { CgShoppingBag } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import Header from "./Header";

const Sidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/dashboard">
            <div className="bg-slate-800 text-white p-3 rounded-lg inline-block">
              <RiVoiceprintFill size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/dashboard">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
          </Link>
          <Link href="/users">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RxPerson size={20} />
            </div>
          </Link>
          <Link href="/orders">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <CgShoppingBag size={20} />
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/">
            <div className="bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
              <RiLogoutBoxLine size={20} />
            </div>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
