import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  const { name, quantity, total } = req.body;
  if (req.method === "GET") {
    const cust = await prisma.customer.findMany();
    return res.json(cust);
  }
  if (req.method === "POST") {
    const cust = await prisma.customer.create({
      data: {
        name,
        quantity,
        total,
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
