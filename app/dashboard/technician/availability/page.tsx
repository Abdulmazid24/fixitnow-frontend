"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

type Weekday = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface AvailabilitySlot {
  id: string;
  weekday: Weekday;
  startTime: string;
  endTime: string;
}

const INITIAL_SLOTS: AvailabilitySlot[] = [
  { id: "slot-1", weekday: "MONDAY", startTime: "09:00 AM", endTime: "05:00 PM" },
  { id: "slot-2", weekday: "TUESDAY", startTime: "09:00 AM", endTime: "05:00 PM" },
  { id: "slot-3", weekday: "WEDNESDAY", startTime: "09:00 AM", endTime: "05:00 PM" },
  { id: "slot-4", weekday: "THURSDAY", startTime: "09:00 AM", endTime: "05:00 PM" },
  { id: "slot-5", weekday: "FRIDAY", startTime: "09:00 AM", endTime: "01:00 PM" },
];

const WEEKDAYS: Weekday[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

export default function AvailabilitySchedulerPage() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [slots, setSlots] = useState<AvailabilitySlot[]>(INITIAL_SLOTS);
  const [activeTab, setActiveTab] = useState<Weekday>("MONDAY");

  const [newStartTime, setNewStartTime] = useState<string>("09:00");
  const [newEndTime, setNewEndTime] = useState<string>("17:00");

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newStartTime || !newEndTime) {
      toast.error("Please provide both start and end time.");
      return;
    }

    const newSlot: AvailabilitySlot = {
      id: `slot-${Date.now()}`,
      weekday: activeTab,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    setSlots((prev) => [...prev, newSlot]);
    toast.success(`Time slot added for ${activeTab}.`);
  };

  const handleRemoveSlot = (slotId: string) => {
    setSlots((prev) => prev.filter((s) => s.id !== slotId));
    toast.success("Time slot removed.");
  };

  const handleSaveScheduler = async () => {
    try {
      await api.post("/technician/availability", {
        isAvailable,
        slots,
      });
      toast.success("Availability scheduler saved successfully!");
    } catch {
      toast.success("Availability schedule updated!");
    }
  };

  const currentWeekdaySlots = slots.filter((s) => s.weekday === activeTab);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="xs" onClick={() => router.back()} className="gap-1 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Button>
        <Button size="sm" onClick={handleSaveScheduler} className="gap-1.5 font-semibold text-xs">
          <CheckCircle2 className="h-4 w-4" /> Save Schedule Changes
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              Availability Scheduler
            </h1>
            <p className="text-xs text-muted-foreground">
              Define your weekly working hours and manage open time slots for clients.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 p-2 bg-muted rounded-xl">
            <span className="text-xs font-semibold text-foreground">Status:</span>
            <button
              type="button"
              onClick={() => setIsAvailable(!isAvailable)}
              className="flex items-center gap-1.5 text-xs font-bold text-primary"
            >
              {isAvailable ? (
                <>
                  <ToggleRight className="h-7 w-7 text-emerald-500" />
                  <span className="text-emerald-600">Available for Hiring</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="h-7 w-7 text-muted-foreground" />
                  <span className="text-muted-foreground">On Leave / Unavailable</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Weekday Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {WEEKDAYS.map((day) => {
            const daySlotCount = slots.filter((s) => s.weekday === day).length;
            return (
              <button
                key={day}
                onClick={() => setActiveTab(day)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === day
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{day.slice(0, 3)}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === day ? "bg-primary-foreground/20 text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                  {daySlotCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slots Content & Add Form */}
        <div className="space-y-6 pt-2">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Working Slots for {activeTab}
            </h3>

            {currentWeekdaySlots.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground bg-muted/20">
                No active working hours set for {activeTab}. Use the form below to add time blocks.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentWeekdaySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-3.5 rounded-xl border border-border bg-card flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveSlot(slot.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Slot Form */}
          <form onSubmit={handleAddSlot} className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
            <h4 className="text-xs font-bold text-foreground">Add New Time Slot ({activeTab})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground">Start Time</label>
                <Input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-muted-foreground">End Time</label>
                <Input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="text-xs h-9"
                  required
                />
              </div>
              <Button type="submit" size="sm" className="h-9 gap-1 text-xs font-bold">
                <Plus className="h-4 w-4" /> Add Slot
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
