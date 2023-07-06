import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const outc = await prisma.outcome.findUnique({ where: { id } });
    return res.status(200).json(outc);
  }
  if (req.method === "PUT") {
    const { name, note, total, date } = req.body;
    const outc = await prisma.outcome.update({
      where: { id },
      data: {
        name,
        note,
        total: parseInt(total),
        date: new Date(date),
      },
    });
    return res.status(201).json({ msg: "Data berhasil diupdate", data: outc });
  }
  if (req.method === "DELETE") {
    const outc = await prisma.outcome.delete({ where: { id } });
    return res.status(200).json({ msg: "Data berhasil dihapus", data: outc });
  }
  return res.status(400).json({ msg: "Bad Request / Method tidak diijinkan" });
}
