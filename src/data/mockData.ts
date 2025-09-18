import { LucideIcon } from "lucide-react";

export interface Stat {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "increase" | "decrease";
  color: string;
}

export interface Activity {
  action: string;
  time: string;
  type: "success" | "info" | "warning" | "event";
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  student_count: number;
  color: string;
}

export const mockStats: Stat[] = [];

export const recentActivity: Activity[] = [];

export const classColors = [
  "from-blue-500 to-indigo-600",
  "from-green-500 to-teal-600",
  "from-yellow-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-purple-500 to-violet-600",
  "from-red-500 to-rose-600",
  "from-cyan-500 to-sky-600",
  "from-lime-500 to-emerald-600",
];

export const mockClasses: Class[] = [];