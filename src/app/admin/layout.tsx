"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Store,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Stores", icon: Store, href: "/admin/stores" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : 80,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="glass border-r border-white/20 dark:border-white/10 flex flex-col fixed h-full z-30 shadow-2xl"
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-3 font-bold text-xl text-primary overflow-hidden whitespace-nowrap">
            <div className="min-w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white shadow-lg shadow-primary/20">
              TM
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  TrustMe
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {isSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-primary/10 text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {!isSidebarOpen && (
            <div className="flex justify-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="h-8 w-8 rounded-full hover:bg-primary/10 text-muted-foreground"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          )}

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.name} className="block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-12",
              !isSidebarOpen && "justify-center px-0"
            )}
          >
            <LogOut className={cn("h-5 w-5", isSidebarOpen && "mr-2")} />
            {isSidebarOpen && "Logout"}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        animate={{
          marginLeft: isSidebarOpen ? 280 : 80,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
        className="flex-1 flex flex-col min-h-screen z-10"
      >
        {/* Top Navbar */}
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-20 glass border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative w-96 group">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search anything..."
                className="pl-10 bg-white/50 dark:bg-black/20 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-black/40 transition-all rounded-xl h-10 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ring-2 ring-transparent hover:ring-primary/20 transition-all">
                  <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@shadcn" />
                    <AvatarFallback>ZH</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Jason Hughes</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      zoey@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary">
                  My Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </motion.div>
    </div>
  );
}
