import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Info, AlertTriangle, Calendar } from "lucide-react";
import { Activity } from "@/data/mockData";
import { cn } from "@/lib/utils";

const activityIcons = {
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  event: <Calendar className="h-4 w-4 text-purple-500" />,
};

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

const RecentActivity = ({ activities, className }: RecentActivityProps) => {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">{activityIcons[activity.type]}</div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-muted-foreground">
            <p>No recent activity to show.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;