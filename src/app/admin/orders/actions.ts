'use server'

import { prisma } from '@/lib/prisma'

export async function getOrders() {
    try {
        const orders = await prisma.orders.findMany({
            orderBy: {
                created_at: 'desc'
            },
            include: {
                customer: {
                    select: {
                        full_name: true,
                        username: true
                    }
                },
                store: {
                    select: {
                        store_name: true
                    }
                },
                order_items: true
            }
        });

        // We need to fetch store names separately or include them if relation existed directly, 
        // but orders has store_id. Let's fetch store names for better display.
        // Actually, let's just fetch them all and map them in client or here.
        // Optimization: In a real app, we'd use a relation in schema for orders -> stores.
        // Looking at schema: orders has store_id, but no relation defined to stores model in the provided schema snippet?
        // Wait, let me check schema again.

        return { success: true, data: orders };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: 'Failed to fetch orders' };
    }
}
