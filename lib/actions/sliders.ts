'use server';

import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';

export async function getSliders() {
  try {
    const sliders = await prisma.sliderContent.findMany({
      orderBy: { order: 'asc' },
    });
    return { success: true, data: sliders };
  } catch (error) {
    console.error('Error fetching sliders:', error);
    return { success: false, error: 'Failed to fetch sliders' };
  }
}

export async function getHeroSlides() {
  const slides = await prisma.sliderContent.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return slides;
}

export async function createSlider(data: {
  title?: string;
  description?: string;
  image: string;
  phoneImage?: string;
  link?: string;
  buttonText?: string;
  isActive?: boolean;
  order?: number;
}) {
  try {
    const slider = await prisma.sliderContent.create({
      data: {
        ...data,
        isActive: data.isActive ?? true,
      },
    });

    revalidatePath('/admin/sliders');
    revalidatePath('/');
    return { success: true, data: slider };
  } catch (error) {
    console.error('Error creating slider:', error);
    return { success: false, error: 'Failed to create slider' };
  }
}

export async function updateSlider(
  id: string,
  data: {
    title?: string;
    description?: string;
    image?: string;
    phoneImage?: string;
    link?: string;
    buttonText?: string;
    isActive?: boolean;
    order?: number;
  },
) {
  try {
    const slider = await prisma.sliderContent.update({
      where: { id },
      data,
    });

    revalidatePath('/admin/sliders');
    revalidatePath('/');
    return { success: true, data: slider };
  } catch (error) {
    console.error('Error updating slider:', error);
    return { success: false, error: 'Failed to update slider' };
  }
}

export async function deleteSlider(id: string) {
  try {
    await prisma.sliderContent.delete({
      where: { id },
    });

    revalidatePath('/admin/sliders');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting slider:', error);
    return { success: false, error: 'Failed to delete slider' };
  }
}
