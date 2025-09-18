import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Stat } from "@/data/mockData";

const StatCard = ({ title, value, icon: Icon, change, changeType, color }: Stat) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`relative overflow-hidden border-none text-white bg-gradient-to-br ${color}`}>
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5 text-white/80" />
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{value}</div>
          <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
            {changeType === "increase" ? (
              <ArrowUp className="h-3 w-3 text-green-300" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-300" />
            )}
            <span>{change} from last month</span>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;