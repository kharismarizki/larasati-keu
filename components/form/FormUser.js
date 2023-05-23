import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function FormUser({ data }) {
  const [fields, setFields] = useState({
    name: !data ? "" : data.name,
    username: !data ? "" : data.username,
    password: !data ? "" : data.password,
    role: !data ? "" : data.role,
  });

  function fieldHandler(e) {
    e.preventDefault(e);
    const name = e.target.getAttribute("name");
    setFields({ ...fields, [name]: e.target.value });
  }
  async function submitHandler(e) {
    e.preventDefault();
    await axios
      .post("/api/users", fields)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => Router.push("/users"), 3000);
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
    await axios
      .put("/api/users/" + data.id, fields)
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => Router.push("/users"), 3000);
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
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
            defaultValue={data && data.username}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
            defaultValue={data && data.password}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="underline_select" className="sr-only">
            Underline select
          </label>
          <select
            defaultValue={!data ? "default" : data.role}
            name="role"
            onChange={fieldHandler.bind(this)}
            id="underline_select"
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option disabled value="default">
              Pilih Role
            </option>
            <option value="admin">Admin</option>
            <option value="penyiar">Penyiar</option>
          </select>
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
