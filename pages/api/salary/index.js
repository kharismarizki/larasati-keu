import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.role === "admin") {
    const salary = await prisma.salary.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });
    return res.json(salary);
  }
  if (req.method === "GET" && req.query.role === "penyiar") {
    const salary = await prisma.salary.findMany({
      where: { idUser: parseInt(req.query.idUser) },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });
    return res.json(salary);
  }
  if (req.method === "POST" && req.query.role === "admin") {
    const { note, total, date, idUser } = req.body;
    if (!note | !total | !date | !idUser)
      return res.status(400).json({ msg: "Masukan semua data!" });
    const salary = await prisma.salary.create({
      data: {
        note,
        total: parseInt(total),
        date: new Date(date),
        idUser: parseInt(idUser),
      },
    });
    return res
      .status(201)
      .json({ msg: "Data berhasil dimasukan", data: salary });
  }

  return res.status(400).json({ msg: "Bad request / Method tidak diijinkan" });
}
