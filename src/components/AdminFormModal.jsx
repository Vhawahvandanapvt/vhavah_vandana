"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AdminFormModal({ isOpen, onClose, onSubmit, fields, initialData, title }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Flatten nested initial data to match field keys (e.g., 'name.en')
        const flatData = {};
        fields.forEach(f => {
          if (f.key.includes('.')) {
            const parts = f.key.split('.');
            let val = initialData;
            for (const part of parts) {
              if (val) val = val[part];
              else break;
            }
            flatData[f.key] = val || (f.type === "number" ? 0 : "");
          } else {
            flatData[f.key] = initialData[f.key] !== undefined ? initialData[f.key] : (f.type === "number" ? 0 : "");
          }
        });
        setFormData(flatData);
      } else {
        // Empty state
        const emptyData = {};
        fields.forEach(f => {
          emptyData[f.key] = f.type === "number" ? 0 : (f.type === "boolean" ? true : "");
        });
        setFormData(emptyData);
      }
    }
  }, [isOpen, initialData, fields]);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Unflatten the data before submitting
    const payload = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key.includes('.')) {
        const parts = key.split('.');
        let current = payload;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) current[parts[i]] = {};
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      } else {
        payload[key] = value;
      }
    }

    await onSubmit(payload);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Dialog */}
      <div className="relative bg-background w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-border/50">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          <form id="admin-form" onSubmit={handleSubmit} className="space-y-4">
            {fields.map(field => {
              if (field.hideInForm) return null;

              return (
                <div key={field.key} className="space-y-1">
                  <label className="text-sm font-medium text-foreground block">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      required={field.required}
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                  ) : field.type === "boolean" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{field.label}</span>
                    </label>
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      required={field.required}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="">Select...</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.key] || ""}
                      onChange={(e) => handleChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)}
                      required={field.required}
                      step={field.type === "number" ? "any" : undefined}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    />
                  )}
                </div>
              );
            })}
          </form>
        </div>

        {/* Footer */}
        <div className="flex-none p-6 border-t border-border/50 flex justify-end gap-3 bg-muted/20">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admin-form"
            disabled={loading}
            className="px-6 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
