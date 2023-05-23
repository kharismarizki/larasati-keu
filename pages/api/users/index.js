import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const user = await prisma.user.findMany();
    return res.json(user);
  }
  if (req.method === "POST") {
    const { name, username, password, role } = req.body;
    if (!name | !username | !password | !role)
      return res.status(400).json({ msg: "Masukan semua data!" });
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password,
        role,
      },
    });
    return res
      .status(201)
      .json({ msg: "Data user berhasil dibuat", data: user });
  }
  return res.status(400).json({ msg: "Bad Request / method tidak diijinkan" });
}
