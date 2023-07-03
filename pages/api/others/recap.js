import prisma from "@/libs/prisma";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.role === "admin") {
      const cust = await prisma.customer.findMany({
        select: {
          total: true,
          createdAt: true,
        },
      });
      let incomeMonth = 0;
      let incomeDay = 0;
      let custMonth = cust.filter(
        (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
      ).length;
      cust
        .filter(
          (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
        )
        .map((v) => (incomeMonth += v.total));
      cust
        .filter(
          (v) => moment(v.createdAt).get("D") === moment(new Date()).get("D")
        )
        .map((v) => (incomeDay += v.total));

      return res.json({ incomeMonth, custMonth, incomeDay });
    }
    const cust = await prisma.customer.findMany({
      where: {
        idUser: parseInt(req.query.id),
      },
    });

    let incomeMonth = 0;
    let incomeDay = 0;
    let custMonth = cust.filter(
      (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
    ).length;
    cust
      .filter(
        (v) => moment(v.createdAt).get("M") === moment(new Date()).get("M")
      )
      .map((v) => (incomeMonth += v.total));
    cust
      .filter(
        (v) => moment(v.createdAt).get("D") === moment(new Date()).get("D")
      )
      .map((v) => (incomeDay += v.total));

    return res.json({ incomeMonth, custMonth, incomeDay });
  }
  return res
    .status(400)
    .json({ msg: "Bad request / Method tidak diijinkan" })
    .end();
}
