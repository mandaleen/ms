import { BarChart3 } from "lucide-react";

const Analytics = () => (
  <div className="space-y-6">
    <header>
      <h1 className="text-3xl font-bold font-display">Analytics</h1>
      <p className="text-muted-foreground">Visualize data and gain insights.</p>
    </header>
    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg bg-secondary/50">
      <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Analytics Dashboard Coming Soon</h3>
      <p className="text-muted-foreground mt-2 max-w-md">
        This section is under construction. Soon you'll find detailed charts and reports on student performance and attendance.
      </p>
    </div>
  </div>
);
export default Analytics;