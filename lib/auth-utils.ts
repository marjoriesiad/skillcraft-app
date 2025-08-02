import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createUser(email: string, password: string, name?: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
    }
  })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}