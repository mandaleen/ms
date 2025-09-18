import { BookOpen, Users, BarChart3, CheckCircle, LucideIcon } from "lucide-react";

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
  studentCount: number;
  imageUrl: string;
}

export const mockStats: Stat[] = [
  {
    title: "Total Students",
    value: "247",
    icon: Users,
    change: "+12%",
    changeType: "increase",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Total Classes",
    value: "8",
    icon: BookOpen,
    change: "+2",
    changeType: "increase",
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    icon: CheckCircle,
    change: "-0.5%",
    changeType: "decrease",
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "Average Grade",
    value: "87.5",
    icon: BarChart3,
    change: "+1.2",
    changeType: "increase",
    color: "from-pink-500 to-rose-600",
  },
];

export const recentActivity: Activity[] = [
    { action: "New student 'Alex Ray' added to Advanced Mathematics.", time: "2 minutes ago", type: "success" },
    { action: "Attendance marked for 'History 101'.", time: "1 hour ago", type: "info" },
    { action: "Grades for 'Physics II' final exam have been uploaded.", time: "3 hours ago", type: "warning" },
    { action: "New assignment 'Essay on Renaissance' posted for 'Literature'.", time: "5 hours ago", type: "info" },
    { action: "Parent-teacher meeting scheduled for 'Emily White'.", time: "1 day ago", type: "event" },
];

export const mockClasses: Class[] = [
  {
    id: "1",
    name: "Mathematics 101",
    subject: "Math",
    studentCount: 15,
    imageUrl: "https://source.unsplash.com/random/400x300?math,geometry",
  },
  {
    id: "2",
    name: "History of Civilization",
    subject: "History",
    studentCount: 20,
    imageUrl: "https://source.unsplash.com/random/400x300?history,ruins",
  },
  {
    id: "3",
    name: "Advanced Physics",
    subject: "Science",
    studentCount: 12,
    imageUrl: "https://source.unsplash.com/random/400x300?physics,laboratory",
  },
  {
    id: "4",
    name: "Creative Writing Workshop",
    subject: "English",
    studentCount: 18,
    imageUrl: "https://source.unsplash.com/random/400x300?writing,pen",
  },
  {
    id: "5",
    name: "Introduction to Programming",
    subject: "Computer Science",
    studentCount: 25,
    imageUrl: "https://source.unsplash.com/random/400x300?code,computer",
  },
  {
    id: "6",
    name: "Spanish Language and Culture",
    subject: "Language",
    studentCount: 10,
    imageUrl: "https://source.unsplash.com/random/400x300?spain,culture",
  },
];