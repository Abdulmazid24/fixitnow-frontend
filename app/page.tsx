import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="p-6 border rounded-md">
      <Calendar className="rounded-lg border" />
      <Input placeholder="Enter your name" className="mt-4" />
      <Button variant="outline">Save Date</Button>
      <h1 className="text-2xl font-bold mt-4">Hello Production</h1>
    </div>
  );
}
