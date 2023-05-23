import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { id } });
    return res.status(200).json(user);
  }
  if (req.method === "PUT") {
    const { name, username, password, role } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { name, username, password, role },
    });
    return res.status(200).json({ msg: "Data berhasil diupdate", data: user });
  }
  if (req.method === "DELETE") {
    const user = await prisma.user.delete({ where: { id } });
    return res.status(200).json({ msg: "User berhasil dihapus", data: user });
  }
  return res.status(400).json({ msg: "Bad Request / Method tidak diijinkan" });
}
