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

    // Convert Decimal objects to plain numbers for client components
    const serializedStores = stores.map(store => ({
      ...store,
      latitude: store.latitude ? Number(store.latitude) : null,
      longitude: store.longitude ? Number(store.longitude) : null,
    }));

    return { success: true, data: serializedStores };
  } catch (error) {
    console.error('Error fetching stores:', error);
    return { success: false, error: 'Failed to fetch stores' };
  }
}

export async function getStoreDetail(storeId: string) {
  try {
    const store = await prisma.stores.findUnique({
      where: { store_id: storeId },
      include: {
        merchant: {
          select: {
            user_id: true,
            full_name: true,
            username: true,
            email: true,
            phone: true
          }
        },
        menus: {
          orderBy: { created_at: 'desc' },
          select: {
            menu_id: true,
            menu_name: true,
            description: true,
            price: true,
            category: true,
            is_available: true,
            image_url: true
          }
        },
        orders: {
          orderBy: { created_at: 'desc' },
          take: 20,
          select: {
            order_id: true,
            total_price: true,
            order_status: true,
            payment_status: true,
            created_at: true,
            customer: {
              select: {
                full_name: true,
                username: true
              }
            },
            _count: {
              select: { order_items: true }
            }
          }
        }
      }
    });

    if (!store) {
      return { success: false, error: 'Store not found' };
    }

    // Convert Decimal to number
    const serializedStore = {
      ...store,
      latitude: store.latitude ? Number(store.latitude) : null,
      longitude: store.longitude ? Number(store.longitude) : null,
    };

    return { success: true, data: serializedStore };
  } catch (error) {
    console.error('Error fetching store detail:', error);
    return { success: false, error: 'Failed to fetch store detail' };
  }
}

export async function updateStoreStatus(storeId: string, isActive: boolean) {
  try {
    const store = await prisma.stores.update({
      where: { store_id: storeId },
      data: { is_active: isActive }
    });
    return { success: true, data: store };
  } catch (error) {
    console.error('Error updating store status:', error);
    return { success: false, error: 'Failed to update store status' };
  }
}

export async function deleteStore(storeId: string) {
  try {
    await prisma.stores.delete({
      where: { store_id: storeId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting store:', error);
    return { success: false, error: 'Failed to delete store' };
  }
}
