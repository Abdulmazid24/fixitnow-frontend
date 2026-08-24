"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  ShieldAlert,
  ArrowLeft,
  UserCheck,
  UserX,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { Role } from "@/context/auth-context";

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: "ACTIVE" | "BANNED";
  joinedDate: string;
}

const INITIAL_USERS: AdminUserRecord[] = [
  {
    id: "usr-1",
    name: "John Customer",
    email: "customer@example.com",
    phone: "+1 234 567 8901",
    role: "CUSTOMER",
    status: "ACTIVE",
    joinedDate: "2026-07-10",
  },
  {
    id: "usr-2",
    name: "Alex Rivera",
    email: "technician@example.com",
    phone: "+1 234 567 8902",
    role: "TECHNICIAN",
    status: "ACTIVE",
    joinedDate: "2026-06-15",
  },
  {
    id: "usr-3",
    name: "Platform Admin",
    email: "admin@example.com",
    phone: "+1 234 567 8900",
    role: "ADMIN",
    status: "ACTIVE",
    joinedDate: "2026-01-01",
  },
  {
    id: "usr-4",
    name: "Spam User",
    email: "spammer@test.com",
    phone: "+1 999 888 7777",
    role: "CUSTOMER",
    status: "BANNED",
    joinedDate: "2026-08-01",
  },
];

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const toggleUserStatus = (userId: string, currentStatus: "ACTIVE" | "BANNED") => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
    toast.success(`User status changed to ${newStatus}.`);
  };

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">ADMIN</span>;
      case "TECHNICIAN":
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">TECHNICIAN</span>;
      default:
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">CUSTOMER</span>;
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
              <Users className="h-6 w-6 text-primary" />
              User & Technician Directory
            </h1>
            <p className="text-xs text-muted-foreground">
              Search, filter, and moderate account access across the platform.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email address..."
              className="pl-9 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              className="rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none w-full sm:w-auto"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customers</option>
              <option value="TECHNICIAN">Technicians</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-border rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">User Info</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3.5 space-y-0.5">
                    <div className="font-bold text-foreground">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">{u.phone}</td>
                  <td className="px-4 py-3">{getRoleBadge(u.role)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.joinedDate}</td>
                  <td className="px-4 py-3">
                    {u.status === "ACTIVE" ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <UserCheck className="h-3.5 w-3.5" /> Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold flex items-center gap-1">
                        <UserX className="h-3.5 w-3.5" /> Banned
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "ADMIN" && (
                      <Button
                        size="xs"
                        variant={u.status === "ACTIVE" ? "destructive" : "outline"}
                        className="text-[11px] h-7"
                        onClick={() => toggleUserStatus(u.id, u.status)}
                      >
                        {u.status === "ACTIVE" ? "Ban User" : "Unban User"}
                      </Button>
                    )}
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
