import prisma from "@/libs/prisma";
import { elements } from "chart.js";
import moment from "moment";
export default async function handler(req, res) {
  if (req.method === "GET") {
    var date = new Date(),
      y = date.getFullYear();

    var firstYear = new Date(y, 0, 1);
    var lastYear = new Date(y, 12, 0);

    const cust =
      await prisma.$queryRaw`SELECT DATE_FORMAT(createdAt, "%M") as bulan, SUM(total) as total FROM customer WHERE createdAt >= ${firstYear} AND createdAt <= ${lastYear} GROUP BY 1 ORDER BY createdAt`;

    //get all bulan
    let bln = Array.apply(0, Array(12)).map(function (_, i) {
      return moment().month(i).format("MMMM");
    });

    let data = [];
    //return data chart

    bln.forEach((element) => {
      let hasil = cust.filter((v) => v.bulan == element);
      data.push({
        bulan: element,
        total: hasil[0]?.total ? hasil[0]?.total : 0,
      });
    });
    return res.status(200).json({
      data: data,
      message: "berhasil Mendapatkan data",
    });
  }
  return res.status(400).json({ msg: "Bad request / Method tidak diijinkan" });
}
