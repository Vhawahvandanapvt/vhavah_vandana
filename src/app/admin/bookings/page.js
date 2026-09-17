"use client";

import { useState, useEffect } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      params.set("limit", "50");
      const res = await fetch(`/api/bookings?${params}`);
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
    setLoading(false);
  }

  async function updateStatus(id, status) {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const STATUSES = ["New", "WhatsApp Contacted", "Payment Pending", "Confirmed", "Completed", "Cancelled"];
  const STATUS_COLORS = {
    New: "bg-blue-100 text-blue-700",
    "WhatsApp Contacted": "bg-green-100 text-green-700",
    "Payment Pending": "bg-gold-100 text-gold-700",
    Confirmed: "bg-saffron-100 text-saffron-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${!statusFilter ? "bg-saffron-500 text-white" : "bg-gray-100 text-gray-600"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusFilter === s ? "bg-saffron-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No bookings found.</td></tr>
              ) : bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-saffron-600">{b.bookingId}</td>
                  <td className="px-4 py-3 font-medium">{b.customerName}</td>
                  <td className="px-4 py-3">{b.phone}</td>
                  <td className="px-4 py-3 capitalize">{b.bookingType}</td>
                  <td className="px-4 py-3 font-medium">₹{b.estimatedAmount?.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-xs">{b.date || "TBD"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[b.status] || "bg-gray-100"}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://wa.me/${b.phone?.replace(/\D/g, "")}?text=Namaste%20${encodeURIComponent(b.customerName)}!%20Regarding%20booking%20${b.bookingId}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
