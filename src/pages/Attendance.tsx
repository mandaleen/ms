import { CalendarCheck } from "lucide-react";

const Attendance = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold font-display">Attendance</h1>
      <p className="text-muted-foreground">Track and manage student attendance.</p>
    </header>
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-secondary/50">
      <CalendarCheck className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Attendance Tracking Coming Soon</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        This section is under construction. Soon you'll be able to mark attendance, view reports, and more.
      </p>
    </div>
  </div>
);
export default Attendance;