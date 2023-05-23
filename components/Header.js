import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between px-4 pt-4 bg-gray-100">
      <h2>{router.pathname.split("/").pop().toString().toUpperCase()}</h2>
      <h2>Selamat Datang, Admin</h2>
    </div>
  );
};

export default Header;
