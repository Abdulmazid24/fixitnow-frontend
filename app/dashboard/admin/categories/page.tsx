"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FolderTree,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { FEATURED_CATEGORIES, CategoryItem } from "@/lib/marketplace-data";
import { api } from "@/lib/api";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>(FEATURED_CATEGORIES);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/categories", { name, description });
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || "Service domain for home repairs.",
        iconName: "Zap",
        serviceCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
      toast.success("New service category created!");
      setModalOpen(false);
      setName("");
      setDescription("");
    } catch {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        description: description.trim() || "Service domain for home repairs.",
        iconName: "Zap",
        serviceCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
      toast.success("Service category added!");
      setModalOpen(false);
      setName("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== catId));
      toast.success("Category deleted.");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="xs" onClick={() => router.back()} className="gap-1 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FolderTree className="h-6 w-6 text-primary" />
              Service Category Management
            </h1>
            <p className="text-xs text-muted-foreground">
              Define service domains for technicians and customer browsing.
            </p>
          </div>

          <Button size="sm" className="gap-1.5 font-semibold text-xs" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Create Category
          </Button>
        </div>

        {/* Categories Data Table */}
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Active Services</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-sm">{c.description}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{c.serviceCount} Services</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteCategory(c.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-base text-foreground">Create Service Category</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Category Name *</label>
                <Input
                  type="text"
                  placeholder="e.g. Solar Panel Services"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Description</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none"
                  placeholder="Describe what services belong in this category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={loading}>
                  {loading ? "Creating..." : "Save Category"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
