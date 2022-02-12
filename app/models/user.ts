import { z } from 'zod';
import { prisma } from '~/util/db.server';

export const Schema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});
export type Schema = z.infer<typeof Schema>;

export async function findOrCreateByEmail(email: string): Promise<Schema> {
  try {
    return await prisma.user.create({
      data: { email },
      select: { id: true, email: true },
    });
  } catch (e) {
    return prisma.user.findUnique({
      rejectOnNotFound: true,
      where: { email },
      select: { id: true, email: true },
    });
  }
}
