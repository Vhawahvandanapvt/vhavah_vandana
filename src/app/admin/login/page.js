"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#14110F] relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="relative w-28 h-28 mx-auto bg-white rounded-full flex items-center justify-center mb-6 overflow-hidden ring-4 ring-primary/20 shadow-xl">
            <Image 
              src="/logo.jpeg" 
              alt="Vhavah Vandana Logo" 
              width={250}
              height={250}
              quality={100}
              priority
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className="font-heading text-3xl font-bold text-white mt-4">Vhavah Vandana</h1>
          <p className="text-primary text-sm mt-2 uppercase tracking-widest font-medium">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background rounded-2xl shadow-2xl p-8 space-y-6 border border-border/50">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
