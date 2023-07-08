import prisma from "@/libs/prisma";
import { elements } from "chart.js";
import moment from "moment";
export default async function handler(req, res) {
  if (req.method === "GET") {
    // if (req.query.role === "admin") {
    //   const cust = await prisma.customer.findMany({
    //     select: {
    //       total: true,
    //       createdAt: true,
    //     },
    //   });
    //   let incomeMonth = 0;
    //   let incomeDay = 0;
    //   let custMonth = cust.filter(
    //     (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
    //   ).length;
    //   cust
    //     .filter(
    //       (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
    //     )
    //     .map((v) => (incomeMonth += v.total));
    //   cust
    //     .filter(
    //       (v) => moment(v.createdAt).get("D") === moment(new Date()).get("D")
    //     )
    //     .map((v) => (incomeDay += v.total));

    //   return res.json({ incomeMonth, custMonth, incomeDay });
    // }

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
      for (let i = 0; i < cust.length; i++) {
        data.push({
          bulan: element,
          total: cust[i].bulan == element ? cust[i].total : 0,
        });
      }
    });

    return res.status(200).json({
      data: data,
      message: "berhasil Mendapatkan data",
    });

    // let incomeMonth = 0;
    // let incomeDay = 0;
    // let custMonth = cust.filter(
    //   (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
    // ).length;
    // cust
    //   .filter(
    //     (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
    //   )
    //   .map((v) => (incomeMonth += v.total));
    // cust
    //   .filter(
    //     (v) => moment(v.createdAt).get("D") === moment(new Date()).get("D")
    //   )
    //   .map((v) => (incomeDay += v.total));

    // return res.json({ incomeMonth, custMonth, incomeDay });
  }
  return res.status(400).json({ msg: "Bad request / Method tidak diijinkan" });
}
