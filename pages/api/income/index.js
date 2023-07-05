import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.role === "admin") {
    const inc = await prisma.income.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });
    return res.json(inc);
  }
  if (req.method === "POST" && req.query.role === "admin") {
    const { name, note, total, date, idUser } = req.body;
    const inc = await prisma.income.create({
      data: {
        name,
        note,
        total: parseInt(total),
        date: new Date(date),
        idUser,
      },
    });
    return res.status(201).json({ msg: "Data berhasil dimasukan", data: inc });
  }

  return res
    .status(400)
    .json({ msg: "Bad request / Method tidak diijinkan" })
    .end();
}
