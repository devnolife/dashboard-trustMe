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

export async function updateUserStatus(userId: string, isActive: boolean) {
  try {
    const user = await prisma.users.update({
      where: { user_id: userId },
      data: {
        user_type: isActive ? 'active' : 'inactive'
      }
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user status:', error);
    return { success: false, error: 'Failed to update user status' };
  }
}

export async function verifyUser(userId: string) {
  try {
    const user = await prisma.users.update({
      where: { user_id: userId },
      data: {
        user_type: 'verified'
      }
    });
    return { success: true, data: user };
  } catch (error) {
    console.error('Error verifying user:', error);
    return { success: false, error: 'Failed to verify user' };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.users.delete({
      where: { user_id: userId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function getUserStats() {
  try {
    const totalUsers = await prisma.users.count();
    const customers = await prisma.users.count({
      where: { user_type: { not: 'merchant' } }
    });
    const merchants = await prisma.users.count({
      where: { user_type: 'merchant' }
    });
    const verifiedUsers = await prisma.users.count({
      where: { user_type: 'verified' }
    });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await prisma.users.count({
      where: {
        created_at: { gte: sevenDaysAgo }
      }
    });

    return {
      success: true,
      data: {
        totalUsers,
        customers,
        merchants,
        verifiedUsers,
        recentUsers
      }
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return { success: false, error: 'Failed to fetch user stats' };
  }
}

export async function getUserDetail(userId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: userId },
      include: {
        stores: {
          select: {
            store_id: true,
            store_name: true,
            category: true,
            city: true,
            is_active: true,
            _count: {
              select: {
                menus: true,
                orders: true
              }
            }
          }
        },
        orders: {
          orderBy: { created_at: 'desc' },
          take: 20,
          select: {
            order_id: true,
            total_price: true,
            order_status: true,
            created_at: true,
            store: {
              select: { store_name: true }
            }
          }
        }
      }
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('Error fetching user detail:', error);
    return { success: false, error: 'Failed to fetch user detail' };
  }
}
