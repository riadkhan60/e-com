'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Get settings, create default if doesn't exist
export async function getSettings() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 'default' },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'default',
          insideDhakaShipping: 70,
          outsideDhakaShipping: 180,
        },
      });
    }

    return {
      success: true,
      data: {
        insideDhakaShipping: Number(settings.insideDhakaShipping),
        outsideDhakaShipping: Number(settings.outsideDhakaShipping),
      },
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      success: false,
      error: 'Failed to fetch settings',
      data: {
        insideDhakaShipping: 70,
        outsideDhakaShipping: 180,
      },
    };
  }
}

// Admin: Update shipping charges
export async function updateShippingCharges(
  insideDhaka: number,
  outsideDhaka: number,
) {
  try {
    await prisma.settings.upsert({
      where: { id: 'default' },
      update: {
        insideDhakaShipping: insideDhaka,
        outsideDhakaShipping: outsideDhaka,
      },
      create: {
        id: 'default',
        insideDhakaShipping: insideDhaka,
        outsideDhakaShipping: outsideDhaka,
      },
    });

    revalidatePath('/checkout');
    return { success: true };
  } catch (error) {
    console.error('Error updating shipping charges:', error);
    return { success: false, error: 'Failed to update shipping charges' };
  }
}
