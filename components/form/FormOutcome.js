import moment from "moment/moment";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormOutcome() {
  const [fields, setFields] = useState({
    note: "",
    total: "",
    date: moment(new Date()).format("yyyy-MM"),
  });

  function fieldHandler(e) {
    e.preventDefault(e);
    const name = e.target.getAttribute("name");
    setFields({ ...fields, [name]: e.target.value });
  }
  async function submitHandler(e) {
    e.preventDefault();
    console.log(fields);
    const { user } = await getSession();
    const reqData = { ...fields, idUser: user.id, name: user.username };
    await axios
      .post("/api/outcome", reqData, { params: { role: user.role } })
      .then((res) => {
        toast.success(res.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
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
      <h1 className="font-medium text-gray-900 mb-2">Form Pengeluaran</h1>
      <form onSubmit={submitHandler.bind(this)}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="note"
            id="note"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            onChange={fieldHandler.bind(this)}
          />
          <label
            htmlFor="note"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Keterangan
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
          />
          <label
            htmlFor="total"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Total
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="month"
            name="date"
            id="date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer"
            placeholder=" "
            required
            value={fields.date}
            onChange={fieldHandler.bind(this)}
          />
          <label
            htmlFor="date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-600 peer-focus:dark:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bulan
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
