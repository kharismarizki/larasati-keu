import React from "react";

const TopCards = ({ data }) => {
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      // currency: "IDR",
    }).format(number);
  };
  return (
    <div className="grid lg:grid-cols-5 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">Rp. {rupiah(data.incomeDay)}</p>
          <p className="text-gray-600">Pendapatan Hari Ini</p>
        </div>
        {/* <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+2%</span>
        </p> */}
      </div>
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">Rp. {rupiah(data.incomeMonth)}</p>
          <p className="text-gray-600">Pendapatan Bulan ini</p>
        </div>
        {/* <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+1%</span>
        </p> */}
      </div>
      <div className="bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{data.custMonth}</p>
          <p className="text-gray-600">Pelanggan Bulan ini</p>
        </div>
        {/* <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+4%</span>
        </p> */}
      </div>
    </div>
  );
};

export default TopCards;
