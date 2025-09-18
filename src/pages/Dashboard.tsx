import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { mockStats, recentActivity } from "@/data/mockData";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Dashboard = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Jane Doe! Here's your overview for today.</p>
      </motion.div>

      {mockStats.length > 0 ? (
        <motion.div
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {mockStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <Card className="text-center p-8 bg-secondary/50">
            <h3 className="text-lg font-semibold">No Statistics Yet</h3>
            <p className="text-muted-foreground mt-2">Key metrics will appear here as you add data.</p>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
           <Card className="h-full glass-card">
             <CardHeader>
               <CardTitle>Performance Overview</CardTitle>
             </CardHeader>
             <CardContent className="h-[300px] flex items-center justify-center">
               <div className="text-center text-muted-foreground">
                 <p>Performance data will be shown here.</p>
               </div>
             </CardContent>
           </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
           <RecentActivity activities={recentActivity} className="glass-card" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;