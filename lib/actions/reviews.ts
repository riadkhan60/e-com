"use server";

import { prisma } from "../prisma";

export async function getShowcaseReviews(take: number = 10) {
  const reviews = await prisma.review.findMany({
    where: {
      isShowcase: true,
      isApproved: true,
    },
    orderBy: [
      {
        screnShotReviewImage: { sort: "desc", nulls: "last" },
      },
      {
        createdAt: "desc",
      },
    ],
    take,
  });

  return reviews;
}

