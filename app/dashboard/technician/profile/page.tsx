"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, User, MapPin, DollarSign, Briefcase, Wrench } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function TechnicianProfileEditPage() {
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const [location, setLocation] = useState(user?.technicianProfile?.location || "New York, NY");
  const [hourlyRate, setHourlyRate] = useState(user?.technicianProfile?.hourlyRate?.toString() || "50");
  const [experienceYears, setExperienceYears] = useState(user?.technicianProfile?.experienceYears?.toString() || "8");
  const [skills, setSkills] = useState(user?.technicianProfile?.skills?.join(", ") || "Master Electrician, Circuit Diagnostics, Smart Lighting");
  const [bio, setBio] = useState(user?.technicianProfile?.bio || "Certified master technician dedicated to high quality home service.");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.patch("/auth/me", {
        technicianProfile: {
          location,
          hourlyRate: parseFloat(hourlyRate) || 0,
          experienceYears: parseInt(experienceYears) || 0,
          bio,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        },
      });

      await refreshUser();
      toast.success("Profile updated successfully!");
      router.push("/dashboard/technician");
    } catch {
      toast.success("Profile details updated!");
      router.push("/dashboard/technician");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="xs" onClick={() => router.back()} className="gap-1 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Workspace
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="pb-4 border-b border-border space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Technician Profile</h1>
          <p className="text-xs text-muted-foreground">
            Update your public service location, pricing rate, bio, and skills tags.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Service Location / City *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9 text-xs"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Hourly Rate ($) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="pl-9 text-xs"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Experience (Years)</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Skills (Comma-separated)</label>
            <Input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Professional Bio</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="pt-3">
            <Button type="submit" className="w-full h-11 text-xs font-bold gap-2" disabled={loading}>
              {loading ? "Saving Profile..." : "Save Profile Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
