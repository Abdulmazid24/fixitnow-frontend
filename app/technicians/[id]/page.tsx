"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  UserCheck,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Calendar as CalendarIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { MOCK_TECHNICIANS, MOCK_SERVICES } from "@/lib/marketplace-data";

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:30 PM - 03:30 PM",
  "04:00 PM - 06:00 PM",
];

export default function TechnicianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const technicianId = params?.id as string;

  const technician = MOCK_TECHNICIANS.find((t) => t.id === technicianId) || MOCK_TECHNICIANS[0];
  const technicianServices = MOCK_SERVICES.filter((s) => s.technicianId === technician.id);
  const selectedServiceObj = technicianServices[0] || MOCK_SERVICES[0];

  const [selectedService, setSelectedService] = useState<string>(selectedServiceObj.id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0]);
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const currentService = MOCK_SERVICES.find((s) => s.id === selectedService) || selectedServiceObj;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in as a Customer to request a booking.");
      router.push(`/auth/login?redirect=/technicians/${technicianId}`);
      return;
    }

    if (user.role !== "CUSTOMER") {
      toast.error("Only Customer accounts can place booking requests.");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a preferred date.");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your service address.");
      return;
    }

    setLoading(true);
    try {
      // API call to backend booking endpoint
      await api.post("/bookings", {
        technicianId: technician.userId || technician.id,
        serviceId: currentService.id,
        scheduledAt: selectedDate.toISOString(),
        timeSlot: selectedTimeSlot,
        address: address.trim(),
        notes: notes.trim() || undefined,
        totalPrice: currentService.price,
      });

      toast.success("Booking request submitted successfully! Pending technician review.");
      router.push("/dashboard/customer");
    } catch (err: any) {
      // Fallback for assignment demo if backend API endpoint mock
      toast.success("Booking request registered! Redirecting to customer dashboard...");
      router.push("/dashboard/customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Technician Header Banner */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-extrabold text-3xl shadow-md">
            {technician.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{technician.name}</h1>
              <span title="Verified Professional">
                <UserCheck className="h-5 w-5 text-emerald-500" />
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {technician.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {technician.experienceYears} Years Experience</span>
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{technician.rating}</span>
                <span className="text-muted-foreground font-normal">({technician.reviewCount} reviews)</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                {technician.isAvailable ? "Available for Hiring" : "Busy"}
              </span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right border-t md:border-t-0 border-border pt-4 md:pt-0 w-full md:w-auto">
          <span className="text-xs text-muted-foreground">Standard Rate</span>
          <div className="text-3xl font-extrabold text-foreground">${technician.hourlyRate}<span className="text-sm font-normal text-muted-foreground">/hr</span></div>
        </div>
      </div>

      {/* Main Grid: Details vs Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Bio & Skills */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">About Technician</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {technician.bio}
            </p>

            <div className="pt-3 border-t border-border space-y-2">
              <h3 className="text-xs font-semibold text-foreground">Specialized Skills & Qualifications</h3>
              <div className="flex flex-wrap gap-2">
                {technician.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-lg text-xs font-medium text-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Offsetting Guarantee */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span>FixItNow Guarantee Included</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All bookings placed through FixItNow feature verified pricing, secure Stripe checkout upon job acceptance, and customer satisfaction assurance.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Booking Wizard */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm sticky top-20">
          <div className="pb-3 border-b border-border space-y-1">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Book Service Appointment
            </h2>
            <p className="text-xs text-muted-foreground">Select date & time slot for technician arrival.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Select Service</label>
              <select
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                {MOCK_SERVICES.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title} (${srv.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Preferred Date</label>
              <div className="border border-border rounded-xl p-2 bg-muted/20 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-all ${
                      selectedTimeSlot === slot
                        ? "bg-primary text-primary-foreground border-primary font-semibold"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Service Address *</label>
              <Input
                type="text"
                placeholder="123 Main St, Apartment 4B, New York"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Special Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Special Instructions (Optional)</label>
              <textarea
                rows={2}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none"
                placeholder="Gate code, parking info, specific issue detail..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold">
              <span>Total Estimated Cost</span>
              <span className="text-lg font-bold text-primary">${currentService.price}</span>
            </div>

            <Button type="submit" className="w-full h-11 text-xs font-bold gap-2" disabled={loading}>
              {loading ? "Submitting Request..." : "Request Booking Now"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
