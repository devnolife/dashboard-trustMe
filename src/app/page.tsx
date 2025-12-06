"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Menu, X, ArrowRight, Star, Zap, Shield,
  Smartphone, Heart, Globe, ChevronRight,
  Download, Instagram, Twitter, Facebook,
  Moon, Sun, CheckCircle2, Play, Search,
  Bell, Home, User, Utensils, MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Phone Mockup Component for Hero Illustration
const PhoneMockup = () => (
  <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500 z-20 mx-auto lg:mx-0">
    <div className="absolute top-0 z-30 w-1/3 h-6 -translate-x-1/2 bg-gray-900 left-1/2 rounded-b-xl"></div>
    <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative flex flex-col">
      {/* App Header */}
      <div className="flex items-center justify-between p-4 pt-8 border-b bg-primary/5 border-border/50">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-primary/20 text-primary">TM</div>
          <div className="text-sm font-bold font-heading">TrustMe</div>
        </div>
        <Bell className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* App Content */}
      <div className="relative flex-1 p-4 space-y-4 overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center p-3 space-x-2 text-xs bg-muted/50 rounded-xl text-muted-foreground">
          <Search className="w-4 h-4" />
          <span>Mau makan apa hari ini?</span>
        </div>

        {/* Banner */}
        <div className="relative w-full h-32 p-4 overflow-hidden text-white bg-linear-to-br from-primary to-secondary rounded-xl group">
          <div className="absolute text-6xl transition-transform -right-4 -bottom-4 opacity-20 group-hover:scale-110">🍕</div>
          <div className="relative z-10 text-lg font-bold">Diskon 50%</div>
          <div className="relative z-10 text-xs opacity-90">Khusus pengguna baru!</div>
          <button className="mt-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold">Claim Now</button>
        </div>

        {/* Categories */}
        <div className="flex pb-2 space-x-3 overflow-x-auto no-scrollbar">
          {['🍔', '🍜', '🥗', '🥤', '🍰'].map((emoji, i) => (
            <div key={i} className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl transition-colors cursor-pointer bg-muted/50 rounded-xl hover:bg-primary/10">
              {emoji}
            </div>
          ))}
        </div>

        {/* Restaurant List */}
        <div className="space-y-3">
          {[
            { name: "Burger King", time: "15 min", rating: "4.8", color: "bg-orange-100" },
            { name: "Sushi Tei", time: "25 min", rating: "4.9", color: "bg-blue-100" },
            { name: "SaladStop!", time: "10 min", rating: "4.7", color: "bg-green-100" }
          ].map((item, i) => (
            <div key={i} className="flex items-center p-2 space-x-3 transition-colors border shadow-sm cursor-pointer rounded-xl bg-card border-border/50 hover:border-primary/30">
              <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center text-xl`}>
                {['🍔', '🍣', '🥗'][i]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold">{item.name}</div>
                <div className="text-[10px] text-muted-foreground flex items-center space-x-2">
                  <span>{item.time}</span>
                  <span>•</span>
                  <span className="flex items-center text-yellow-500"><Star className="w-3 h-3 fill-current mr-0.5" /> {item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-between p-4 border-t bg-background border-border/50 text-muted-foreground">
        <Home className="w-6 h-6 text-primary" />
        <Search className="w-6 h-6" />
        <div className="flex items-center justify-center w-10 h-10 -mt-8 text-white rounded-full shadow-lg bg-primary shadow-primary/30">
          <Utensils className="w-5 h-5" />
        </div>
        <MessageCircle className="w-6 h-6" />
        <User className="w-6 h-6" />
      </div>

      {/* Floating Notification */}
      <div className="absolute z-40 flex items-center p-3 space-x-3 duration-1000 delay-500 border shadow-lg bottom-20 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-xl border-primary/20 animate-in slide-in-from-bottom-10">
        <div className="flex items-center justify-center w-10 h-10 text-xl bg-green-100 rounded-full">🛵</div>
        <div>
          <div className="text-xs font-bold">Pesanan sedang diantar!</div>
          <div className="text-[10px] text-muted-foreground">Tiba dalam 12 menit</div>
        </div>
      </div>
    </div>
  </div>
)

// Floating Emojis Component
const FloatingEmojis = () => {
  const [items, setItems] = useState<{ top: string, left: string, delay: string, duration: string, emoji: string }[]>([])

  useEffect(() => {
    const emojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🍩']
    const newItems = emojis.map((emoji, i) => ({
      emoji,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 1.5}s`,
      duration: `${3 + Math.random() * 2}s`
    }))
    setItems(newItems)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-10 animate-float"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-sans bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      {/* 1. NAVIGATION BAR */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="container flex items-center justify-between h-20 px-6 mx-auto md:px-12 lg:px-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 transition-transform duration-300 rounded-full bg-primary group-hover:rotate-12">
              <span className="text-xl font-bold text-white font-heading">T</span>
            </div>
            <span className="text-2xl font-bold tracking-tight font-heading">TrustMe</span>
          </div>

          {/* Desktop Nav */}
          <nav className="items-center hidden space-x-8 text-sm font-medium md:flex">
            {['Fitur', 'Tentang', 'Download'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative transition-colors group hover:text-primary font-heading"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="items-center hidden space-x-4 md:flex">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 transition-colors rounded-full hover:bg-muted"
            >
              <div className="w-5 h-5 rounded-full bg-linear-to-tr from-primary to-secondary" />
            </button>
            <Link href="/login">
              <Button variant="ghost" className="font-heading hover:bg-primary/10 hover:text-primary">
                Login
              </Button>
            </Link>
            <Button className="text-white transition-all shadow-lg rounded-xl bg-primary hover:bg-primary/90 shadow-primary/20 hover:scale-105 font-heading">
              Download App
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="p-2 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 z-40 w-full p-4 space-y-4 border-t shadow-xl md:hidden border-border bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-5 top-20">
            {['Fitur', 'Tentang', 'Download'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-lg font-medium hover:text-primary font-heading"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex flex-col pt-4 space-y-3">
              <Button className="justify-center w-full h-12 text-white bg-primary font-heading rounded-xl">Download App</Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative flex items-center min-h-screen pt-32 pb-20 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse duration-[5000ms]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse duration-[7000ms]" />
          <FloatingEmojis />

          <div className="container relative z-10 px-6 mx-auto md:px-12 lg:px-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Text Content */}
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-block animate-float">
                  <Badge variant="outline" className="px-5 py-2 text-sm text-purple-700 transition-all rounded-full shadow-sm cursor-default border-purple-500/30 bg-purple-500/5 backdrop-blur-md dark:text-purple-300 font-heading hover:shadow-md">
                    <span className="mr-2">✨</span> Pesan Makanan Terbaik, Cepat, Muraahhh!!
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Makan Enak <br />
                  <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-size-[200%_auto] animate-gradient-x bg-clip-text text-transparent">
                    Jadi Gampang
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg leading-relaxed duration-1000 delay-200 md:text-xl text-muted-foreground lg:mx-0 animate-in fade-in slide-in-from-bottom-8">
                  Ribuan restoran favorit? Gampang. Dipesan dalam 10 detik? Bisa. Makanannya sampai hangat? Pasti 🔥
                </p>

                <div className="flex flex-col items-center justify-center pt-8 space-y-4 duration-1000 delay-300 sm:flex-row lg:justify-start sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-8">
                  <Button size="lg" className="w-full px-10 text-lg text-white transition-transform duration-300 shadow-xl h-14 rounded-2xl bg-secondary hover:bg-secondary/90 shadow-secondary/25 sm:w-auto font-heading hover:scale-105">
                    🚀 Mulai Sekarang
                  </Button>
                  <Button size="lg" variant="outline" className="w-full px-10 text-lg border-2 h-14 rounded-2xl border-primary/30 hover:border-primary text-primary hover:bg-primary/5 sm:w-auto font-heading backdrop-blur-sm">
                    Lihat Demo
                  </Button>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative hidden duration-1000 delay-300 animate-in fade-in slide-in-from-right-8 lg:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-[60px] rounded-full opacity-50" />

                {/* Main Hero Image */}
                <div className="relative z-20 animate-float">
                  <Image
                    src="/asset/pizza-delivery-man-delivering-pizza-using-scooter.svg"
                    alt="Delivery Man"
                    width={600}
                    height={600}
                    className="drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Decorative Floating Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg flex items-center justify-center text-4xl animate-bounce duration-[3000ms] border border-border/50 z-30">
                  🍔
                </div>
                <div className="absolute bottom-20 -left-4 w-16 h-16 bg-white dark:bg-zinc-800 rounded-full shadow-lg flex items-center justify-center text-3xl animate-bounce duration-[4000ms] delay-700 border border-border/50 z-30">
                  🥤
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] hidden lg:block">
              <ChevronDown className="w-8 h-8 text-primary opacity-80" />
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="fitur" className="relative py-24">
          <div className="container px-6 mx-auto md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto mb-20 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl font-heading">Kenapa <span className="text-primary">TrustMe?</span></h2>
              <p className="text-lg text-muted-foreground">
                Fitur-fitur yang bikin experience lu jadi top tier 🔝
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: "Lokasi Terpercaya",
                  desc: "Cari restoran favorite dimana aja",
                  img: "/asset/delivery-man-checking-delivery-drop-off-location.svg",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: Zap,
                  title: "Pengiriman Kilat",
                  desc: "Sampe dalam 30-45 menit",
                  img: "/asset/pizza-delivery-man-delivering-fresh-pizza.svg",
                  color: "text-amber-500",
                  bg: "bg-amber-500/10"
                },
                {
                  icon: Star,
                  title: "Kualitas Terjamin",
                  desc: "Semua resto verified, fresh & enak",
                  img: "/asset/female-serving-food-to-man-at-restaurant.svg",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10"
                },
                {
                  icon: Smartphone,
                  title: "Interface Clean",
                  desc: "Simple tapi powerful",
                  img: "/asset/woman-accepting-online-food-delivery-order.svg",
                  color: "text-pink-500",
                  bg: "bg-pink-500/10"
                },
                {
                  icon: Utensils,
                  title: "Promo Setiap Hari",
                  desc: "Deals yang bagus banget",
                  img: "/asset/man-picking-up-delivery-package-from-stores.svg",
                  color: "text-red-500",
                  bg: "bg-red-500/10"
                },
                {
                  icon: MessageCircle,
                  title: "Support 24/7",
                  desc: "Instant response, masalah solved",
                  img: "/asset/male-delivery-executive-delivering-groceries-at-specified-location.svg",
                  color: "text-indigo-500",
                  bg: "bg-indigo-500/10"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="relative flex flex-col h-full p-8 overflow-hidden transition-all duration-300 border group rounded-3xl bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative z-10 flex-1">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <feature.icon className={`h-7 w-7 ${feature.color}`} />
                    </div>
                    <h3 className={`text-2xl font-heading font-bold mb-3 group-hover:${feature.color} transition-colors`}>{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>

                  <div className="absolute bottom-0 right-0 w-40 h-40 transition-all duration-500 translate-x-8 translate-y-8 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-2">
                    <Image
                      src={feature.img}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STATS SECTION */}
        <section className="py-20">
          <div className="container px-6 mx-auto md:px-12 lg:px-20">
            <div className="rounded-[2.5rem] bg-linear-to-r from-violet-600 via-fuchsia-500 to-orange-500 p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-purple-500/20">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
              <FloatingEmojis />

              <div className="relative z-10 grid grid-cols-2 gap-12 md:grid-cols-4">
                {[
                  { num: "5M+", label: "Pengguna Asik" },
                  { num: "10K+", label: "Resto Partner" },
                  { num: "2M+", label: "Pesanan Daily" },
                  { num: "4.8★", label: "Rating App" }
                ].map((stat, i) => (
                  <div key={i} className="text-center transition-transform duration-300 group hover:scale-105">
                    <div className="mb-2 text-4xl font-bold text-white md:text-5xl font-heading drop-shadow-sm">{stat.num}</div>
                    <div className="text-lg font-medium text-white/90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS */}
        <section className="py-24 bg-muted/30">
          <div className="container px-6 mx-auto md:px-12 lg:px-20">
            <div className="mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold md:text-5xl font-heading">4 Langkah, <span className="text-secondary">Puas Makan</span></h2>
              <p className="text-lg text-muted-foreground">Dari order sampai delivery, semua cepet banget 💨</p>
            </div>

            <div className="relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-24 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_auto] animate-gradient-x opacity-30" />

              <div className="grid gap-8 md:grid-cols-4">
                {[
                  {
                    step: "1",
                    title: "Buka Aplikasi",
                    desc: "Download TrustMe di App Store atau Play Store",
                    img: "/asset/restaurant-waiter-confirming-online-food-order.svg",
                    color: "bg-blue-500",
                    shadow: "shadow-blue-500/30"
                  },
                  {
                    step: "2",
                    title: "Pilih Restoran",
                    desc: "Cari restoran favorit atau explore yang baru",
                    img: "/asset/delivery-man-picking-up-food-parcel-from-the-restaurant.svg",
                    color: "bg-orange-500",
                    shadow: "shadow-orange-500/30"
                  },
                  {
                    step: "3",
                    title: "Pesan & Bayar",
                    desc: "Tambah ke keranjang, checkout dengan mudah",
                    img: "/asset/man-delivering-food-using-bicycle.svg",
                    color: "bg-purple-500",
                    shadow: "shadow-purple-500/30"
                  },
                  {
                    step: "4",
                    title: "Makanan Sampe!",
                    desc: "Tracking real-time, sampe hangat 🎉",
                    img: "/asset/female-customer-accepting-food-delivery.svg",
                    color: "bg-green-500",
                    shadow: "shadow-green-500/30"
                  }
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center group">
                    <div className="relative z-10 w-48 h-48 mb-6 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                      <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xl font-heading font-bold text-white shadow-lg ${item.color} ${item.shadow}`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-bold font-heading">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA SECTION */}
        <section id="download" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10" />

          <div className="container relative z-10 px-6 mx-auto md:px-12 lg:px-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h2 className="mb-6 text-4xl font-extrabold duration-700 md:text-6xl font-heading animate-in slide-in-from-bottom-8 fade-in">
                  Jangan Nunggu Lagi, <br />
                  <span className="text-primary">Pesan Sekarang!</span>
                </h2>
                <p className="max-w-2xl mx-auto mb-12 text-xl text-muted-foreground lg:mx-0">
                  Ribuan orang lagi enjoy makanan favorit mereka nih. Jangan tertinggal! 🔥
                </p>

                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row lg:justify-start sm:space-y-0 sm:space-x-6">
                  <Button className="w-full h-16 px-8 text-lg text-white transition-all duration-300 shadow-xl rounded-2xl bg-secondary hover:bg-secondary/90 font-heading hover:-translate-y-1 sm:w-auto">
                    📱 Download iOS
                  </Button>
                  <Button className="w-full h-16 px-8 text-lg text-white transition-all duration-300 shadow-xl rounded-2xl bg-primary hover:bg-primary/90 font-heading hover:-translate-y-1 sm:w-auto">
                    🤖 Download Android
                  </Button>
                </div>

                <p className="mt-8 text-sm text-muted-foreground">
                  ⏱️ Tersedia di iOS 13+ dan Android 8.0+ | 💬 Join 5M+ users
                </p>
              </div>

              <div className="hidden lg:block relative h-[400px] animate-in slide-in-from-right-8 duration-1000">
                <Image
                  src="/asset/delivery-man-picking-up-delivery-for-different-locations.svg"
                  alt="Join TrustMe"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        {/* 7. DEVELOPER SECTION */}
        <section className="relative py-24 overflow-hidden border-t border-border/40">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
          <div className="container relative z-10 px-6 mx-auto md:px-12 lg:px-20">
            <div className="max-w-5xl mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              {/* Avatar / Image */}
              <div className="relative group shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-primary to-secondary p-1.5 shadow-2xl group-hover:scale-105 transition-transform duration-500 rotate-3 group-hover:rotate-0">
                  <div className="relative flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <span className="text-7xl md:text-8xl">👨‍💻</span>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center w-12 h-12 text-lg text-white bg-green-500 border-4 border-white rounded-full shadow-lg bottom-4 right-4 dark:border-zinc-900" title="Open for Work">
                  ⚡
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                    Meet the Creator
                  </Badge>
                  <h2 className="mb-2 text-3xl font-bold md:text-5xl font-heading">
                    DevNoLife <span className="text-2xl font-normal text-muted-foreground md:text-3xl">/ Admin</span>
                  </h2>
                  <p className="text-xl font-medium text-primary">Fullstack Developer & UI Designer</p>
                </div>

                <p className="max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground md:mx-0">
                  "Coding itu seni, bug itu bumbu." 🌶️ <br />
                  Gw suka bikin website yang nggak cuma fungsional, tapi juga punya <i>soul</i>. TrustMe ini adalah project iseng yang diseriusin biar lu bisa pesen makan dengan gaya!
                </p>

                {/* Socials */}
                <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
                  <Button variant="outline" className="h-12 gap-2 px-6 transition-all duration-300 rounded-xl hover:bg-black hover:text-white hover:border-black">
                    <Github className="w-5 h-5" /> GitHub
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl gap-2 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300">
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl gap-2 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300">
                    <Instagram className="w-5 h-5" /> Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="relative pt-20 pb-10 border-t bg-background border-gradient">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-primary to-secondary opacity-50" />

        <div className="container px-6 mx-auto md:px-12 lg:px-20">
          <div className="grid gap-12 mb-16 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full bg-primary font-heading">T</div>
                <span className="text-2xl font-bold font-heading">TrustMe</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Makanan enak, pesan gampang, sampe cepat 🚀
              </p>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-heading">Produk</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['iOS App', 'Android App', 'Website'].map(item => (
                  <li key={item}><a href="#" className="inline-block transition-colors hover:text-primary hover:translate-x-1">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-heading">Perusahaan</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['Tentang Kami', 'Blog', 'Karir'].map(item => (
                  <li key={item}><a href="#" className="inline-block transition-colors hover:text-primary hover:translate-x-1">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-lg font-bold font-heading">Dukungan</h4>
              <ul className="space-y-3 text-muted-foreground">
                {['FAQ', 'Hubungi Kami', 'Kebijakan Privasi'].map(item => (
                  <li key={item}><a href="#" className="inline-block transition-colors hover:text-primary hover:translate-x-1">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 TrustMe Indonesia. Made with ❤️ & 🍕
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
