"use server";

import { prisma } from "../prisma";

export async function getHeroSlides() {
  const slides = await prisma.sliderContent.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return slides;
}

