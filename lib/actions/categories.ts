"use server";

import { prisma } from "../prisma";

export async function getHomeCategories(take: number = 6) {
  const categories = await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take,
  });

  return categories;
}

