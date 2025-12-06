"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStats } from "./actions";

// Custom SVG Line Chart Component
const SimpleLineChart = ({ data, color = "#84bd93" }: { data: number[], color?: string }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const height = 60;
  const width = 120;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d={`M ${points}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1, duration: 0.5 }}
        d={`M ${points} L ${width},${height} L 0,${height} Z`}
        fill={color}
        stroke="none"
      />
    </svg>
  );
};

// Custom SVG Area Chart for Main Dashboard
const MainAreaChart = () => {
  const data = [30, 45, 35, 55, 45, 70, 60, 80, 75, 90, 85, 100];
  const height = 300;
  const width = 800;
  const max = Math.max(...data);

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / max) * (height * 0.8); // Leave some top padding
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full h-[350px] relative">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="0"
            y1={height - (i * (height / 4))}
            x2={width}
            y2={height - (i * (height / 4))}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="4 4"
          />
        ))}

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d={`M ${points}`}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          d={`M ${points} L ${width},${height} L 0,${height} Z`}
          fill="url(#gradient)"
          stroke="none"
        />

        {/* Data Points */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - (val / max) * (height * 0.8);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--color-background)"
              stroke="var(--color-primary)"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + (i * 0.1) }}
            />
          );
        })}
      </svg>

      {/* X-Axis Labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground translate-y-6">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getDashboardStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Revenue",
      value: data ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.totalRevenue) : "$0.00",
      change: "+20.1%", // Placeholder calculation
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10",
      chartData: data?.revenueTrend || [40, 35, 55, 45, 70, 65, 80]
    },
    {
      title: "Active Users",
      value: data ? data.totalUsers.toLocaleString() : "0",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      chartData: [20, 40, 30, 70, 50, 90, 100]
    },
    {
      title: "Total Orders",
      value: data ? data.totalOrders.toLocaleString() : "0",
      change: "+19%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      chartData: [30, 20, 50, 40, 60, 50, 70]
    },
    {
      title: "Active Now",
      value: "573", // Placeholder
      change: "-5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
      chartData: [60, 50, 40, 50, 40, 30, 20]
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px] rounded-xl" />
          <Skeleton className="col-span-3 h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Overview of your store's performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="glass border-white/20">Download Report</Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="glass-card border-none overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon size={24} />
                  </div>
                  <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                </div>
                <div className="h-16 mt-4 -mx-2">
                  <SimpleLineChart data={stat.chartData} color={stat.trend === 'up' ? '#84bd93' : '#ef4444'} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={item} className="col-span-4">
          <Card className="glass-card border-none h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Revenue Overview</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Monthly revenue performance</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent className="pl-2">
              <MainAreaChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="col-span-3">
          <Card className="glass-card border-none h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Latest transactions from users.</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data?.recentOrders.map((order: any, i: number) => (
                  <div key={i} className="flex items-center group p-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-105 transition-transform">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${order.customer?.username || i}`} alt={order.customer?.full_name} />
                      <AvatarFallback>{order.customer?.full_name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{order.customer?.full_name || "Unknown User"}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer?.email || "No email"}
                      </p>
                    </div>
                    <div className="ml-auto font-bold text-sm">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total_price)}
                    </div>
                  </div>
                ))}
                {(!data?.recentOrders || data.recentOrders.length === 0) && (
                  <div className="text-center text-muted-foreground py-8">
                    No recent orders found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
