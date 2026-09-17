"use client";

import { useState, useEffect } from "react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  async function fetchReviews() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "pending") params.set("approved", "false");
      if (filter === "approved") params.set("approved", "true");
      params.set("limit", "50");
      const res = await fetch(`/api/reviews?${params}`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
    setLoading(false);
  }

  async function handleApproval(reviewId, isApproved) {
    try {
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId, isApproved }),
      });
      fetchReviews();
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">⭐ Reviews</h2>

      <div className="flex gap-2">
        {["pending", "approved", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
              filter === f ? "bg-saffron-500 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center py-8 text-gray-400">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center py-8 text-gray-400">No reviews found.</p>
        ) : reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.customerName}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? "text-gold-500" : "text-gray-200"}`}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">&ldquo;{review.review}&rdquo;</p>
                <p className="text-xs text-gray-400 mt-2">
                  {review.entityType} • {new Date(review.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-4">
                {!review.isApproved && (
                  <button
                    onClick={() => handleApproval(review._id, true)}
                    className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-medium hover:bg-green-200 transition-colors"
                  >
                    ✓ Approve
                  </button>
                )}
                {review.isApproved && (
                  <button
                    onClick={() => handleApproval(review._id, false)}
                    className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    ✕ Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
