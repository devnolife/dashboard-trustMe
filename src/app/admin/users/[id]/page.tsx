'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getUserDetail } from '../actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft, Mail, Phone, Calendar, Store, ShoppingBag,
  User, Shield, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { LoadingPage } from "@/components/ui/loading";

interface UserDetail {
  id: number;
  user_id: string;
  username: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  user_type: string | null;
  created_at: string;
  stores: Array<{
    store_id: string;
    store_name: string;
    category: string | null;
    city: string | null;
    is_active: boolean | null;
    _count: { menus: number; orders: number };
  }>;
  orders: Array<{
    order_id: string;
    total_price: number | null;
    order_status: string | null;
    created_at: string;
    store: { store_name: string } | null;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserDetail(params.id as string);
      if (result.success && result.data) {
        setUser(result.data);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [params.id]);

  const getStatusBadge = (userType: string | null) => {
    switch (userType) {
      case 'merchant':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Merchant</Badge>;
      case 'verified':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Inactive</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
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
      default:
        return <Badge variant="secondary">{status || 'Unknown'}</Badge>;
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading user details..." />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-muted-foreground">User not found</p>
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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">View complete user information</p>
        </div>
      </div>

      {/* User Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold">{user.full_name || user.username}</h2>
                  {getStatusBadge(user.user_type)}
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Username:</span>
                    <span className="font-medium">@{user.username}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{user.phone || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="font-medium">
                      {new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Stores</CardTitle>
              <Store className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.stores.length}</div>
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
              <ShoppingBag className="w-5 h-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user.orders.length}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Stores List */}
      {user.stores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Owned Stores
              </CardTitle>
              <CardDescription>Stores owned by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Menus</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.stores.map((store) => (
                    <TableRow key={store.store_id}>
                      <TableCell className="font-medium">{store.store_name}</TableCell>
                      <TableCell>{store.category || '-'}</TableCell>
                      <TableCell>{store.city || '-'}</TableCell>
                      <TableCell>{store._count.menus}</TableCell>
                      <TableCell>{store._count.orders}</TableCell>
                      <TableCell>
                        <Badge variant={store.is_active ? 'default' : 'destructive'}>
                          {store.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/admin/stores/${store.store_id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Orders List */}
      {user.orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg bg-white/50 dark:bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order History
              </CardTitle>
              <CardDescription>Recent orders from this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.orders.slice(0, 10).map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell className="font-medium">#{order.order_id.slice(-8)}</TableCell>
                      <TableCell>{order.store?.store_name || '-'}</TableCell>
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
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
