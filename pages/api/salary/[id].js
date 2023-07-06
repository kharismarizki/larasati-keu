import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const sal = await prisma.salary.findUnique({ where: { id } });
    return res.status(200).json(sal);
  }
  if (req.method === "PUT") {
    const { note, total, date, idUser } = req.body;
    const sal = await prisma.salary.update({
      where: { id },
      data: {
        note,
        total: parseInt(total),
        date: new Date(date),
      },
    });
    return res.status(201).json({ msg: "Data berhasil diupdate", data: sal });
  }
  if (req.method === "DELETE") {
    const sal = await prisma.salary.delete({ where: { id } });
    return res.status(200).json({ msg: "Data berhasil dihapus", data: sal });
  }
  return res.status(400).json({ msg: "Bad Request / Method tidak diijinkan" });
}
