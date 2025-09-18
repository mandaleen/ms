import { NavLink } from "react-router-dom";
import { BookOpen, GraduationCap, Home, Users, Calendar, BarChart2, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Classes", path: "/classes", icon: BookOpen },
  { name: "Students", path: "/students", icon: Users },
  { name: "Attendance", path: "/attendance", icon: Calendar },
  { name: "Analytics", path: "/analytics", icon: BarChart2 },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-full bg-card border-r flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b h-16">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold font-display whitespace-nowrap">TeacherDash</h1>
            </motion.div>
          )}
        </AnimatePresence>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-5 top-6 bg-card border rounded-full h-10 w-10 z-20">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              } ${isCollapsed ? "justify-center" : ""}`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t mt-auto">
        <NavLink to="/settings" className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              } ${isCollapsed ? "justify-center" : ""}`
            }>
          <Settings className="h-5 w-5 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-medium whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
    </motion.div>
  );
};

export default Sidebar;