"use client";

import { useState, useEffect } from "react";
import AdminFormModal from "./AdminFormModal";
import { Plus } from "lucide-react";

function AdminCrudPage({ title, apiPath, fields, icon }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(`/api/${apiPath}?limit=100`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setLoading(false);
  }

  async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`/api/${apiPath}/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  async function toggleActive(id, current) {
    try {
      await fetch(`/api/${apiPath}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      fetchItems();
    } catch (error) {
      console.error("Failed to toggle:", error);
    }
  }

  async function handleSubmit(data) {
    try {
      // Map imageUrl to images array
      if (data.imageUrl) {
        data.images = [{ url: data.imageUrl, alt: data.name?.en || data.name || "Image" }];
        delete data.imageUrl;
      }
      
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem ? `/api/${apiPath}/${editingItem._id}` : `/api/${apiPath}`;
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      if (result.success) {
        setIsModalOpen(false);
        setEditingItem(null);
        fetchItems();
      } else {
        alert(result.error || "Failed to save item");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save item");
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" /> Add New {title.replace(/s$/, '')}
        </button>
      </div>

      <div className="bg-background rounded-2xl border border-border/50 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                {fields.filter(f => !f.hideInTable).map((f) => (
                  <th key={f.key} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.label}</th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {loading ? (
                <tr><td colSpan={fields.length + 2} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={fields.length + 2} className="px-4 py-8 text-center text-muted-foreground">No items found.</td></tr>
              ) : items.map((item) => (
                <tr key={item._id} className="hover:bg-primary/5">
                  {fields.filter(f => !f.hideInTable).map((f) => (
                    <td key={f.key} className="px-4 py-3">
                      {f.render ? f.render(item) : (typeof item[f.key] === "object" ? (item[f.key]?.en || JSON.stringify(item[f.key])) : item[f.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(item._id, item.isActive)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="px-2 py-1 rounded-md bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
        initialData={editingItem}
        title={editingItem ? `Edit ${title.replace(/s$/, '')}` : `Add New ${title.replace(/s$/, '')}`}
      />
    </div>
  );
}

export function AdminGhats() {
  return <AdminCrudPage title="Ghats" apiPath="ghats" fields={[
    { key: "name.en", label: "Name (EN)", type: "text", required: true, render: (i) => i.name?.en },
    { key: "name.hi", label: "Name (HI)", type: "text", hideInTable: true },
    { key: "slug", label: "Slug", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true, hideInTable: true },
    { key: "shortDescription", label: "Short Description", type: "textarea", hideInTable: true },
    { key: "price", label: "Price (₹)", type: "number", required: true, render: (i) => `₹${i.price?.toLocaleString("en-IN")}` },
    { key: "rating", label: "Rating", type: "number" },
    { key: "capacity", label: "Capacity", type: "number", hideInTable: true },
    { key: "imageUrl", label: "Image URL", type: "text", hideInTable: true },
  ]} />;
}

export function AdminServices() {
  return <AdminCrudPage title="Services" apiPath="services" fields={[
    { key: "name", label: "Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "text", required: true, hideInTable: true },
    { key: "category", label: "Category", type: "select", options: [
      { label: "Puja & Festival", value: "puja-festival" },
      { label: "Marriage & Celebration", value: "marriage-celebration" },
      { label: "Other", value: "other" }
    ], required: true },
    { key: "description", label: "Description", type: "textarea", required: true, hideInTable: true },
    { key: "shortDescription", label: "Short Description", type: "textarea", hideInTable: true },
    { key: "price", label: "Price (₹)", type: "number", required: true, render: (i) => `₹${i.price?.toLocaleString("en-IN")}` },
    { key: "duration", label: "Duration", type: "text" },
    { key: "imageUrl", label: "Image URL", type: "text", hideInTable: true },
  ]} />;
}

export function AdminProducts() {
  return <AdminCrudPage title="Products" apiPath="products" fields={[
    { key: "name", label: "Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "text", required: true, hideInTable: true },
    { key: "category", label: "Category", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true, hideInTable: true },
    { key: "saleType", label: "Sale Type", type: "select", options: [
      { label: "buy", value: "buy" },
      { label: "rent", value: "rent" },
      { label: "both", value: "both" }
    ], required: true },
    { key: "price", label: "Price (₹)", type: "number", required: true, render: (i) => `₹${i.price?.toLocaleString("en-IN")}` },
    { key: "stock", label: "Stock", type: "number", required: true },
    { key: "isConsumable", label: "Is Consumable", type: "boolean", hideInTable: true },
    { key: "imageUrl", label: "Image URL", type: "text", hideInTable: true },
  ]} />;
}

export function AdminPandits() {
  return <AdminCrudPage title="Pandit Ji" apiPath="panditjis" fields={[
    { key: "name", label: "Name", type: "text", required: true },
    { key: "slug", label: "Slug", type: "text", required: true, hideInTable: true },
    { key: "bio", label: "Biography", type: "textarea", required: true, hideInTable: true },
    { key: "shortBio", label: "Short Bio", type: "text", hideInTable: true },
    { key: "experience", label: "Experience (Years)", type: "number", required: true, render: (i) => `${i.experience} years` },
    { key: "price", label: "Price (₹)", type: "number", required: true, render: (i) => `₹${i.price?.toLocaleString("en-IN")}` },
    { key: "rating", label: "Rating", type: "number" },
    { key: "availability", label: "Status", type: "select", options: [
      { label: "Available", value: "available" },
      { label: "Busy", value: "busy" },
      { label: "Unavailable", value: "unavailable" }
    ], required: true },
    { key: "profileImage", label: "Profile Image URL", type: "text", hideInTable: true },
  ]} />;
}

export { AdminCrudPage };
