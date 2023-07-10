import prisma from "@/libs/prisma";

import moment from "moment";
import { toast } from "react-toastify";
export default async function handler(req, res) {
  if (req.method === "GET") {
    var date = new Date(),
      y = date.getFullYear();

    var firstYear = new Date(y, 0, 1);
    var lastYear = new Date(y, 12, 0);

    //get all bulan

    let data = [];
    let cust;
    if (req.query.role === "admin") {
      cust =
        await prisma.$queryRaw`SELECT DATE_FORMAT(createdAt, "%M") as bulan, SUM(total) as total FROM customer WHERE createdAt >= ${firstYear} AND createdAt <= ${lastYear} GROUP BY 1 ORDER BY createdAt`;
    } else {
      cust =
        await prisma.$queryRaw`SELECT DATE_FORMAT(createdAt, "%M") as bulan, SUM(total) as total FROM customer WHERE createdAt >= ${firstYear} AND createdAt <= ${lastYear} AND idUser = ${req.query.id} GROUP BY 1 ORDER BY createdAt`;
    }
    let bln = Array.apply(0, Array(12)).map(function (_, i) {
      return moment().month(i).format("MMMM");
    });
    //return data chart

    bln.forEach((element) => {
      let hasil = cust.filter((v) => (v.bulan == element ? v.total : 0));
      data.push({
        bulan: element,
        total: hasil[0]?.total ? hasil[0].total : 0,
      });
    });

    return res.status(200).json({
      data: data,
      message: "berhasil Mendapatkan data",
    });
  }
  return res.status(400).json({ msg: "Bad request / Method tidak diijinkan" });
}
