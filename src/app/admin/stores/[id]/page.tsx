'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStoreDetail, updateStoreStatus, deleteStore } from '../actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft, Mail, Phone, Calendar, MapPin, Clock,
  Store, ShoppingBag, UtensilsCrossed, User, Loader2,
  CheckCircle, XCircle, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingPage, LoadingSpinner } from "@/components/ui/loading";

interface StoreDetail {
  id: number;
  store_id: string;
  store_name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
  opening_time: string | null;
  closing_time: string | null;
  is_active: boolean | null;
  created_at: string;
  merchant: {
    user_id: string;
    full_name: string | null;
    username: string;
    email: string | null;
    phone: string | null;
  };
  menus: Array<{
    menu_id: string;
    menu_name: string;
    description: string | null;
    price: number;
    category: string | null;
    is_available: boolean | null;
    image_url: string | null;
  }>;
  orders: Array<{
    order_id: string;
    total_price: number | null;
    order_status: string | null;
    payment_status: string | null;
    created_at: string;
    customer: { full_name: string | null; username: string } | null;
    _count: { order_items: number };
  }>;
}

export default function StoreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [store, setStore] = useState<StoreDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchStore = async () => {
    const result = await getStoreDetail(params.id as string);
    if (result.success && result.data) {
      setStore(result.data as StoreDetail);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStore();
  }, [params.id]);

  const handleToggleStatus = async () => {
    if (!store) return;
    setActionLoading('status');
    const result = await updateStoreStatus(store.store_id, !store.is_active);
    if (result.success) {
      await fetchStore();
    }
    setActionLoading(null);
  };

  const handleDelete = async () => {
    if (!store) return;
    if (confirm('Are you sure you want to delete this store? This action cannot be undone.')) {
      setActionLoading('delete');
      const result = await deleteStore(store.store_id);
      if (result.success) {
        router.push('/admin/stores');
      }
      setActionLoading(null);
    }
  };

  const getOrderStatusBadge = (status: string | null) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-500">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/10 text-yellow-500">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/10 text-blue-500">Processing</Badge>;
      default:
        return <Badge variant="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading store details..." />;
  }

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">Store not found</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Store Details</h1>
            <p className="text-muted-foreground">View and manage store information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            disabled={actionLoading === 'status'}
          >
            {actionLoading === 'status' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : store.is_active ? (
              <XCircle className="w-4 h-4 mr-2 text-yellow-500" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            )}
            {store.is_active ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={actionLoading === 'delete'}
          >
            {actionLoading === 'delete' ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </div>

      {/* Store Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Store className="w-12 h-12 text-primary" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">{store.store_name}</h2>
                  <Badge variant={store.is_active ? 'default' : 'destructive'}>
                    {store.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                  {store.category && (
                    <Badge variant="outline">{store.category}</Badge>
                  )}
                </div>

                {store.description && (
                  <p className="text-muted-foreground">{store.description}</p>
                )}

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{store.city || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{store.phone || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Hours:</span>
                    <span className="font-medium">
                      {store.opening_time && store.closing_time
                        ? `${store.opening_time} - ${store.closing_time}`
                        : '-'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">
                      {new Date(store.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>

                {store.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{store.address}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats & Merchant Info */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Menus</CardTitle>
              <UtensilsCrossed className="w-5 h-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{store.menus.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{store.orders.length}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2"
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Merchant</CardTitle>
              <User className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${store.merchant.username}`} />
                  <AvatarFallback>{store.merchant.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{store.merchant.full_name || store.merchant.username}</p>
                  <p className="text-xs text-muted-foreground">{store.merchant.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => router.push(`/admin/users/${store.merchant.user_id}`)}
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Menus List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              Menu Items
            </CardTitle>
            <CardDescription>All menu items in this store</CardDescription>
          </CardHeader>
          <CardContent>
            {store.menus.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No menu items</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Menu Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {store.menus.map((menu) => (
                    <TableRow key={menu.menu_id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{menu.menu_name}</p>
                          {menu.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">{menu.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{menu.category || '-'}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        Rp {menu.price.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={menu.is_available ? 'default' : 'secondary'}>
                          {menu.is_available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest orders from this store</CardDescription>
          </CardHeader>
          <CardContent>
            {store.orders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No orders yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {store.orders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell className="font-medium">#{order.order_id.slice(-8)}</TableCell>
                      <TableCell>{order.customer?.full_name || order.customer?.username || 'Guest'}</TableCell>
                      <TableCell>{order._count.order_items} items</TableCell>
                      <TableCell>Rp {(order.total_price || 0).toLocaleString('id-ID')}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.order_status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/orders/${order.order_id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
