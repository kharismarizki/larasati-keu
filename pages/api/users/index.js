import prisma from "@/libs/prisma";
import argon2 from "argon2";
import jwt, { decode } from "jsonwebtoken";

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).end();

  const authSplit = authorization.split(" ");
  const [authType, authToken] = [authSplit[0], authSplit[1]];
  if (authType !== "Bearer") return res.status(401).end();
  const verifyToken = jwt.verify(authToken, process.env.NEXTAUTH_SECRET);
  if (!verifyToken) return res.status(401).end();
  if (req.method === "GET") {
    const user = await prisma.user.findMany();
    return res.json(user);
  }

  if (req.method === "POST") {
    const { name, username, password, role } = req.body;
    if (!name | !username | !password | !role)
      return res.status(400).json({ msg: "Masukan semua data!" });
    const passwordHash = await argon2.hash(password);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
        role,
      },
    });
    return res
      .status(201)
      .json({ msg: "Data user berhasil dibuat", data: user });
  }
  return res.status(400).json({ msg: "Bad Request / method tidak diijinkan" });
}
