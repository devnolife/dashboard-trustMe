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
        _count: {
          select: { order_items: true }
        }
      }
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: 'Failed to fetch orders' };
  }
}

export async function getOrderDetail(orderId: string) {
  try {
    const order = await prisma.orders.findUnique({
      where: { order_id: orderId },
      include: {
        customer: {
          select: {
            user_id: true,
            full_name: true,
            username: true,
            email: true,
            phone: true
          }
        },
        store: {
          select: {
            store_id: true,
            store_name: true,
            phone: true,
            address: true,
            city: true
          }
        },
        order_items: true
      }
    });

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error('Error fetching order detail:', error);
    return { success: false, error: 'Failed to fetch order detail' };
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.orders.update({
      where: { order_id: orderId },
      data: { order_status: status }
    });
    return { success: true, data: order };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: 'Failed to update order status' };
  }
}

export async function updatePaymentStatus(orderId: string, status: string) {
  try {
    const order = await prisma.orders.update({
      where: { order_id: orderId },
      data: { payment_status: status }
    });
    return { success: true, data: order };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return { success: false, error: 'Failed to update payment status' };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await prisma.orders.delete({
      where: { order_id: orderId }
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: 'Failed to delete order' };
  }
}

export async function getOrderStats() {
  try {
    const totalOrders = await prisma.orders.count();
    const pendingOrders = await prisma.orders.count({
      where: { order_status: 'pending' }
    });
    const completedOrders = await prisma.orders.count({
      where: { order_status: 'completed' }
    });
    const cancelledOrders = await prisma.orders.count({
      where: { order_status: 'cancelled' }
    });

    // Calculate total revenue
    const revenueResult = await prisma.orders.aggregate({
      _sum: { total_price: true },
      where: { order_status: 'completed' }
    });

    return {
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue: revenueResult._sum.total_price || 0
      }
    };
  } catch (error) {
    console.error('Error fetching order stats:', error);
    return { success: false, error: 'Failed to fetch order stats' };
  }
}
