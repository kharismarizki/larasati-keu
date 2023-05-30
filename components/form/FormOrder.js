import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import Router from "next/router";

export default function FormOrder({ data }) {
  const [fields, setFields] = useState({
    name: !data ? "" : data.name,
    quantity: !data ? "" : data.quantity,
    total: !data ? "" : data.total,
  });

  function fieldHandler(e) {
    e.preventDefault(e);
    const name = e.target.getAttribute("name");
    setFields({ ...fields, [name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const { user } = await getSession();
    const reqData = { ...fields, idUser: user.id };
    await axios
      .post("/api/customers", reqData, {
        headers: { Authorization: "Bearer " + user.accessToken },
      })
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => Router.push("/orders"), 3000);
      })
      .catch((err) =>
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        })
      );
  }
  async function updateHandler(e) {
    e.preventDefault();
    const { user } = await getSession();
    const reqData = { ...fields, idUser: user.id };
    await axios
      .put("/api/customers/" + data.id, reqData)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => Router.push("/orders"), 3000);
      })
      .catch((err) =>
        toast.error(err.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        })
      );
  }
  return (
    <>
      <form
        onSubmit={!data ? submitHandler.bind(this) : updateHandler.bind(this)}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
            defaultValue={data && data.name}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nama
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="quantity"
            id="quantity"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
            defaultValue={data && data.quantity}
          />
          <label
            htmlFor="quantity"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Jumlah Paket
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="total"
            id="total"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
            defaultValue={data && data.total}
          />
          <label
            htmlFor="total"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Harga
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}
