'use server'

import { prisma } from '@/lib/prisma'

export async function getStores() {
    try {
        const stores = await prisma.stores.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                merchant: {
                    select: {
                        full_name: true,
                        username: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        menus: true
                    }
                }
            }
        });
        return { success: true, data: stores };
    } catch (error) {
        console.error('Error fetching stores:', error);
        return { success: false, error: 'Failed to fetch stores' };
    }
}
