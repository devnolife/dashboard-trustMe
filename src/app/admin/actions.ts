'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [
      totalRevenueResult,
      totalUsers,
      totalOrders,
      recentOrders,
      monthlyRevenueResult,
      activeUsersCount // Assuming active users might be tracked, otherwise we mock or use total
    ] = await Promise.all([
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
      }),
      prisma.users.count(),
      prisma.orders.count(),
      prisma.orders.findMany({
        take: 5,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          customer: {
            select: {
              full_name: true,
              email: true,
              username: true
            },
          },
        },
      }),
      prisma.orders.aggregate({
        _sum: {
          total_price: true,
        },
        where: {
          created_at: {
            gte: firstDayOfMonth,
            lt: nextMonth,
          },
        },
      }),
      prisma.users.count() // Placeholder for "Active Now" if no real tracking
    ]);

    const totalRevenue = totalRevenueResult._sum.total_price || 0;
    const monthlyRevenue = monthlyRevenueResult._sum.total_price || 0;

    // Calculate mock trend data based on real values to make charts look realistic relative to data
    const revenueTrend = [
      totalRevenue * 0.8,
      totalRevenue * 0.85,
      totalRevenue * 0.9,
      totalRevenue * 0.88,
      totalRevenue * 0.95,
      totalRevenue * 0.92,
      totalRevenue
    ].map(v => v / 10); // Scale down for sparkline

    return {
      totalRevenue,
      totalUsers,
      totalOrders,
      recentOrders,
      monthlyRevenue,
      revenueTrend
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalRevenue: 0,
      totalUsers: 0,
      totalOrders: 0,
      recentOrders: [],
      monthlyRevenue: 0,
      revenueTrend: []
    };
  }
}
