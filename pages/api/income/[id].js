import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const inc = await prisma.income.findUnique({ where: { id } });
    return res.status(200).json(inc);
  }
  if (req.method === "PUT") {
    const { name, note, total, date } = req.body;
    const inc = await prisma.income.update({
      where: { id },
      data: {
        name,
        note,
        total: parseInt(total),
        date: new Date(date),
      },
    });
    return res.status(201).json({ msg: "Data berhasil diupdate", data: inc });
  }
  if (req.method === "DELETE") {
    const inc = await prisma.income.delete({ where: { id } });
    return res.status(200).json({ msg: "Data berhasil dihapus", data: inc });
  }
  return res.status(400).json({ msg: "Bad Request / Method tidak diijinkan" });
}
