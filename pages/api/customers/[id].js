import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const id = parseInt(req.query.id);
  if (req.method === "GET") {
    const cust = await prisma.customer.findUnique({
      where: { id },
    });

    return res.status(200).json(cust);
  }
  if (req.method === "PUT") {
    const { name, quantity, total, idUser } = req.body;
    const cust = await prisma.customer.update({
      where: { id },
      data: {
        name,
        quantity: parseInt(quantity),
        total: parseInt(total),
        idUser,
      },
    });
    return res.status(200).json({ msg: "Data berhasil diupdate", data: cust });
  }
  if (req.method === "DELETE") {
    const cust = await prisma.customer.delete({
      where: { id },
    });
    return res
      .status(200)
      .json({ msg: "Data customer berhasil dihapus", data: cust });
  }
  return res
    .status(400)
    .json({ msg: "Bad request / Method tidak diijinkan" })
    .end();
}
