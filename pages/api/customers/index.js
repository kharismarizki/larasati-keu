import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.query.role === "admin") {
      const cust = await prisma.customer.findMany({
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });
      return res.json(cust);
    }
    const cust = await prisma.customer.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      where: {
        idUser: parseInt(req.query.id),
      },
    });
    return res.json(cust);
  }
  if (req.method === "POST") {
    const { name, quantity, total, idUser } = req.body;
    const cust = await prisma.customer.create({
      data: {
        name,
        quantity: parseInt(quantity),
        total: parseInt(total),
        idUser,
        createdAt: new Date(),
      },
    });
    return res.status(201).json({ msg: "Data berhasil dimasukan", data: cust });
  }

  return res
    .status(400)
    .json({ msg: "Bad request / Method tidak diijinkan" })
    .end();
}
