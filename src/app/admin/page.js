"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ClipboardList, Map, Flame, Package, User, Star, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, ghats: 0, services: 0, products: 0, pandits: 0, reviews: 0, users: 0 });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const [bookingsRes, ghatsRes, servicesRes, productsRes, panditsRes, reviewsRes, usersRes] = await Promise.all([
        fetch("/api/bookings?limit=5"),
        fetch("/api/ghats"),
        fetch("/api/services"),
        fetch("/api/products"),
        fetch("/api/panditjis"),
        fetch("/api/reviews?approved=all"),
        fetch("/api/users?limit=1"),
      ]);

      const [bookings, ghats, services, products, pandits, reviews, usersData] = await Promise.all([
        bookingsRes.json(),
        ghatsRes.json(),
        servicesRes.json(),
        productsRes.json(),
        panditsRes.json(),
        reviewsRes.json(),
        usersRes.json(),
      ]);

      setStats({
        bookings: bookings.pagination?.total || 0,
        ghats: ghats.pagination?.total || 0,
        services: services.pagination?.total || 0,
        products: products.pagination?.total || 0,
        pandits: pandits.pagination?.total || 0,
        reviews: reviews.pagination?.total || 0,
        users: usersData.stats?.total || 0,
      });

      if (bookings.data) setRecentBookings(bookings.data.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }

  const STAT_CARDS = [
    { label: "Bookings", value: stats.bookings, icon: <ClipboardList className="w-5 h-5 text-white" />, color: "from-primary to-primary/80", href: "/admin/bookings" },
    { label: "Ghats", value: stats.ghats, icon: <Map className="w-5 h-5 text-white" />, color: "from-blue-400 to-blue-600", href: "/admin/ghats" },
    { label: "Services", value: stats.services, icon: <Flame className="w-5 h-5 text-white" />, color: "from-amber-400 to-amber-600", href: "/admin/services" },
    { label: "Products", value: stats.products, icon: <Package className="w-5 h-5 text-white" />, color: "from-green-400 to-green-600", href: "/admin/products" },
    { label: "Pandits", value: stats.pandits, icon: <User className="w-5 h-5 text-white" />, color: "from-rose-400 to-rose-600", href: "/admin/panditjis" },
    { label: "Users", value: stats.users, icon: <Users className="w-5 h-5 text-white" />, color: "from-violet-400 to-violet-600", href: "/admin/users" },
  ];

  const STATUS_COLORS = {
    New: "bg-blue-100 text-blue-700",
    "WhatsApp Contacted": "bg-green-100 text-green-700",
    "Payment Pending": "bg-gold-100 text-gold-700",
    Confirmed: "bg-saffron-100 text-saffron-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back! Here&apos;s your overview.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="p-4 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-background rounded-2xl border border-border/50 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Bookings</h3>
          <Link href="/admin/bookings" className="text-sm text-primary hover:text-primary/80 font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {recentBookings.length > 0 ? recentBookings.map((b) => (
                <tr key={b._id} className="hover:bg-primary/5">
                  <td className="px-6 py-3 font-mono text-xs text-primary">{b.bookingId}</td>
                  <td className="px-6 py-3">{b.customerName}</td>
                  <td className="px-6 py-3 capitalize">{b.bookingType}</td>
                  <td className="px-6 py-3 font-medium">₹{b.estimatedAmount?.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[b.status] || "bg-muted text-muted-foreground"}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No bookings yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
