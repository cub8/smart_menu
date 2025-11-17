import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

/*
  Dodana realna walidacja uzytkownika
 */

export async function validateUser(email: string, password: string) {

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;


  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
