'use server'

import { prisma } from '@/lib/prisma'

export async function getUsers() {
    try {
        const users = await prisma.users.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                _count: {
                    select: {
                        stores: true,
                        orders: true
                    }
                }
            }
        });
        return { success: true, data: users };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { success: false, error: 'Failed to fetch users' };
    }
}
