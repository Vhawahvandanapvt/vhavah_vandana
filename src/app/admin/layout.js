"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, ClipboardList, Map, Package, User, Star, Globe, LogOut, Menu, Flame, Users } from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const NAV_ITEMS = [
    { href: "/admin", icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard" },
    { href: "/admin/bookings", icon: <ClipboardList className="w-4 h-4" />, label: "Bookings" },
    { href: "/admin/ghats", icon: <Map className="w-4 h-4" />, label: "Ghats" },
    { href: "/admin/services", icon: <Flame className="w-4 h-4" />, label: "Services" },
    { href: "/admin/products", icon: <Package className="w-4 h-4" />, label: "Products" },
    { href: "/admin/panditjis", icon: <User className="w-4 h-4" />, label: "Pandit Ji" },
    { href: "/admin/reviews", icon: <Star className="w-4 h-4" />, label: "Reviews" },
    { href: "/admin/users", icon: <Users className="w-4 h-4" />, label: "Users" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#14110F] text-[#FFFEFB] transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/20 shadow-lg shrink-0">
              <Image 
                src="/logo.jpeg" 
                alt="Vhavah Vandana Logo" 
                width={150}
                height={150}
                quality={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-white">Vhavah Vandana</h2>
              <p className="text-[10px] text-primary uppercase tracking-wider">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#FFFEFB]/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-[#FFFEFB]/70 hover:text-white transition-colors">
            <Globe className="w-4 h-4" /> View Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#FFFEFB]/70 hover:text-red-400 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Admin</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
